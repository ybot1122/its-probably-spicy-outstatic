import { useCallback, useState } from "react";
import { onImageSelectedType } from "./[[...slug]]/page";
import { IMAGE_PATH } from "@/lib/imagePath";
import Image from "next/image";

const HeroImageSelector = ({
  setOnImageSelected,
}: {
  setOnImageSelected: (cb?: onImageSelectedType) => void;
}) => {
  const [heroImage, setHeroImage] = useState<string>();

  const onImageSelected = useCallback(
    () => () => (imgname: string) => {
      setHeroImage(imgname);
      setOnImageSelected(undefined);
    },
    [setOnImageSelected],
  );

  return (
    <div>
      {heroImage && (
        <input type="hidden" name={`recipeHero`} value={heroImage} />
      )}

      {heroImage && (
        <Image
          src={IMAGE_PATH + heroImage}
          alt={`Recipe Hero Image`}
          width={150}
          height={150}
          className="mt-5"
        />
      )}

      {
        <span
          className="inline-block border-2 border-silver p-2 mr-5 hover:border-green cursor-pointer"
          onClick={() => {
            setOnImageSelected(onImageSelected());
          }}
        >
          {heroImage ? "Change" : "Add"} Image
        </span>
      }
    </div>
  );
};

export { HeroImageSelector };
