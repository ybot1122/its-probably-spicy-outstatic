"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { onImageSelectedType } from "@/app/(newcms)/admin/secure/createRecipe/page";

const RecipeInstructionsEditor = ({
  initialVal,
  setOnImageSelected,
}: {
  initialVal?: { text: string; image: string | null }[];
  setOnImageSelected: (cb?: onImageSelectedType) => void;
}) => {
  const addIngredientRef = useRef<HTMLTextAreaElement>(null);
  const [ingredients, setIngredients] = useState<
    {
      text: string;
      image: string | null;
      localPreview?: string;
    }[]
  >(initialVal ?? []);
  const addIngredient = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const keyCode = e.code;

      if (keyCode !== "Enter") {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      if (
        !addIngredientRef ||
        !addIngredientRef.current ||
        !addIngredientRef.current.value
      ) {
        return false;
      }

      const updated = [
        ...ingredients,
        {
          text: addIngredientRef.current.value,
          image: null,
        },
      ];
      setIngredients(updated);

      addIngredientRef.current.value = "";

      return false;
    },
    [ingredients],
  );

  const deleteIngredient = useCallback(
    (ind: number) => () => {
      const updated = [...ingredients];
      updated.splice(ind, 1);
      setIngredients(updated);
    },
    [ingredients],
  );

  const moveIngredient = useCallback(
    (ind: number, up: boolean) => () => {
      if (up && ind === 0) return;
      if (!up && ind === ingredients.length - 1) return;

      const updated = [...ingredients];
      const temp = updated[ind];
      updated[ind] = up ? updated[ind - 1] : updated[ind + 1];
      updated[up ? ind - 1 : ind + 1] = temp;

      setIngredients(updated);
    },
    [ingredients],
  );

  const onImageSelected = useCallback(
    (ind: number) => () => (imgname: string) => {
      const updated = [...ingredients];
      updated[ind].image = imgname;
      setOnImageSelected(undefined);
    },
    [ingredients, setOnImageSelected],
  );

  return (
    <>
      <ol className="p-5">
        {ingredients.map(({ text, image, localPreview }, ind: number) => (
          <li key={ind} className="mb-2 border-2 border-silver p-5">
            <input
              type="hidden"
              name={`recipeInstructions-${ind}`}
              value={text}
            />
            {image && (
              <input
                type="hidden"
                name={`recipeInstructions-${ind}-image`}
                value={image}
              />
            )}

            <p className="mb-2">Step {ind + 1}</p>
            <span
              onClick={deleteIngredient(ind)}
              className="inline-block border-2 border-silver p-2 mr-5 hover:border-green cursor-pointer"
            >
              X
            </span>
            <span
              onClick={moveIngredient(ind, true)}
              className="inline-block border-2 border-silver p-2 mr-5 hover:border-green cursor-pointer"
            >
              &#8593;
            </span>
            <span
              onClick={moveIngredient(ind, false)}
              className="inline-block border-2 border-silver p-2 mr-5 hover:border-green cursor-pointer"
            >
              &#8595;
            </span>
            <span
              className="inline-block border-2 border-silver p-2 mr-5 hover:border-green cursor-pointer"
              onClick={() => {
                setOnImageSelected(onImageSelected(ind));
              }}
            >
              {image ? "Change" : "Add"} Image
            </span>
            <p className="mt-2">{text}</p>
            <p>
              {image && (
                <Image
                  src={localPreview ? localPreview : `/images/${image}`}
                  alt={`Recipe instruction step ${ind + 1}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "100%" }} // optional
                />
              )}
            </p>
          </li>
        ))}
        <li>
          <textarea
            className="border-2 border-silver p-2 focus:outline-none focus:ring focus:border-blue-500 w-full h-300"
            placeholder="New Instruction"
            ref={addIngredientRef}
            onKeyDown={addIngredient}
          />
        </li>
      </ol>
    </>
  );
};

export default RecipeInstructionsEditor;
