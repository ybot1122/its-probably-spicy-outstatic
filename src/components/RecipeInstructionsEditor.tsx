"use client";

import { useCallback, useRef, useState } from "react";
import { style } from "./TextInput";

const RecipeInstructionsEditor = ({
  initialVal,
}: {
  initialVal?: string[];
}) => {
  const addIngredientRef = useRef<HTMLTextAreaElement>(null);
  const [ingredients, setIngredients] = useState<string[]>(initialVal ?? []);

  const addIngredient = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const keyCode = e.code;

      if (keyCode !== "Enter") {
        return;
      } else {
        e.preventDefault();
        e.stopPropagation();
      }

      if (
        !addIngredientRef ||
        !addIngredientRef.current ||
        !addIngredientRef.current.value
      ) {
        return;
      }

      const updated = [...ingredients, addIngredientRef.current.value];
      setIngredients(updated);

      addIngredientRef.current.value = "";
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

  return (
    <>
      <ol className="p-5">
        {ingredients.map((ing: string, ind: number) => (
          <li key={ind} className="mb-2">
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
              onClick={() => {}}
              className="inline-block border-2 border-silver p-2 mr-5 hover:border-green cursor-pointer"
            >
              Add Image
            </span>
            Step {ind + 1}
            <p>{ing}</p>
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
