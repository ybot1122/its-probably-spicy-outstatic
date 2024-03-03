"use client";

import { useCallback, useRef, useState } from "react";
import { style } from "./TextInput";

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

  return (
    <>
      <ul className="list-disc list-inside p-5">
        {ingredients.map((ing: string, ind: number) => (
          <li key={ind}>
            {ing}

            <input
              type="text"
              disabled
              className="hidden"
              name={`recipeIngredient-${ind}`}
              defaultValue={ing}
            />
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
