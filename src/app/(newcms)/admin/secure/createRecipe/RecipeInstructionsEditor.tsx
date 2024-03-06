"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { onImageSelectedType } from "@/app/(newcms)/admin/secure/createRecipe/page";
import { IMAGE_PATH } from "@/lib/imagePath";

const RecipeInstructionsEditor = ({
  initialVal,
  setOnImageSelected,
}: {
  initialVal?: { text: string; image: string | null }[];
  setOnImageSelected: (cb?: onImageSelectedType) => void;
}) => {
  const addInstructionRef = useRef<HTMLTextAreaElement>(null);
  const [instructions, setInstructions] = useState<
    {
      text: string;
      image: string | null;
    }[]
  >(initialVal ?? []);
  const addInstruction = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const keyCode = e.code;

      if (keyCode !== "Enter") {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      if (
        !addInstructionRef ||
        !addInstructionRef.current ||
        !addInstructionRef.current.value
      ) {
        return false;
      }

      const updated = [
        ...instructions,
        {
          text: addInstructionRef.current.value,
          image: null,
        },
      ];
      setInstructions(updated);

      addInstructionRef.current.value = "";

      return false;
    },
    [instructions],
  );

  const deleteInstruction = useCallback(
    (ind: number) => () => {
      const updated = [...instructions];
      updated.splice(ind, 1);
      setInstructions(updated);
    },
    [instructions],
  );

  const moveInstruction = useCallback(
    (ind: number, up: boolean) => () => {
      if (up && ind === 0) return;
      if (!up && ind === instructions.length - 1) return;

      const updated = [...instructions];
      const temp = updated[ind];
      updated[ind] = up ? updated[ind - 1] : updated[ind + 1];
      updated[up ? ind - 1 : ind + 1] = temp;

      setInstructions(updated);
    },
    [instructions],
  );

  const onImageSelected = useCallback(
    (ind: number) => () => (imgname: string) => {
      const updated = [...instructions];
      updated[ind].image = imgname;
      setInstructions(updated);
      setOnImageSelected(undefined);
    },
    [instructions, setOnImageSelected],
  );

  return (
    <>
      <ol className="p-5">
        {instructions.map(({ text, image }, ind: number) => (
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
              onClick={deleteInstruction(ind)}
              className="inline-block border-2 border-silver p-2 mr-5 hover:border-green cursor-pointer"
            >
              X
            </span>
            <span
              onClick={moveInstruction(ind, true)}
              className="inline-block border-2 border-silver p-2 mr-5 hover:border-green cursor-pointer"
            >
              &#8593;
            </span>
            <span
              onClick={moveInstruction(ind, false)}
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
                  src={`${IMAGE_PATH}${image}`}
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
            ref={addInstructionRef}
            onKeyDown={addInstruction}
          />
        </li>
      </ol>
    </>
  );
};

export default RecipeInstructionsEditor;
