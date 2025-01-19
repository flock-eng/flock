import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnLandingPage = req.nextUrl.pathname === "/"
  const isOnLoginPage = req.nextUrl.pathname === "/login"

  // If user is not logged in and trying to access any page except landing or login
  if (!isLoggedIn && !isOnLandingPage && !isOnLoginPage) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // If user is logged in and trying to access landing or login page
  if (isLoggedIn && (isOnLandingPage || isOnLoginPage)) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
})

// Optionally configure middleware matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
} 