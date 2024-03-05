import { Octokit } from "octokit";

// @ts-ignore
import { createOAuthUserAuth } from "@octokit/auth-oauth-user";

import * as Iron from "@hapi/iron";
import { cookies } from "next/headers";
import { MAX_AGE, TOKEN_NAME } from "@/lib/auth/cookies";
import { redirect } from "next/navigation";
import { allowedUsers } from "@/lib/allowedUsers";

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code");

  const TOKEN_SECRET = process.env.OST_TOKEN_SECRET;

  if (!TOKEN_SECRET) {
    return new Response(
      "App is not configured correctly. No TOKEN_SECRET found.",
      {
        status: 500,
      },
    );
  }

  let token;
  try {
    const auth = createOAuthUserAuth({
      clientId: process.env.OST_GITHUB_ID ?? "",
      clientSecret: process.env.OST_GITHUB_SECRET ?? "",
      code: code,
    });

    // Exchanges the code for the user access token authentication on first call
    // and caches the authentication for successive calls
    token = await auth();
  } catch (e) {
    return new Response("Failed to exchange code for access token", {
      status: 400,
    });
  }

  try {
    // Octokit.js
    // https://github.com/octokit/core.js#readme
    const octokit = new Octokit({
      auth: token.token,
    });

    const response = await octokit.request("GET /user", {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    const data = await response.data;

    if (allowedUsers.includes(data.login)) {
      // Encrypt the access token
      const encryptedToken = await Iron.seal(
        token.token,
        TOKEN_SECRET,
        Iron.defaults,
      );

      // Set the encrypted access token in cookie
      await cookies().set(TOKEN_NAME, encryptedToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: MAX_AGE,
        path: "/",
      });
    } else {
      return new Response("Sorry, you are not authorized.", {
        status: 403,
      });
    }
  } catch (e) {
    return new Response("Failed to get user data for authentication", {
      status: 400,
    });
  }

  redirect("/admin/secure/dashboard");
}
