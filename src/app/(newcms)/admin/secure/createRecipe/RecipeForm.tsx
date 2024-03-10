"use client";

import {
  CreateRecipeFormState,
  createRecipeAction,
} from "@/app/(newcms)/admin/secure/createRecipe/createRecipeAction";
import RecipeEditor from "@/app/(newcms)/admin/secure/createRecipe/RecipeEditor";
import { CreateRecipeSubmitButton } from "./CreateRecipeSubmitButton";
import { ImageChooserForm } from "@/app/(newcms)/admin/secure/createRecipe/ImageChooserForm";

// @ts-expect-error
import { experimental_useFormState as useFormState } from "react-dom";
import { onImageSelectedType } from "./[[...slug]]/page";
import { RecipeData } from "@/interfaces/recipeData";
import { useCallback, useState } from "react";

const RecipeForm = ({
  initialData,
  sha,
  slug,
}: {
  initialData?: RecipeData;
  sha?: string;
  slug?: string;
}) => {
  const [formState, formAction] = useFormState<CreateRecipeFormState>(
    createRecipeAction,
    null,
  );

  // when a callback is defined, it will be used by the image chooser form to
  // return the name of the image that was selected
  const [onImageSelected, setOnImageSelected] = useState<
    onImageSelectedType | undefined
  >();

  const closeImageChooser = useCallback(() => {
    setOnImageSelected(undefined);
  }, [setOnImageSelected]);

  if (formState?.status === "success") {
    return (
      <div className="m-20 max-w-lg mx-auto">
        <h1 className="text-xl text-center">Success! {formState.message}</h1>
      </div>
    );
  }

  return (
    <>
      <form action={formAction}>
        {/*<!-- Prevent implicit submission of the form -->*/}
        <button
          type="submit"
          disabled
          style={{ display: "none" }}
          aria-hidden="true"
        ></button>
        <RecipeEditor
          setOnImageSelected={setOnImageSelected}
          initialData={initialData}
          slug={slug}
        />
        {sha && <input type="hidden" name="sha" value={sha} />}
        {slug && <input type="hidden" name="slug" value={slug} />}
        <CreateRecipeSubmitButton formState={formState} sha={sha} />
      </form>
      {onImageSelected && (
        <ImageChooserForm
          onImageSelected={onImageSelected}
          closeImageChooser={closeImageChooser}
        />
      )}
    </>
  );
};

export { RecipeForm };
