import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

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

// Update matcher to be more permissive with static assets
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - _next (internal Next.js files)
     * - favicon.ico (favicon file)
     * - static chunks
     */
    "/((?!api|_next|favicon.ico|.*\\.js$).*)"
  ]
} 