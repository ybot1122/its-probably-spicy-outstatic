import Link from "next/link";

export const AdminButton = ({
  text,
  type,
}: {
  text: string;
  type?: "submit";
}) => (
  <button
    type={type}
    className="border-silver border-2 hover:border-orange rounded p-10 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 "
  >
    {text}
  </button>
);

export default async function Page() {
  return (
    <div className="m-20 max-w-lg mx-auto">
      <h1 className="text-6xl text-center">Welcome to the Admin Panel</h1>

      <div className="grid grid-cols-2 text-center mt-20">
        <div className="col-span-2">
          <AdminButton text="Click to Login" />
        </div>
      </div>
    </div>
  );
}
