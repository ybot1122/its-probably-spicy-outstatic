"use server";

import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

export type UploadImageActionState = {
  status: "success" | "fail";
  reason?: string;
};

export async function uploadImageAction(
  currentState: UploadImageActionState,
  formData: FormData,
): Promise<UploadImageActionState> {
  const file = formData.get("image") as File;

  const arrayBuffer = await file.arrayBuffer();

  const buffer = new Uint8Array(arrayBuffer);

  cloudinary.config({
    cloud_name: "dryy6uo6k",
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  const result = await new Promise<UploadApiResponse | undefined>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            overwrite: false,
            folder: "its-probably-spicy",
            public_id: file.name,
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          },
        )
        .end(buffer);
    },
  );

  if (!result) {
    return { status: "fail" };
  }

  if (result.existing) {
    return { status: "fail", reason: "Filename already exists" };
  }

  return { status: "success" };
}
