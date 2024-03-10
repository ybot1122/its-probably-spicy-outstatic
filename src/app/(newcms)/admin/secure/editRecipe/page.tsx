import Link from "next/link";
import { AdminButton } from "@/components/AdminButton";
import { getAllRecipes } from "@/lib/getAllRecipes";
import DateFormatter from "@/components/DateFormatter";

export default async function EditRecipe() {
  const { allRecipes } = await getData();

  return (
    <>
      <h1 className="text-6xl text-center">Edit a Recipe</h1>

      <div className="grid grid-cols-2 text-center mt-20">
        <div className="col-span-2">
          <table className="w-full text-left">
            <tr>
              <th>Recipe Name</th>
              <th>Date Published</th>
              <th>Slug</th>
            </tr>
            {allRecipes.map(({ title, publishedAt, slug }) => (
              <tr key={slug}>
                <td>{title}</td>
                <td>
                  <DateFormatter dateString={publishedAt} />
                </td>
                <td>{`/recipes/${slug}`}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}

async function getData() {
  const allRecipes = await getAllRecipes();

  return {
    allRecipes,
  };
}
