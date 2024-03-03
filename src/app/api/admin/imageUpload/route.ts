import { Octokit } from "octokit";

export async function POST(request: Request) {
  const res = await request.formData();
  const image = res.get("image");

  if (!image) return Response.error();

  const octokit = new Octokit({
    auth: process.env.PERSONAL_ACCESS_TOKEN,
  });

  const filename = (image as any).name;

  console.log(filename);

  const content = "";

  const response = await octokit.request(
    "PUT /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "ybot1122",
      repo: "its-probably-spicy-outstatic",
      path: `public/images/${filename}`,
      message: "my commit message",
      content,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  if (response.status !== 201) {
    throw new Error("Failed to create recipe");
  } else {
    console.log("Recipe created");
  }

  return Response.json("hi");
}