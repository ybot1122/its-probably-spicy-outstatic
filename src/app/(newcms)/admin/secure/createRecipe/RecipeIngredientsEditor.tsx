"use client";

import { useCallback, useRef, useState } from "react";
import { StepOptions } from "./StepOptions";

const RecipeIngredientsEditor = ({ initialVal }: { initialVal?: string[] }) => {
  const addIngredientRef = useRef<HTMLInputElement>(null);
  const [ingredients, setIngredients] = useState<string[]>(initialVal ?? []);

  const addIngredient = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const keyCode = e.code;

      if (keyCode !== "Enter") {
        return;
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
      <ul className="list-disc list-inside p-5">
        {ingredients.map((ing: string, ind: number) => (
          <li key={ind} className="mb-2">
            <StepOptions
              deleteStep={deleteIngredient(ind)}
              reorderStepUp={moveIngredient(ind, true)}
              reorderStepDown={moveIngredient(ind, false)}
            />
            {ing}
            <input type="hidden" name={`recipeIngredient-${ind}`} value={ing} />
          </li>
        ))}
        <li>
          <input
            type="text"
            className="border-2 border-silver p-2 focus:outline-none focus:ring focus:border-blue-500"
            placeholder="New Ingredient"
            ref={addIngredientRef}
            onKeyDown={addIngredient}
          />
        </li>
      </ul>
    </>
  );
};

export default RecipeIngredientsEditor;
