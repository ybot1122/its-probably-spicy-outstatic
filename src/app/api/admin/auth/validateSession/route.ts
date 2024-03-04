import { Octokit } from "octokit";
import * as Iron from "@hapi/iron";
import { cookies } from "next/headers";
import { TOKEN_NAME } from "@/lib/auth/cookies";
import { allowedUsers } from "@/lib/allowedUsers";

export async function GET(request: Request) {
  const TOKEN_SECRET = process.env.OST_TOKEN_SECRET;

  if (!TOKEN_SECRET) {
    return new Response(
      "App is not configured correctly. No TOKEN_SECRET found.",
      {
        status: 500,
      },
    );
  }

  const encryptedToken = await cookies().get(TOKEN_NAME);

  const accessToken = await Iron.unseal(
    encryptedToken?.value ?? "",
    TOKEN_SECRET,
    Iron.defaults,
  );

  // Octokit.js
  // https://github.com/octokit/core.js#readme
  const octokit = new Octokit({
    auth: accessToken,
  });

  const response = await octokit.request("GET /user", {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  const data = await response.data;

  if (allowedUsers.includes(data.login)) {
    return new Response("ok", { status: 200 });
  }

  return new Response("not ok", { status: 403 });
}
