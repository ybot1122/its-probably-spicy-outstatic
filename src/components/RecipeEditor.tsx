import { RecipeData } from "@/interfaces/recipeData";
import TextInput from "./TextInput";
import RecipeNameInput from "./RecipeNameInput";
import TextArea from "./TextArea";
import RecipeIngredientsEditor from "./RecipeIngredientsEditor";

const RecipeEditor = ({ initialData }: { initialData?: RecipeData }) => {
  return (
    <div className="mt-10">
      <div className="mb-5">
        <RecipeNameInput initialVal={initialData?.recipeName} />
      </div>

      <div className="mb-5">
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
        <TextInput
          initialVal={initialData?.prepTime}
          label="Prep Time"
          inputName="prepTime"
          placeholder="5 mins or 1h 30m"
        />
      </div>
      <div className="mb-5">
        <TextInput
          initialVal={initialData?.totalTime}
          label="Total Time"
          inputName="totalTime"
          placeholder="5 mins or 1h 30m"
        />
      </div>
      <div className="mb-5">
        <TextInput
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
    </div>
  );
};

export default RecipeEditor;
