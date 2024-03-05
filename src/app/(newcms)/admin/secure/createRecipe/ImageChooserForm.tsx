"use client";

import { useEffect, useState } from "react";
import { UploadImageActionState, uploadImageAction } from "./uploadImageAction";
// @ts-expect-error
import { experimental_useFormState as useFormState } from "react-dom";
// @ts-expect-error
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { onImageSelectedType } from "./page";

const SubmitButton = ({
  formState,
  onImageSelected,
}: {
  formState: UploadImageActionState;
  onImageSelected?: onImageSelectedType;
}) => {
  const { pending } = useFormStatus();

  useEffect(() => {
    console.log(formState);
    console.log(pending);
    console.log(onImageSelected);
    if (!pending && formState?.status === "success" && onImageSelected) {
      console.log("a");
      onImageSelected("");
    }
  }, [formState, onImageSelected, pending]);

  return (
    <button
      type="submit"
      disabled={pending}
      className="border-2 border-black p-5 hover:border-silver"
    >
      Upload
    </button>
  );
};

const ImageChooserForm = ({
  onImageSelected,
}: {
  onImageSelected?: onImageSelectedType;
}) => {
  const [selectedImage, setSelectedImage] = useState<Blob | null>(null);
  const [formState, formAction] = useFormState<UploadImageActionState>(
    uploadImageAction,
    null,
  );

  return (
    <div className={`mt-20 ${onImageSelected ? "" : "hidden"}`}>
      {selectedImage && (
        <img
          alt="not found"
          width={"250px"}
          src={URL.createObjectURL(selectedImage)}
        />
      )}

      <form action={formAction}>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event?.target?.files?.[0];
            if (file) {
              // check if the file is an image
              if (!file.type.includes("image/")) {
                console.error("File type not supported.");
                return;

                // check if the file size is less than 20MB
              } else if (file.size / 1024 / 1024 > 20) {
                console.error("File size too big (max 20MB).");
                return;
              }

              setSelectedImage(file);
            }
          }}
        />

        <SubmitButton formState={formState} onImageSelected={onImageSelected} />
        {formState?.status}
      </form>
    </div>
  );
};

export { ImageChooserForm };
