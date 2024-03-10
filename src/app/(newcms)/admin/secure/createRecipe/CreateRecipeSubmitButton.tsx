import { AdminButton } from "@/components/AdminButton";
import { CreateRecipeFormState } from "./createRecipeAction";

// @ts-expect-error
import { experimental_useFormStatus as useFormStatus } from "react-dom";

const CreateRecipeSubmitButton = ({
  formState,
  sha,
}: {
  formState: CreateRecipeFormState;
  sha?: string;
}) => {
  const { pending } = useFormStatus();

  if (pending) {
    return <div className="text-center">please wait...</div>;
  }

  return (
    <div className="text-center">
      {" "}
      <AdminButton
        text={`${sha ? "Update" : "Create"} Recipe!`}
        type="submit"
        disabled={pending}
      />
      {formState?.status === "fail" && !pending && (
        <p className="text-red mt-5">{formState?.message}</p>
      )}
    </div>
  );
};

export { CreateRecipeSubmitButton };
