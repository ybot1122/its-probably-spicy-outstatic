import fs from "fs";
import { join } from "path";
const path = require("path");
const recipesDirectory = join(process.cwd(), "outstatic/content/recipes");

export function getAllRecipes() {
  const files = fs
    .readdirSync(recipesDirectory)
    .filter((filename) => filename.endsWith(".json"))
    .map((f) => f.slice(0, -5));

  return files;
}
