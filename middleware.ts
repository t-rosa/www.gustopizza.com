import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({ req })
  const isAuthenticated = Boolean(token)

  if (isAuthenticated && pathname === "/") {
    return NextResponse.redirect(new URL("/pizzas", req.url))
  }

  if (isAuthenticated && pathname === "/login") {
    return NextResponse.redirect(new URL("/pizzas", req.url))
  }

  if (isAuthenticated && pathname === "/register") {
    return NextResponse.redirect(new URL("/pizzas", req.url))
  }

  if (!isAuthenticated && pathname === "/") {
    req.nextUrl.pathname = "/login";
    return NextResponse.redirect(req.nextUrl)
  }
}
