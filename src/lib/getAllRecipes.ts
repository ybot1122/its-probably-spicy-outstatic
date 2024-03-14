import { RecipeData } from "@/interfaces/recipeData";
import fs from "fs";
import { join } from "path";
const recipesDirectory = join(process.cwd(), "content/recipes");

export async function getAllRecipes() {
  const files = fs
    .readdirSync(recipesDirectory)
    .filter((filename) => filename.endsWith(".json"))
    .map((f) => {
      return {
        name: f,
        time: fs.statSync(join(recipesDirectory, f)).mtime.getTime(),
      };
    })
    .sort((a, b) => {
      return b.time - a.time;
    })
    .map((f) => {
      const slug = f.name.slice(0, -5);

      const data = fs.readFileSync(join(recipesDirectory, f.name), {
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
