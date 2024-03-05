"use client";

import { useState } from "react";
import { ImageChooserForm } from "./ImageChooserForm";
import { RecipeForm } from "./RecipeForm";

export type onImageSelectedType = (img: string) => void;

export default function Page() {
  // when a callback is defined, it will be used by the image chooser form to
  // return the name of the image that was selected
  const [onImageSelected, setOnImageSelected] = useState<
    onImageSelectedType | undefined
  >();

  console.log(onImageSelected + " ");

  return (
    <>
      <h1 className="text-6xl text-center">Create a Recipe</h1>
      <RecipeForm setOnImageSelected={setOnImageSelected} />
      <ImageChooserForm onImageSelected={onImageSelected} />
    </>
  );
}
