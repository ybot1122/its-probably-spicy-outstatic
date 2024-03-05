"use client";

// TODO: REGEX

import { useCallback, useState } from "react";
import spinalCase from "@/lib/spinalCase";
import TextArea from "./TextArea";

const RecipeNameInput = ({
  initialVal,
}: {
  initialVal: string | undefined;
}) => {
  const [val, setVal] = useState(initialVal ?? "");

  const onChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVal(e.target.value);
  }, []);

  return (
    <>
      <TextArea
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
