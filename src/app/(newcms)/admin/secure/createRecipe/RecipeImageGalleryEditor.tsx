"use client";

import { IMAGE_PATH } from "@/lib/imagePath";
import Image from "next/image";
import { useCallback, useState } from "react";
import { onImageSelectedType } from "./page";
import { StepOptions } from "./StepOptions";

const RecipeImageGalleryEditor = ({
  setOnImageSelected,
}: {
  setOnImageSelected: (cb?: onImageSelectedType) => void;
}) => {
  const [images, setImages] = useState<string[]>([]);

  const onImageSelected = useCallback(
    (ind: number) => () => (imgname: string) => {
      const updated = [...images];
      updated[ind] = imgname;
      setImages(updated);
      setOnImageSelected(undefined);
    },
    [images, setOnImageSelected],
  );

  const deleteImage = useCallback(
    (ind: number) => () => {
      const updated = [...images];
      updated.splice(ind, 1);
      setImages(updated);
    },
    [images],
  );

  const moveImage = useCallback(
    (ind: number, up: boolean) => () => {
      if (up && ind === 0) return;
      if (!up && ind === images.length - 1) return;

      const updated = [...images];
      const temp = updated[ind];
      updated[ind] = up ? updated[ind - 1] : updated[ind + 1];
      updated[up ? ind - 1 : ind + 1] = temp;

      setImages(updated);
    },
    [images],
  );

  return (
    <div>
      {images.map((img, ind) => (
        <div key={`gallery-${ind}`} className="m-5 border-2 border-silver p-5">
          <input type="hidden" name={`recipeGallery-${ind}`} value={img} />

          <StepOptions
            deleteStep={deleteImage(ind)}
            reorderStepUp={moveImage(ind, true)}
            reorderStepDown={moveImage(ind, false)}
            imageOptions={{
              hasImage: true,
              changeImage: () => setOnImageSelected(onImageSelected(ind)),
            }}
          />

          <Image
            src={IMAGE_PATH + img}
            alt={`Recipe Gallery ${ind}`}
            width={150}
            height={150}
            className="mt-5"
          />
        </div>
      ))}

      {images.length < 3 && (
        <span
          className="inline-block border-2 border-silver p-2 mr-5 hover:border-green cursor-pointer"
          onClick={() => {
            setOnImageSelected(onImageSelected(images.length));
          }}
        >
          Add Image
        </span>
      )}
    </div>
  );
};

export { RecipeImageGalleryEditor };
