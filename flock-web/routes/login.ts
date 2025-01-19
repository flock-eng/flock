import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(_req) {
    // Get environment variables
    const issuer = Deno.env.get("KEYCLOAK_ISSUER")!;
    const clientId = Deno.env.get("KEYCLOAK_CLIENT_ID")!;
    const redirectUri = Deno.env.get("REDIRECT_URI")!;

    // Construct Keycloak's authorize URL
    const authorizeUrl = new URL(`${issuer}/protocol/openid-connect/auth`);
    authorizeUrl.searchParams.set("client_id", clientId);
    authorizeUrl.searchParams.set("redirect_uri", redirectUri);
    authorizeUrl.searchParams.set("response_type", "code");
    authorizeUrl.searchParams.set("scope", "openid profile email");

    // Generate and store state for CSRF protection
    const state = crypto.randomUUID();
    authorizeUrl.searchParams.set("state", state);

    return Response.redirect(authorizeUrl.toString(), 302);
  },
}; 