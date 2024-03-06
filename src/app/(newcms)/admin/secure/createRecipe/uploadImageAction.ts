"use server";

// https://community.cloudinary.com/discussion/432/image-upload-from-api-route-on-cloudinary-works-on-localhost-but-not-on-vercel-production

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

  const fileBuffer = await file.arrayBuffer();

  const mime = file.type;
  const encoding = "base64";
  const base64Data = Buffer.from(fileBuffer).toString("base64");
  const fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  console.log("Starting image upload");

  const uploadToCloudinary = () => {
    return new Promise<UploadApiResponse>((resolve, reject) => {
      const result = cloudinary.uploader
        .upload(fileUri, {
          invalidate: true,
          overwrite: false,
          folder: "its-probably-spicy",
          public_id,
        })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };

  const result = await uploadToCloudinary();

  console.log("Successful image upload");

  if (!result) {
    return { status: "fail" };
  }

  if (result.existing) {
    return { status: "fail", reason: "Filename already exists" };
  }

  return { status: "success", reason: public_id + ext };
}
