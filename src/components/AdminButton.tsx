export const AdminButton = ({
  text,
  type,
  disabled = false,
}: {
  text: string;
  type?: "submit";
  disabled?: boolean;
}) => {
  return (
    <button
      type={type}
      className="border-silver border-2 hover:border-orange rounded p-10 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 "
      disabled={disabled}
    >
      {text}
    </button>
  );
};
