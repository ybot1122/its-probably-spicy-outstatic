"use server";

import { RecipeData } from "@/interfaces/recipeData";
import spinalCase from "@/lib/spinalCase";
import { authorizeUser } from "@/lib/auth/authorizeUser";

export type CreateRecipeFormState = {
  status: "fail" | "success";
  message: string;
};

const validateFormData = (
  formData: FormData,
): { recipeData: RecipeData; sha?: string; slug?: string } | string => {
  if (!formData || !formData.get) {
    return "no form data";
  }

  const sha = formData.get("sha")?.toString();
  const slug = formData.get("slug")?.toString();

  /** METADATA */

  const recipeName = formData.get("recipeName")?.toString();
  const description = formData.get("description")?.toString();
  const prepTime = formData.get("prepTime")?.toString();
  const totalTime = formData.get("totalTime")?.toString();
  const totalYield = formData.get("totalYield")?.toString();

  if (!recipeName || !description || !prepTime || !totalTime || !totalYield) {
    return "missing metadata";
  }

  /** INGREDIENTS */

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

  /** INSTRUCTIONS */

  i = 0;
  const recipeInstructions: { text: string; image: string | null }[] = [];
  while (formData.get(`recipeInstructions-${i}`)?.toString()) {
    const text = formData.get(`recipeInstructions-${i}`)?.toString();

    if (text) {
      const imageForm = formData.get(`recipeInstructions-${i}-image`);
      const image = imageForm === null ? null : `${imageForm.toString()}`;

      recipeInstructions.push({ text, image });
    }

    i++;
  }

  if (recipeInstructions.length === 0) {
    return "missing instructions";
  }

  /** IMAGE GALLERY */
  i = 0;
  const recipeImageGallery: string[] = [];
  while (formData.get(`recipeGallery-${i}`)?.toString()) {
    const imgsrc = formData.get(`recipeGallery-${i}`)?.toString();

    if (imgsrc) {
      recipeImageGallery.push(imgsrc);
    }

    i++;
  }

  if (recipeImageGallery.length === 0) {
    return "at least 1 image required for image gallery";
  }

  /** HERO IMAGE */
  const heroImage = formData.get(`recipeHero`)?.toString();

  if (!heroImage) {
    return "Hero Image required for recipe";
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
      hero: heroImage,
      gallery: recipeImageGallery,
    },
  };

  return { recipeData: rawFormData, sha, slug };
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

  const validatedFormData = validateFormData(formData);

  if (typeof validatedFormData === "string") {
    return {
      status: "fail",
      message: validatedFormData,
    };
  }

  const { recipeData, sha, slug } = validatedFormData;

  try {
    const filename = spinalCase(recipeData.recipeName);

    const content = btoa(JSON.stringify(recipeData));

    const response = await octokit.request(
      "PUT /repos/{owner}/{repo}/contents/{path}",
      {
        owner: "ybot1122",
        repo: "its-probably-spicy-outstatic",
        path: `outstatic/content/recipes/${slug ? slug : filename}.json`,
        message: "my commit message",
        content,
        sha,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );

    if (response.status === 201) {
      return {
        status: "success",
        message: `published at recipes/${filename} ; Please wait 2 mins for update.`,
      };
    } else if (response.status === 200) {
      return {
        status: "success",
        message: `updated at recipes/${slug} ; Please wait 2 mins for update.`,
      };
    }
  } catch (e: any) {
    return {
      status: "fail",
      message: "error during publish",
    };
  }
  return {
    status: "fail",
    message: "Could not publish",
  };
}
