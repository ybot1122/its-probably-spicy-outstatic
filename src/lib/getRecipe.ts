import fs from "fs";
import { join } from "path";
const recipesDirectory = join(process.cwd(), "outstatic/content/recipes");

export function getRecipe(slug: string) {
  const fullPath = join(recipesDirectory, slug + ".json");

  const file = JSON.parse(fs.readFileSync(fullPath, "utf8"));

  return file;
}
