"use client";

import Image from "next/image";
import { useState } from "react";

type ImageGalleryImage = {
  src: string;
  alt: string;
};

type ImageGalleryProps = {
  images: ImageGalleryImage[];
};

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [activeImageInd, setActiveImageInd] = useState(0);

  const activeImage = (
    <Image
      src={images[activeImageInd].src}
      alt={images[activeImageInd].alt}
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "100%", height: "100%" }} // optional
    />
  );

  return (
    <div className="relative w-full h-full">
      <div>{activeImage}</div>
      <div className="grid grid-cols-3 mt-5">
        {images.length > 1 &&
          images.map((img, ind) => (
            <div
              className={`col-span-1 ${ind < 2 && "mr-5"} ${ind === activeImageInd ? "border-orange border-2" : ""} cursor-pointer`}
              key={`img-gallery-${ind}`}
              onClick={() => setActiveImageInd(ind)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "100%" }} // optional
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageGallery;
