"use client";

// TODO: REGEX

import { useCallback, useState } from "react";
import TextInput from "./TextInput";
import spinalCase from "@/lib/spinalCase";

const RecipeNameInput = ({
  initialVal,
}: {
  initialVal: string | undefined;
}) => {
  const [val, setVal] = useState(initialVal ?? "");

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  }, []);

  return (
    <>
      <TextInput
        initialVal={initialVal}
        label="Recipe Name"
        inputName="recipeName"
        placeholder="Recipe Name"
        onChange={onChange}
      />
      {val && (
        <p className="text-sm pt-2">
          Your URL will be: {`/recipes/${spinalCase(val)}`}
        </p>
      )}
    </>
  );
};

export default RecipeNameInput;
