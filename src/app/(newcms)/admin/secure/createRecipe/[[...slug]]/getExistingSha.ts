import { authorizeUser } from "@/lib/auth/authorizeUser";

export async function getExistingSha(params: {
  filename: string;
}): Promise<{ status: string; message: string }> {
  const { authorizationStatus, octokit } = await authorizeUser();

  if (authorizationStatus === "unauthorized") {
    return {
      status: "fail",
      message: "unauthorized",
    };
  }

  try {
    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner: "ybot1122",
        repo: "its-probably-spicy-outstatic",
        path: `content/recipes/${params.filename}.json`,
        message: "my commit message",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );

    if (response.status === 200) {
      return {
        status: "success",
        message: response.data.sha,
      };
    }
  } catch (e: any) {
    console.log(e);
  }

  return {
    status: "fail",
    message: "unknown fail",
  };
}
