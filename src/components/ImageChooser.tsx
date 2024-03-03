import Image from "next/image";
import { useEffect, useState } from "react";

async function postData(url = "", file: File, str: string) {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("raw", str);
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: formData,
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

async function encodeImageFileAsURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onloadend = function () {
      const bytes = reader.result as string;
      const buffer = Buffer.from(bytes, "binary");
      resolve(buffer.toString("base64"));
    };
    reader.readAsArrayBuffer(file);
  });
}

const ImageChooser = ({
  images,
  close,
  selectImage,
}: {
  images: string[];
  close: () => void;
  selectImage: (src: string) => void;
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<"choose" | "upload">("choose");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const uploadCb = async () => {
      if (selectedImage === null) return;
      const str = await encodeImageFileAsURL(selectedImage);
      const upload = await postData(
        "/api/admin/imageUpload",
        selectedImage,
        str,
      );
      setIsUploading(false);
    };

    if (isUploading) {
      uploadCb();
    }
  }, [isUploading]);

  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <div className="absolute top-0 left-0 bottom-0 right-0 w-[600px] h-[600px] bg-silver mx-auto my-auto">
        <button onClick={close} className="absolute right-5 p-5">
          X
        </button>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <h2
              className="text-center mt-5 text-2xl cursor-pointer hover:underline"
              onClick={() => setActiveTab("choose")}
            >
              Choose an Image
            </h2>
          </div>
          <div>
            <h2
              className="text-center mt-5 text-2xl cursor-pointer hover:underline"
              onClick={() => setActiveTab("upload")}
            >
              Upload Image
            </h2>
          </div>
        </div>

        <div className="overflow-y-auto h-[500px]">
          {activeTab === "choose" && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((src, ind) => (
                <div
                  key={ind}
                  className="p-2 border-2 border-silver hover:border-orange"
                >
                  <button onClick={() => selectImage(src)}>
                    <Image
                      src={`/images/${src}`}
                      alt="image chooser"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "100%" }} // optional
                    />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "upload" && (
            <div className="text-center mt-10">
              <input
                type="file"
                name="myImage"
                className="block mx-auto mb-10"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  console.log(event?.target?.files?.[0]);
                  const file = event?.target?.files?.[0];

                  if (file) {
                    setSelectedImage(file);
                  }
                }}
              />
              {selectedImage && (
                <div className="inline-block">
                  <img
                    alt="not found"
                    width={"250px"}
                    src={URL.createObjectURL(selectedImage)}
                  />
                  <br />
                  <button
                    className="inline-block border-2 border-orange mr-5 p-2"
                    onClick={() => setSelectedImage(null)}
                  >
                    Remove
                  </button>

                  <button
                    className="inline-block border-2 border-orange p-2"
                    onClick={(e) => {
                      setIsUploading(true);
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    disabled={isUploading}
                  >
                    Upload
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageChooser;
