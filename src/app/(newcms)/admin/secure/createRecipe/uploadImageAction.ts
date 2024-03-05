"use server";

import { CLOUDINARY_CLOUD_NAME } from "@/lib/imagePath";
import spinalCase from "@/lib/spinalCase";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import path from "path";

export type UploadImageActionState = {
  status: "success" | "fail";
  reason?: string;
};

export async function uploadImageAction(
  currentState: UploadImageActionState,
  formData: FormData,
): Promise<UploadImageActionState> {
  const file = formData.get("image") as File;

  const public_id = spinalCase(path.parse(file.name).name);

  const ext = path.parse(file.name).ext;

  const arrayBuffer = await file.arrayBuffer();

  const buffer = new Uint8Array(arrayBuffer);

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  console.log("Starting image upload");

  const result = await new Promise<UploadApiResponse | undefined>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            overwrite: false,
            folder: "its-probably-spicy",
            public_id,
          },
          (error, result) => {
            console.log("Image upload completed with " + JSON.stringify(error));

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

  console.log("Successful image upload");

  if (!result) {
    return { status: "fail" };
  }

  if (result.existing) {
    return { status: "fail", reason: "Filename already exists" };
  }

  return { status: "success", reason: public_id + ext };
}
