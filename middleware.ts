import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"
const PUBLIC_FILE = /\.(.*)$/;

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/register") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const token = await getToken({ req })

  if (!token && req.nextUrl.pathname !== "/login") {
    req.nextUrl.pathname = "/login";
    return NextResponse.redirect(req.nextUrl)
  }

  return NextResponse.next()
}
