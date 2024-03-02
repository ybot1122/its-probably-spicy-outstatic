import { RecipeData } from "@/interfaces/recipeData";
import TextInput from "./TextInput";
import RecipeNameInput from "./RecipeNameInput";

const RecipeEditor = ({ initialData }: { initialData?: RecipeData }) => {
  return (
    <div className="mt-10">
      <div className="mb-5">
        <RecipeNameInput initialVal={initialData?.recipeName} />
      </div>

      <div className="mb-5">
        <TextInput
          initialVal={initialData?.author ?? ""}
          label="Author"
          inputName="author"
          placeholder="Author"
        />
      </div>
    </div>
  );
};

export default RecipeEditor;
