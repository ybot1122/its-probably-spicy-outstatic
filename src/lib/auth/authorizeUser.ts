import { Octokit } from "octokit";
import * as Iron from "@hapi/iron";
import { cookies } from "next/headers";
import { TOKEN_NAME } from "@/lib/auth/cookies";
import { allowedUsers } from "@/lib/allowedUsers";

// Helper function to decryt access token from cookie and check that it is an authorized user

// It must run on the server only
const authorizeUser = async (): Promise<"authorized" | "unauthorized"> => {
  const TOKEN_SECRET = process.env.OST_TOKEN_SECRET;

  if (!TOKEN_SECRET) {
    console.error("App is not configured correctly. No TOKEN_SECRET found.");

    return "unauthorized";
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
    return "authorized";
  }
  return "unauthorized";
};

export { authorizeUser };
