import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

export async function handler(req: Request, ctx: MiddlewareHandlerContext) {
  const url = new URL(req.url);
  const { pathname } = url;

  // Skip auth check for public routes
  const publicPaths = [
    "/login",
    "/callback",
    "/static",
    "/logo.svg",
    "/favicon.ico",
  ];

  if (publicPaths.some(path => pathname.startsWith(path))) {
    return await ctx.next();
  }

  // Check for the presence of access token
  const cookies = getCookies(req.headers);

  if (!cookies.kc_access_token) {
    console.log(`[Auth] No token found, redirecting to login`);
    const loginUrl = new URL("/login", url.origin);
    return new Response(null, {
      status: 302,
      headers: {
        "Location": loginUrl.toString(),
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  }

  // Let the request proceed
  const response = await ctx.next();
  
  // Add cache control headers to the response
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  headers.set("Pragma", "no-cache");
  headers.set("Expires", "0");
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
} 