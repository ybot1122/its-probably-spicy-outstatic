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

    const authorizationStatus = await authorizeUser();

    if (authorizationStatus === "unauthorized") {
      redirect("/admin");
    }

    return authorizationStatus;
  }

  const authStatus = await validateSession();

  return (
    <>
      <nav>
        <Link href="/admin/secure/dashboard">Home</Link> | Logout
      </nav>
      {children}
    </>
  );
}
