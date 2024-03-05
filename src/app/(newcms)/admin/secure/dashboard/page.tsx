import Link from "next/link";
import { AdminButton } from "@/components/AdminButton";

export default async function Page() {
  return (
    <div className="m-20 max-w-lg mx-auto">
      <h1 className="text-6xl text-center">Welcome to the Admin Panel</h1>

      <div className="grid grid-cols-2 text-center mt-20">
        <div className="col-span-1">
          <Link href="/admin/secure/createRecipe">
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
