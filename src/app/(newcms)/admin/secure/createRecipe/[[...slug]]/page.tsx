import { getRecipe } from "@/lib/getRecipe";
import { RecipeData } from "@/interfaces/recipeData";
import { RecipeForm } from "../RecipeForm";

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
      <h1 className="text-6xl text-center">Create a Recipe</h1>
      <RecipeForm initialData={initialData} />
    </>
  );
}

async function getData(slug: string) {
  const recipe = getRecipe(slug);

  return recipe as RecipeData;
}
