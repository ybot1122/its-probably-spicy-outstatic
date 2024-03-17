export function absoluteUrl(path: string) {
  return `${process.env?.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}${path}`;
}

export const description =
  "Head Chef Daisy presents her amazing recipes from all around the world. Just remember, It's Probably Spicy!";

export const siteName = "It's Probably Spicy";

export const author = "Head Chef Daisy";
