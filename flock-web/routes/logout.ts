import { Handlers } from "$fresh/server.ts";
import { deleteCookie } from "$std/http/cookie.ts";

export const handler: Handlers = {
  GET(req) {
    const url = new URL(req.url);
    const headers = new Headers(req.headers);
    const baseUrl = Deno.env.get("BASE_URL")!;
    const issuer = Deno.env.get("KEYCLOAK_ISSUER")!;
    const clientId = Deno.env.get("KEYCLOAK_CLIENT_ID")!;

    // Remove the access token cookie
    deleteCookie(headers, "kc_access_token", {
      path: "/",
      domain: new URL(baseUrl).hostname,
    });

    // Construct Keycloak's logout URL with redirect back to login
    const logoutUrl = new URL(`${issuer}/protocol/openid-connect/logout`);
    logoutUrl.searchParams.set("client_id", clientId);
    // Redirect back to /login instead of the base URL
    logoutUrl.searchParams.set("post_logout_redirect_uri", `${baseUrl}/login`);

    // Redirect to Keycloak's logout endpoint
    return Response.redirect(logoutUrl.toString(), 302);
  },
}; 