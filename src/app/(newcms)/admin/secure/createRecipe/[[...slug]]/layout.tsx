import { getRecipe } from "@/lib/getRecipe";
import { RecipeData } from "@/interfaces/recipeData";

interface Params {
  params: {
    slug: string;
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  console.log(params);

  const data = await getData("demo-for-daisy");

  console.log(data);

  return <>{children}</>;
}

async function getData(slug: string) {
  const recipe = getRecipe(slug);

  return recipe as RecipeData;
}
