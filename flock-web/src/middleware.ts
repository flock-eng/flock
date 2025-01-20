import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnLoginPage = req.nextUrl.pathname === "/login"

  // If user is not logged in and trying to access any page except login
  if (!isLoggedIn && !isOnLoginPage) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // If user is logged in and trying to access login page
  if (isLoggedIn && isOnLoginPage) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
})

// Optionally configure middleware matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
} 