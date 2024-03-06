"use client";

import { IMAGE_PATH } from "@/lib/imagePath";
import Image from "next/image";
import { useCallback, useState } from "react";
import { onImageSelectedType } from "./page";

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

  return (
    <div>
      {images.map((img, ind) => (
        <div key={`gallery-${ind}`}>
          <Image
            src={IMAGE_PATH + img}
            alt={`Recipe Gallery ${ind}`}
            width={150}
            height={150}
          />
        </div>
      ))}

      {images.length < 4 && (
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
