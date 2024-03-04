import { Octokit } from "octokit";
import { TOKEN_NAME } from "@/lib/auth/cookies";
import * as Iron from "@hapi/iron";
import { cookies } from "next/headers";
import { allowedUsers } from "@/lib/allowedUsers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  async function validateSession(): Promise<"authorized" | "unauthorized"> {
    "use server";

    const TOKEN_SECRET = process.env.OST_TOKEN_SECRET;

    if (!TOKEN_SECRET) {
      throw new Error(
        "App is not configured correctly. No TOKEN_SECRET found.",
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
      return "authorized";
    } else {
      redirect("/admin");
    }
  }

  const authStatus = await validateSession();

  return (
    <>
      <nav>
        <Link href="/admin/secure/dashboard">Home</Link> | Logout
      </nav>
      {children}
    </>
  );
}
