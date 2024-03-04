import { Octokit } from "octokit";

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code");
  console.log(code);

  // Octokit.js
  // https://github.com/octokit/core.js#readme
  const octokit = new Octokit({
    auth: code,
  });

  await octokit.request("GET /user", {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return new Response("Hello, Next.js!", {
    status: 200,
  });
}
