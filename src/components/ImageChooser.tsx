import Image from "next/image";

const ImageChooser = ({
  images,
  close,
}: {
  images: string[];
  close: () => void;
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <div className="absolute top-0 left-0 bottom-0 right-0 w-[600px] h-[600px] bg-silver mx-auto my-auto">
        <button onClick={close} className="absolute right-5 p-5">
          X
        </button>
        <h2 className="text-center mt-5 text-2xl">Choose an Image</h2>
        <div className="overflow-y-auto h-[500px]">
          {images.map((src) => (
            <Image
              src={`/images/${src}`}
              alt="image chooser"
              width={150}
              height={150}
              className="inline-block"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageChooser;
