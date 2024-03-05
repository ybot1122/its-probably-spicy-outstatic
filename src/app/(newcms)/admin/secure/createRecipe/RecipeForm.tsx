"use client";

import {
  CreateRecipeFormState,
  createRecipeAction,
} from "@/app/(newcms)/admin/secure/createRecipe/createRecipeAction";
import RecipeEditor from "@/app/(newcms)/admin/secure/createRecipe/RecipeEditor";
import { CreateRecipeSubmitButton } from "./CreateRecipeSubmitButton";

// @ts-expect-error
import { experimental_useFormState as useFormState } from "react-dom";
import { onImageSelectedType } from "./page";

const RecipeForm = ({
  setOnImageSelected,
}: {
  setOnImageSelected: (cb?: onImageSelectedType) => void;
}) => {
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
    <form action={formAction}>
      {/*<!-- Prevent implicit submission of the form -->*/}
      <button
        type="submit"
        disabled
        style={{ display: "none" }}
        aria-hidden="true"
      ></button>
      <RecipeEditor setOnImageSelected={setOnImageSelected} />
      <CreateRecipeSubmitButton formState={formState} />
    </form>
  );
};

export { RecipeForm };
