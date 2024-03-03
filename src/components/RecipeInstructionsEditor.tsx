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

  return (
    <>
      <ol className="list-decimal list-inside p-5">
        {ingredients.map((ing: string, ind: number) => (
          <li key={ind}>{ing}</li>
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
