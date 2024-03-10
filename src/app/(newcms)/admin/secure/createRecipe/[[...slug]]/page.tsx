import { getRecipe } from "@/lib/getRecipe";
import { RecipeData } from "@/interfaces/recipeData";
import { RecipeForm } from "../RecipeForm";
import { getExistingSha } from "./getExistingSha";

export type onImageSelectedType = (img: string) => void;

interface Params {
  params: {
    slug: string;
  };
}

export default async function Page(params: Params) {
  const initialData = params.params.slug
    ? await getData(params.params.slug)
    : undefined;

  return (
    <>
      <h1 className="text-6xl text-center">
        {initialData
          ? `Updating Recipe at /recipes/${params.params.slug}`
          : "Create a Recipe"}
      </h1>
      <RecipeForm
        initialData={initialData?.recipe}
        sha={initialData?.sha}
        slug={params.params.slug}
      />
    </>
  );
}

async function getData(slug: string) {
  const recipe = getRecipe(slug);
  const response = await getExistingSha({ filename: slug });

  return { recipe: recipe as RecipeData, sha: response.message };
}
