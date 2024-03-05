import { AdminButton } from "@/components/AdminButton";
import { CreateRecipeFormState } from "./actions";

// @ts-expect-error
import { experimental_useFormStatus as useFormStatus } from "react-dom";

const CreateRecipeSubmitButton = ({
  formState,
}: {
  formState: CreateRecipeFormState;
}) => {
  const { pending } = useFormStatus();

  return (
    <div className="text-center">
      {" "}
      <AdminButton text="Create Recipe!" type="submit" disabled={pending} />
      {formState?.status === "fail" && !pending && (
        <p className="text-red mt-5">{formState?.message}</p>
      )}
    </div>
  );
};

export { CreateRecipeSubmitButton };
