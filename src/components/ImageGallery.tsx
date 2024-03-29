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
      fill
      className="object-cover"
    />
  );

  return (
    <div className="relative w-full h-full">
      <div className="relative aspect-video">{activeImage}</div>
      <div className="grid grid-cols-3 mt-5">
        {images.length > 1 &&
          images.map((img, ind) => (
            <div
              className={`relative aspect-video col-span-1 ${ind < 2 && "mr-5"} ${ind === activeImageInd ? "border-orange border-2" : ""} cursor-pointer`}
              key={`img-gallery-${ind}`}
              onClick={() => setActiveImageInd(ind)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageGallery;
