"use server";

import { RecipeData } from "@/interfaces/recipeData";
import spinalCase from "@/lib/spinalCase";
import { authorizeUser } from "@/lib/auth/authorizeUser";

export async function createRecipeAction(formData: RecipeData) {
  const { authorizationStatus, octokit } = await authorizeUser();

  if (authorizationStatus === "unauthorized") {
    return new Response("unauthorized", { status: 403 });
  }

  const filename = spinalCase(formData.recipeName);

  const content = btoa(JSON.stringify(formData));

  const response = await octokit.request(
    "PUT /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "ybot1122",
      repo: "its-probably-spicy-outstatic",
      path: `outstatic/content/recipes/${filename}.json`,
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
}
