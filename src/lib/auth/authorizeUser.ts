import { Octokit } from "octokit";
import * as Iron from "@hapi/iron";
import { cookies } from "next/headers";
import { TOKEN_NAME } from "@/lib/auth/cookies";
import { allowedUsers } from "@/lib/allowedUsers";

// Helper function to decryt access token from cookie and check that it is an authorized user

// It must run on the server only
const authorizeUser = async (): Promise<{
  authorizationStatus: "authorized" | "unauthorized";
  octokit?: any;
}> => {
  const TOKEN_SECRET = process.env.TOKEN_SECRET;

  if (!TOKEN_SECRET) {
    console.error("App is not configured correctly. No TOKEN_SECRET found.");

    return { authorizationStatus: "unauthorized" };
  }

  let accessToken = "";
  try {
    const encryptedToken = await cookies().get(TOKEN_NAME);

    accessToken = await Iron.unseal(
      encryptedToken?.value ?? "",
      TOKEN_SECRET,
      Iron.defaults,
    );
  } catch (e) {
    console.error("failed to get access token from cookie");
    return { authorizationStatus: "unauthorized" };
  }

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
    return { authorizationStatus: "authorized", octokit };
  }
  return { authorizationStatus: "unauthorized" };
};

export { authorizeUser };
