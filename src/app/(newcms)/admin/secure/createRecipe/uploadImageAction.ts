"use server";

import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

export type UploadImageActionState = {
  status: "success" | "fail";
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

  await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      })
      .end(buffer);
  });

  return { status: "success" };
}
