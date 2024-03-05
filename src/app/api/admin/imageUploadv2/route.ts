// Using Cloudinary

// TODO?
import { authorizeUser } from "@/lib/auth/authorizeUser";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

export async function POST(request: Request) {
  const authorizationStatus = await authorizeUser();

  if (authorizationStatus === "unauthorized") {
    return new Response("unauthorized", { status: 403 });
  }

  const formData = await request.formData();
  const image = formData.get("image") as File;
  const content = formData.get("raw") as string;
  const filename = image.name;

  if (!image || !content)
    return new Response("Invalid request for image upload", {
      status: 400,
    });

  cloudinary.config({
    cloud_name: "dryy6uo6k",
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

  const startUpload = () =>
    new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload(
        content,
        { public_id: filename },
        function (error, result) {
          console.log(error, result);
          if (error || !result) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
    });

  const res = await startUpload();
  console.log(res);

  return new Response(res.public_id + "." + res.format, { status: 200 });
}
