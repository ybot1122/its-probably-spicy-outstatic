import { createRecipeAction } from "../../actions";

export type RecipeData = {
  recipeName: string;
  publishedAt: string;
  author: string;
  description: string;

  prepTime: string;
  totalTime: string;
  totalYield: string;
  recipeIngredients: string[];
  recipeInstructions: { text: string; image: string | null }[];
  images: {
    hero: string;
    gallery: string[];
  };
};

export default async function Page() {
  async function createRecipe(formData: FormData) {
    "use server";

    const recipeName = formData.get("recipeName")?.toString();
    const description = formData.get("description")?.toString();

    if (!recipeName || !description) {
      return;
    }

    const rawFormData: RecipeData = {
      recipeName,
      publishedAt: new Date().toISOString(),
      author: "Head Chef Daisy",
      description,
      prepTime: "42 mins",
      totalTime: "12 hrs 42 mins",
      totalYield: 'about 2 dozen medium pancakes or 1 dozen 8" waffles',
      recipeIngredients: [
        "2 cups (240g) King Arthur Unbleached All-Purpose Flour",
        "1 cup (227g) sourdough starter unfed/discard",
        "2 tablespoons (28g) granulated sugar",
        "2 cups (454g) buttermilk",
        "all of the overnight sponge",
        "2 large eggs",
        "1/4 cup (50g) vegetable oil or 4 tablespoons (57g) butter melted",
        "3/4 teaspoon table salt",
        "1 teaspoon baking soda",
      ],
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
    <div>
      <h1>Hello</h1>

      <form action={createRecipe}>
        <div>
          <label>
            Recipe Name
            <input
              type="text"
              name="recipeName"
              className="border-black border-2"
            ></input>
          </label>
        </div>
        <div>
          <h2>Description</h2>
          <textarea
            name="description"
            className="border-black border-2"
          ></textarea>
        </div>
        ...<button type="submit">Make a Post</button>
      </form>
    </div>
  );
}
