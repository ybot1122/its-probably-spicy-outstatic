"use server";

import { Octokit } from "octokit";
import { RecipeData } from "./(newcms)/admin/page";

export async function createRecipeAction(formData: RecipeData) {
  const octokit = new Octokit({
    auth: process.env.PERSONAL_ACCESS_TOKEN,
  });

  const filename = spinalCase(formData.recipeName as string);

  const response = await octokit.request(
    "PUT /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "ybot1122",
      repo: "its-probably-spicy-outstatic",
      path: `outstatic/content/recipes/${filename}.txt`,
      message: "my commit message",
      content: "bXkgbmV3IGZpbGUgY29udGVudHM=",
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
}

const spinalCase = (str: string) => {
  return str
    .split(" ") //splits the string into pieces at spaces
    .map((c) => c.toLowerCase()) //makes each piece lowercase
    .join("-"); //combines each piece with a "-"
};
