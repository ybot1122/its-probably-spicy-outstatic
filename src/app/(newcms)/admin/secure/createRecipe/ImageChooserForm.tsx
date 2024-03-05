"use client";

import { UploadImageActionState, uploadImageAction } from "./uploadImageAction";
// @ts-expect-error
import { experimental_useFormState as useFormState } from "react-dom";

const ImageChooserForm = () => {
  const [formState, formAction] = useFormState<UploadImageActionState>(
    uploadImageAction,
    null,
  );

  return (
    <form action={formAction}>
      <input type="file" name="image" />

      <button type="submit">Upload</button>
      {formState?.status}
    </form>
  );
};

export { ImageChooserForm };
