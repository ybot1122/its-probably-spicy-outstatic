import { RecipeData } from "@/interfaces/recipeData";
import { libre_baskerville } from "@/app/fonts";

const TextInput = ({
  initialVal,
  inputName,
  label,
  placeholder,
}: {
  initialVal: string;
  label: string;
  inputName: string;
  placeholder: string;
}) => (
  <>
    <label htmlFor={inputName} className="block mb-2">
      {label}
    </label>
    <input
      className={`block border-2 border-silver p-5 w-full focus:outline-none focus:ring focus:border-blue-500 mb-5 ${libre_baskerville.className}`}
      type="text"
      defaultValue={initialVal}
      placeholder={initialVal ? undefined : placeholder}
    />
  </>
);

const RecipeEditor = ({ initialData }: { initialData?: RecipeData }) => {
  return (
    <div className="mt-10">
      <TextInput
        initialVal={initialData?.recipeName ?? ""}
        label="Recipe Name"
        inputName="recipeName"
        placeholder="Recipe Name"
      />
      <TextInput
        initialVal={initialData?.author ?? ""}
        label="Author"
        inputName="author"
        placeholder="Author"
      />
    </div>
  );
};

export default RecipeEditor;
