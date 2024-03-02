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
      src={images[0].src}
      alt={images[0].alt}
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: "100%", height: "auto" }} // optional
    />
  );

  return (
    <div className="relative w-full h-full">
      <div>{activeImage}</div>
      <div>
        {images.map(
          (img, ind) =>
            ind > 0 && (
              <Image
                src={img.src}
                alt={img.alt}
                key={`img-gallery-${ind}`}
                width={50}
                height={50}
              />
            ),
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
