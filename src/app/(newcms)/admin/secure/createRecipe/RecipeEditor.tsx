import { RecipeData } from "@/interfaces/recipeData";
import TextInput from "../../../../../components/TextInput";
import RecipeNameInput from "./RecipeNameInput";
import TextArea from "../../../../../components/TextArea";
import RecipeIngredientsEditor from "./RecipeIngredientsEditor";
import RecipeInstructionsEditor from "./RecipeInstructionsEditor";
import { useState } from "react";
import { onImageSelectedType } from "@/app/(newcms)/admin/secure/createRecipe/[[...slug]]/page";
import { RecipeImageGalleryEditor } from "./RecipeImageGalleryEditor";
import { HeroImageSelector } from "./HeroImageSelector";

type CreateRecipeSteps =
  | "recipeName"
  | "recipeDescription"
  | "recipeTimes"
  | "recipeIngredients"
  | "recipeInstructions";

const RecipeEditor = ({
  initialData,
  setOnImageSelected,
  slug,
}: {
  initialData?: RecipeData;
  setOnImageSelected: (cb?: onImageSelectedType) => void;
  slug?: string;
}) => {
  return (
    <div className="mt-10">
      <div className="mb-5">
        <RecipeNameInput initialVal={initialData?.recipeName} slug={slug} />
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
        <RecipeIngredientsEditor initialVal={initialData?.recipeIngredients} />
      </div>

      <div className="mb-5">
        <h2>Recipe Instructions</h2>
        <RecipeInstructionsEditor
          setOnImageSelected={setOnImageSelected}
          initialVal={initialData?.recipeInstructions}
        />
      </div>

      <div className="mb-5">
        <h2>Hero Image</h2>
        <HeroImageSelector
          setOnImageSelected={setOnImageSelected}
          initialVal={initialData?.images.hero}
        />
      </div>

      <div className="mb-5">
        <h2>Recipe Image Gallery - Add up to 3 images</h2>
        <RecipeImageGalleryEditor
          setOnImageSelected={setOnImageSelected}
          initialVal={initialData?.images.gallery}
        />
      </div>
    </div>
  );
};

export default RecipeEditor;
