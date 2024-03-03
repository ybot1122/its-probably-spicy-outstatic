import { createRecipeAction } from "@/app/actions";
import RecipeEditor from "@/components/RecipeEditor";
import { RecipeData } from "@/interfaces/recipeData";
import { AdminButton } from "../page";

export default async function Page() {
  async function createRecipe(formData: FormData) {
    "use server";

    const recipeName = formData.get("recipeName")?.toString();
    const description = formData.get("description")?.toString();
    const prepTime = formData.get("prepTime")?.toString();
    const totalTime = formData.get("totalTime")?.toString();
    const totalYield = formData.get("totalYield")?.toString();

    if (!recipeName || !description || !prepTime || !totalTime || !totalYield) {
      return;
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
      return;
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
      recipeInstructions: [
        {
          text: "To make the overnight sponge: Stir down your refrigerated starter, and remove 1 cup (227g). Note: This is a good opportunity to feed the remainder, if necessary.",
          image: null,
        },
        {
          text: "In a large bowl, stir together the 1 cup (227g) unfed starter, flour, sugar, and buttermilk.",
          image: "/images/couple-pizza.png",
        },
      ],
      images: {
        hero: "/images/Yellow-Banana-Bread_Hero_0530.jpg",
        gallery: [
          "/images/cinnamonrolls.jpeg",
          "/images/HawaiianRolls1.jpeg",
          "/images/Pretzels.jpeg",
        ],
      },
    };

    // mutate data
    // revalidate cache

    createRecipeAction(rawFormData);
  }

  return (
    <div className="m-20 max-w-lg mx-auto">
      <h1 className="text-6xl text-center">Create a Recipe</h1>
      <form action={createRecipe}>
        <RecipeEditor />
        <div className="text-center">
          {" "}
          <AdminButton text="Create Recipe!" type="submit" />
        </div>
      </form>
    </div>
  );
}
