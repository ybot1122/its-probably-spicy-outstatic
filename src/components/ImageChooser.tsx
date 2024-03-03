import Image from "next/image";

const ImageChooser = ({
  images,
  close,
  selectImage,
}: {
  images: string[];
  close: () => void;
  selectImage: (src: string) => void;
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <div className="absolute top-0 left-0 bottom-0 right-0 w-[600px] h-[600px] bg-silver mx-auto my-auto">
        <button onClick={close} className="absolute right-5 p-5">
          X
        </button>
        <h2 className="text-center mt-5 text-2xl">Choose an Image</h2>
        <div className="overflow-y-auto h-[500px]">
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
        </div>
      </div>
    </div>
  );
};

export default ImageChooser;
