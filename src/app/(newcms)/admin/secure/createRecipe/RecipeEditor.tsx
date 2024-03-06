import { RecipeData } from "@/interfaces/recipeData";
import TextInput from "../../../../../components/TextInput";
import RecipeNameInput from "./RecipeNameInput";
import TextArea from "../../../../../components/TextArea";
import RecipeIngredientsEditor from "./RecipeIngredientsEditor";
import RecipeInstructionsEditor from "./RecipeInstructionsEditor";
import { useState } from "react";
import { onImageSelectedType } from "@/app/(newcms)/admin/secure/createRecipe/page";
import { RecipeImageGalleryEditor } from "./RecipeImageGalleryEditor";

type CreateRecipeSteps =
  | "recipeName"
  | "recipeDescription"
  | "recipeTimes"
  | "recipeIngredients"
  | "recipeInstructions";

const RecipeEditor = ({
  initialData,
  setOnImageSelected,
}: {
  initialData?: RecipeData;
  setOnImageSelected: (cb?: onImageSelectedType) => void;
}) => {
  return (
    <div className="mt-10">
      <div className="mb-5">
        <RecipeNameInput initialVal={initialData?.recipeName} />
      </div>

      <div className="mb-5 hidden">
        <TextInput
          initialVal={initialData?.author}
          label="Author"
          inputName="author"
          placeholder="Author"
        />
      </div>

      <div className="mb-5">
        <TextArea
          initialVal={initialData?.description}
          label="Recipe Description"
          inputName="description"
          placeholder="Recipe Description"
        ></TextArea>
      </div>
      <div className="mb-5">
        <TextArea
          initialVal={initialData?.prepTime}
          label="Prep Time"
          inputName="prepTime"
          placeholder="5 mins or 1h 30m"
        />
      </div>
      <div className="mb-5">
        <TextArea
          initialVal={initialData?.totalTime}
          label="Total Time"
          inputName="totalTime"
          placeholder="5 mins or 1h 30m"
        />
      </div>
      <div className="mb-5">
        <TextArea
          initialVal={initialData?.totalYield}
          label="Total Yield"
          inputName="totalYield"
          placeholder="5 muffins or 1 loaf"
        />
      </div>

      <div className="mb-5">
        <h2>Recipe Ingredients</h2>
        <RecipeIngredientsEditor />
      </div>

      <div className="mb-5">
        <h2>Recipe Instructions</h2>
        <RecipeInstructionsEditor setOnImageSelected={setOnImageSelected} />
      </div>

      <div className="mb-5">
        <h2>Recipe Image Gallery - Add up to 4 images</h2>
        <RecipeImageGalleryEditor setOnImageSelected={setOnImageSelected} />
      </div>
    </div>
  );
};

export default RecipeEditor;
