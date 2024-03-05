"use client";

import {
  CreateRecipeFormState,
  createRecipeAction,
} from "@/app/(newcms)/admin/secure/createRecipe/actions";
import RecipeEditor from "@/components/RecipeEditor";

// @ts-expect-error
import { experimental_useFormState as useFormState } from "react-dom";
import { CreateRecipeSubmitButton } from "./CreateRecipeSubmitButton";

export default function Page() {
  const images: string[] = [];

  const [formState, formAction] = useFormState<CreateRecipeFormState>(
    createRecipeAction,
    null,
  );

  if (formState?.status === "success") {
    return (
      <div className="m-20 max-w-lg mx-auto">
        <h1 className="text-6xl text-center">Success! {formState.message}</h1>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-6xl text-center">Create a Recipe</h1>
      <form action={formAction}>
        {/*<!-- Prevent implicit submission of the form -->*/}
        <button
          type="submit"
          disabled
          style={{ display: "none" }}
          aria-hidden="true"
        ></button>
        <RecipeEditor images={images} />
        <CreateRecipeSubmitButton formState={formState} />
      </form>
    </>
  );
}
