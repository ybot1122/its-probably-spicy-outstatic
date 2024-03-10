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
            <thead>
              <tr>
                <th>Recipe Name</th>
                <th>Date Published</th>
                <th>Slug</th>
              </tr>
            </thead>
            <tbody>
              {allRecipes.map(({ title, publishedAt, slug }) => (
                <tr key={slug}>
                  <td>
                    <Link href={`/admin/secure/createRecipe/${slug}`}>
                      {title}
                    </Link>
                  </td>
                  <td>
                    <DateFormatter dateString={publishedAt} />
                  </td>
                  <td>{slug}</td>
                </tr>
              ))}
            </tbody>
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
