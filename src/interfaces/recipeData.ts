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
