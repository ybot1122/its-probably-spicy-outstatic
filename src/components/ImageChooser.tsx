const ImageChooser = ({ images }: { images: string[] }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <div className="absolute top-0 left-0 bottom-0 right-0 w-[300px] h-[300px] bg-silver mx-auto my-auto">
        <h2>Choose an Image</h2>
      </div>
    </div>
  );
};

export default ImageChooser;
