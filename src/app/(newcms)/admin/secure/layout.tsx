import { redirect } from "next/navigation";
import Link from "next/link";
import { authorizeUser } from "@/lib/auth/authorizeUser";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  async function validateSession(): Promise<"authorized" | "unauthorized"> {
    "use server";

    const { authorizationStatus } = await authorizeUser();

    if (authorizationStatus === "unauthorized") {
      redirect("/admin");
    }

    return authorizationStatus;
  }

  const authStatus = await validateSession();

  return (
    <>
      <nav className="m-10 text-2xl">
        <Link href="/admin/secure/dashboard" className="hover:underline">
          Home
        </Link>{" "}
        | Logout
      </nav>
      <div className="m-20 w-xl max-w-xl mx-auto">{children}</div>
    </>
  );
}
