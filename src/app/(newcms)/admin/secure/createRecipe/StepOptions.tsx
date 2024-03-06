const StepOptions = ({
  deleteStep,
  reorderStepUp,
  reorderStepDown,
  imageOptions,
}: {
  deleteStep: () => void;
  reorderStepUp: () => void;
  reorderStepDown: () => void;
  imageOptions?: {
    hasImage: boolean;
    changeImage: () => void;
  };
}) => {
  return (
    <>
      <span
        onClick={deleteStep}
        className="inline-block border-2 border-silver p-2 mr-5 hover:border-green cursor-pointer"
      >
        X
      </span>
      <span
        onClick={reorderStepUp}
        className="inline-block border-2 border-silver p-2 mr-5 hover:border-green cursor-pointer"
      >
        &#8593;
      </span>
      <span
        onClick={reorderStepDown}
        className="inline-block border-2 border-silver p-2 mr-5 hover:border-green cursor-pointer"
      >
        &#8595;
      </span>
      {imageOptions && (
        <span
          className="inline-block border-2 border-silver p-2 mr-5 hover:border-green cursor-pointer"
          onClick={imageOptions.changeImage}
        >
          {imageOptions.hasImage ? "Change" : "Add"} Image
        </span>
      )}
    </>
  );
};

export { StepOptions };
