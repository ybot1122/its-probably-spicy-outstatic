"use server";

import { RecipeData } from "@/interfaces/recipeData";
import spinalCase from "@/lib/spinalCase";
import { authorizeUser } from "@/lib/auth/authorizeUser";

export type CreateRecipeFormState = {
  status: "fail" | "success";
  message: string;
};

const validateFormData = (formData: FormData): RecipeData | string => {
  if (!formData || !formData.get) {
    return "no form data";
  }

  const recipeName = formData.get("recipeName")?.toString();
  const description = formData.get("description")?.toString();
  const prepTime = formData.get("prepTime")?.toString();
  const totalTime = formData.get("totalTime")?.toString();
  const totalYield = formData.get("totalYield")?.toString();

  if (!recipeName || !description || !prepTime || !totalTime || !totalYield) {
    return "missing metadata";
  }

  let i = 0;
  const recipeIngredients: string[] = [];
  while (formData.get(`recipeIngredient-${i}`)?.toString()) {
    const ingredient = formData.get(`recipeIngredient-${i}`)?.toString();

    if (ingredient) {
      recipeIngredients.push(ingredient);
    }

    i++;
  }

  if (recipeIngredients.length === 0) {
    return "missing ingredients";
  }

  i = 0;
  const recipeInstructions: { text: string; image: string | null }[] = [];
  while (formData.get(`recipeInstructions-${i}`)?.toString()) {
    const text = formData.get(`recipeInstructions-${i}`)?.toString();

    if (text) {
      const imageForm = formData.get(`recipeInstructions-${i}-image`);
      const image =
        imageForm === null ? null : `/images/${imageForm.toString()}`;

      recipeInstructions.push({ text, image });
    }

    i++;
  }

  if (recipeInstructions.length === 0) {
    return "missing instructions";
  }

  const rawFormData: RecipeData = {
    recipeName,
    publishedAt: new Date().toISOString(),
    author: "Head Chef Daisy",
    description,
    prepTime,
    totalTime,
    totalYield,
    recipeIngredients,
    recipeInstructions,
    images: {
      hero: "/images/Yellow-Banana-Bread_Hero_0530.jpg",
      gallery: [
        "/images/cinnamonrolls.jpeg",
        "/images/HawaiianRolls1.jpeg",
        "/images/Pretzels.jpeg",
      ],
    },
  };

  return rawFormData;
};

export async function createRecipeAction(
  currentState: CreateRecipeFormState,
  formData: FormData,
): Promise<CreateRecipeFormState> {
  const { authorizationStatus, octokit } = await authorizeUser();

  if (authorizationStatus === "unauthorized") {
    return {
      status: "fail",
      message: "unauthorized",
    };
  }

  const recipeData = validateFormData(formData);

  if (typeof recipeData === "string") {
    return {
      status: "fail",
      message: recipeData,
    };
  }

  const filename = spinalCase(recipeData.recipeName);

  const content = btoa(JSON.stringify(recipeData));

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
    return {
      status: "success",
      message: `published at recipes/${filename}`,
    };
  } else {
    return {
      status: "fail",
      message: "Could not publish",
    };
  }
}
