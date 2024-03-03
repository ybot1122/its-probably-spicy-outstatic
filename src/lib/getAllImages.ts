import fs from "fs";
import { join } from "path";
const imagesDir = join(process.cwd(), "public/images");

export function getAllImages() {
  const files = fs.readdirSync(imagesDir);

  return files;
}
