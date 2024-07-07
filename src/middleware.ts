import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Redirect authenticated users away from auth pages
  if (token && (url.pathname === "/" || url.pathname === "/sign-in" || url.pathname === "/sign-up" || url.pathname === "/verify")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Protect authenticated routes
  if (!token && (url.pathname.startsWith("/dashboard") || url.pathname.startsWith("/verify"))) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Allow access to public pages without redirection
  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/", "/dashboard/:path*", "/verify/:path"],
};
