"use server";

import { Octokit } from "octokit";
import { RecipeData } from "@/interfaces/recipeData";
import spinalCase from "@/lib/spinalCase";
import { cookies } from "next/headers";
import * as Iron from "@hapi/iron";
import { MAX_AGE, TOKEN_NAME } from "@/lib/auth/cookies";

export async function createRecipeAction(formData: RecipeData) {
  const octokit = new Octokit({
    auth: process.env.PERSONAL_ACCESS_TOKEN,
  });

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

export async function loginUserAction(code: string) {
  const TOKEN_SECRET = process.env.OST_TOKEN_SECRET;

  if (!TOKEN_SECRET)
    throw new Error(
      "invalid setup. no token secret found to encrypt access token",
    );

  // TODO use GH API to exchange the code for an API access token
  const accessToken = "fake";

  // Encrypt the access token
  const encryptedToken = await Iron.seal(
    accessToken,
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

  cookies().set("name", "hi");
}
