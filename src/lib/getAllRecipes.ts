import { RecipeData } from "@/interfaces/recipeData";
import fs from "fs";
import { join } from "path";
const recipesDirectory = join(process.cwd(), "outstatic/content/recipes");

export async function getAllRecipes() {
  const files = fs
    .readdirSync(recipesDirectory)
    .filter((filename) => filename.endsWith(".json"))
    .map((f) => {
      const slug = f.slice(0, -5);

      const data = fs.readFileSync(join(recipesDirectory, f), {
        encoding: "utf8",
        flag: "r",
      });

      const json: RecipeData = JSON.parse(data);

      return {
        title: json.recipeName,
        image: json.images.hero,
        slug,
        publishedAt: json.publishedAt,
      };
    });

  return files;
}
