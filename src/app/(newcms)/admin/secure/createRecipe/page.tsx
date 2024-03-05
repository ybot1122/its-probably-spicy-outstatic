import { ImageChooserForm } from "./ImageChooserForm";
import { RecipeForm } from "./RecipeForm";

export default function Page() {
  const images: string[] = [];

  return (
    <>
      <h1 className="text-6xl text-center">Create a Recipe</h1>
      <RecipeForm />
      <ImageChooserForm />
    </>
  );
}
