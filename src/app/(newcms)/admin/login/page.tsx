import Link from "next/link";
import { AdminButton } from "@/app/(newcms)/admin/page";
import { useCallback } from "react";
import { loginUserAction } from "@/app/actions";

export default async function Page() {
  async function loginUser() {
    "use server";
    loginUserAction("fake code");
  }

  return (
    <div className="m-20 max-w-lg mx-auto">
      <h1 className="text-6xl text-center">Welcome to the Admin Panel</h1>

      <div className="grid grid-cols-2 text-center mt-20">
        <div className="col-span-2">
          <form action={loginUser}>
            <AdminButton text="Click to Login" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}
