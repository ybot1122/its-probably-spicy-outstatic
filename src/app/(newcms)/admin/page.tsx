import Link from "next/link";

const AdminButton = ({ text }: { text: string }) => (
  <button className="border-silver border-2 hover:border-orange rounded p-10 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 ">
    {text}
  </button>
);

export default async function Page() {
  return (
    <div className="m-20 max-w-lg mx-auto">
      <h1 className="text-6xl text-center">Welcome to the Admin Panel</h1>

      <div className="grid grid-cols-2 text-center mt-20">
        <div className="col-span-1">
          <Link href="admin/createRecipe">
            <AdminButton text="Create a new Recipe" />
          </Link>
        </div>

        <div className="col-span-1">
          <AdminButton text="Edit an Existing Recipe" />
        </div>
      </div>
    </div>
  );
}
