import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const session = getSessionCookie(req);

  if (!session) {
    if (req.url.includes("/auth/")) return NextResponse.next();
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next/static|_next/image|auth/(?!forget-password)(?:.*)?|auth$|.*\\.png$).*)",
  ],
};
