import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

export async function handler(req: Request, ctx: MiddlewareHandlerContext) {
  const url = new URL(req.url);
  const { pathname } = url;

  // Skip auth check for login, callback, and static routes
  if (pathname.startsWith("/login") || 
      pathname.startsWith("/callback") ||
      pathname.startsWith("/static") || 
      pathname.startsWith("/logo.svg")) {
    return await ctx.next();
  }

  // Check for the presence of access token
  const cookies = getCookies(req.headers);
  if (!cookies.kc_access_token) {
    // No token => redirect to login
    return Response.redirect(`${url.origin}/login`, 302);
  }

  // Let the request proceed
  return await ctx.next();
} 