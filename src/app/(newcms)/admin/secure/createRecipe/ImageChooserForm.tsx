"use client";

import { useEffect, useState } from "react";
import { UploadImageActionState, uploadImageAction } from "./uploadImageAction";
// @ts-expect-error
import { experimental_useFormState as useFormState } from "react-dom";
// @ts-expect-error
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { onImageSelectedType } from "./page";
import Link from "next/link";

const SubmitButton = ({
  formState,
  onImageSelected,
}: {
  formState: UploadImageActionState;
  onImageSelected?: onImageSelectedType;
}) => {
  const { pending } = useFormStatus();

  useEffect(() => {
    if (
      !pending &&
      formState?.status === "success" &&
      formState.reason &&
      onImageSelected
    ) {
      onImageSelected(formState.reason);
    }
  }, [formState, onImageSelected, pending]);

  return !pending ? (
    <>
      <button
        type="submit"
        disabled={pending}
        className="block mt-5 border-2 border-black p-5 hover:border-silver mx-auto"
      >
        Upload
      </button>
      {formState?.status === "fail" && (
        <p className="text-red">{formState.reason}</p>
      )}
    </>
  ) : (
    <p>please wait...</p>
  );
};

const ImageChooserForm = ({
  onImageSelected,
  closeImageChooser,
}: {
  onImageSelected: onImageSelectedType;
  closeImageChooser: () => void;
}) => {
  const [selectedImage, setSelectedImage] = useState<Blob | null>(null);
  const [formState, formAction] = useFormState<UploadImageActionState>(
    uploadImageAction,
    null,
  );

  return (
    <div className="fixed inset-0 bg-silver bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border shadow-lg rounded-md bg-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold">Choose or Upload Image</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-lg">
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

                {selectedImage && (
                  <SubmitButton
                    formState={formState}
                    onImageSelected={onImageSelected}
                  />
                )}
              </form>
            </p>
          </div>
          <div className="flex justify-center mt-4">
            {/* Navigates back to the base URL - closing the modal */}
            <button onClick={closeImageChooser}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ImageChooserForm };
