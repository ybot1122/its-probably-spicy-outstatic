import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { TOKEN_NAME } from "./lib/auth/cookies";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;

  const encryptedToken = cookies().get(TOKEN_NAME);

  if (
    !currentUser &&
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/admin/login")
  ) {
    return Response.redirect(new URL("/admin/login", request.url));
  }
}
