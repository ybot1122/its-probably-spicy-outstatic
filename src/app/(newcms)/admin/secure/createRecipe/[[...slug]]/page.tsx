"use client";

import { useCallback, useState } from "react";
import { ImageChooserForm } from "../ImageChooserForm";
import { RecipeForm } from "../RecipeForm";

export type onImageSelectedType = (img: string) => void;

interface Params {
  params: {
    slug: string;
  };
}

export default function Page(params: Params) {
  // when a callback is defined, it will be used by the image chooser form to
  // return the name of the image that was selected
  const [onImageSelected, setOnImageSelected] = useState<
    onImageSelectedType | undefined
  >();

  const closeImageChooser = useCallback(() => {
    setOnImageSelected(undefined);
  }, [setOnImageSelected]);

  return (
    <>
      <h1 className="text-6xl text-center">Create a Recipe</h1>
      <RecipeForm setOnImageSelected={setOnImageSelected} />
      {onImageSelected && (
        <ImageChooserForm
          onImageSelected={onImageSelected}
          closeImageChooser={closeImageChooser}
        />
      )}
    </>
  );
}
