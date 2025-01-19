import { Handlers } from "$fresh/server.ts";
import { deleteCookie } from "$std/http/cookie.ts";

export const handler: Handlers = {
  GET(req) {
    const url = new URL(req.url);
    const headers = new Headers(req.headers);
    const baseUrl = Deno.env.get("BASE_URL")!;
    const issuer = Deno.env.get("KEYCLOAK_ISSUER")!;
    const clientId = Deno.env.get("KEYCLOAK_CLIENT_ID")!;

    // Remove the access token cookie with all necessary attributes to ensure deletion
    const cookieOptions = {
      path: "/",
      domain: new URL(baseUrl).hostname,
      // Setting maxAge to 0 and expires to the past ensures the cookie is deleted
      maxAge: 0,
      expires: new Date(0),
    };

    // Delete the cookie multiple ways to ensure it's removed
    deleteCookie(headers, "kc_access_token", cookieOptions);
    
    // Also set it with an empty value and immediate expiration as a backup
    headers.append("Set-Cookie", 
      `kc_access_token=; path=/; domain=${cookieOptions.domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0`
    );

    // Construct Keycloak's logout URL with redirect back to login
    const logoutUrl = new URL(`${issuer}/protocol/openid-connect/logout`);
    logoutUrl.searchParams.set("client_id", clientId);
    logoutUrl.searchParams.set("post_logout_redirect_uri", `${baseUrl}/login`);

    // Add the logout URL to the Location header
    headers.set("Location", logoutUrl.toString());

    // Return with all headers including cookie deletion
    return new Response(null, {
      status: 302,
      headers: headers
    });
  },
}; 