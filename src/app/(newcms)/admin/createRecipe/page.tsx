import { createRecipeAction } from "@/app/actions";
import RecipeEditor from "@/components/RecipeEditor";
import { RecipeData } from "@/interfaces/recipeData";
import { AdminButton } from "@/app/(newcms)/admin/dashboard/page";
import { getAllImages } from "@/lib/getAllImages";

export default async function Page() {
  async function createRecipe(formData: FormData) {
    "use server";

    const recipeName = formData.get("recipeName")?.toString();
    const description = formData.get("description")?.toString();
    const prepTime = formData.get("prepTime")?.toString();
    const totalTime = formData.get("totalTime")?.toString();
    const totalYield = formData.get("totalYield")?.toString();

    if (!recipeName || !description || !prepTime || !totalTime || !totalYield) {
      console.log("missing metadata");
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
      console.log("missing ingredients");
      return;
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
      console.log("missing instructions");
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

    // mutate data
    // revalidate cache

    createRecipeAction(rawFormData);
  }

  const { images } = await getData();

  return (
    <div className="m-20 max-w-lg mx-auto">
      <h1 className="text-6xl text-center">Create a Recipe</h1>
      <form action={createRecipe}>
        {/*<!-- Prevent implicit submission of the form -->*/}
        <button
          type="submit"
          disabled
          style={{ display: "none" }}
          aria-hidden="true"
        ></button>
        <RecipeEditor images={images} />
        <div className="text-center">
          {" "}
          <AdminButton text="Create Recipe!" type="submit" />
        </div>
      </form>
    </div>
  );
}

async function getData() {
  const images = getAllImages();

  return { images };
}
