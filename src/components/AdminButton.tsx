export const AdminButton = ({
  text,
  type,
}: {
  text: string;
  type?: "submit";
}) => {
  return (
    <button
      type={type}
      className="border-silver border-2 hover:border-orange rounded p-10 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 "
    >
      {text}
    </button>
  );
};
