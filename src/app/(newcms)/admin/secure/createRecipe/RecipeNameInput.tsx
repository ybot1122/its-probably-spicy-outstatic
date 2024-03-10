"use client";

// TODO: REGEX

import { useCallback, useState } from "react";
import spinalCase from "@/lib/spinalCase";
import TextArea from "../../../../../components/TextArea";

const RecipeNameInput = ({
  initialVal,
  slug,
}: {
  initialVal?: string;
  slug?: string;
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
          {slug
            ? `Your URL Will Continue to Be: /recipes/${slug}`
            : `Your URL will be: /recipes/${spinalCase(val)}`}
        </p>
      )}
    </>
  );
};

export default RecipeNameInput;
