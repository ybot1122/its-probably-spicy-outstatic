import { createRecipeAction } from "../../actions";

export type RecipeData = {
  filename: FormDataEntryValue | null;
};

export default async function Page() {
  async function createRecipe(formData: FormData) {
    "use server";

    const rawFormData: RecipeData = {
      filename: formData.get("filename"),
    };

    // mutate data
    // revalidate cache

    createRecipeAction(rawFormData);
  }

  return (
    <div>
      <h1>Hello</h1>

      <form action={createRecipe}>
        <input type="text" name="filename"></input>
        ...<button type="submit">Make a Post</button>
      </form>
    </div>
  );
}
