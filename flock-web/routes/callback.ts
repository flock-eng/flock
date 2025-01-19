import { Handlers } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";

interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  id_token?: string;
  expires_in: number;
  refresh_expires_in?: number;
  token_type: string;
  session_state?: string;
  scope: string;
}

export const handler: Handlers = {
  async GET(req) {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    if (!code) {
      return new Response("Missing ?code", { status: 400 });
    }

    const issuer = Deno.env.get("KEYCLOAK_ISSUER")!;
    const clientId = Deno.env.get("KEYCLOAK_CLIENT_ID")!;
    const clientSecret = Deno.env.get("KEYCLOAK_CLIENT_SECRET")!;
    const redirectUri = Deno.env.get("REDIRECT_URI")!;
    const baseUrl = Deno.env.get("BASE_URL")!;

    // Exchange the code for tokens
    const tokenUrl = `${issuer}/protocol/openid-connect/token`;
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    });

    const tokenResp = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!tokenResp.ok) {
      console.error("Keycloak token exchange failed:", await tokenResp.text());
      return new Response("Token exchange failed", { status: 401 });
    }

    const data = (await tokenResp.json()) as TokenResponse;
    const { access_token } = data;
    if (!access_token) {
      return new Response("No access token returned", { status: 401 });
    }

    // Store the access token as a secure, httpOnly cookie
    const headers = new Headers();
    setCookie(headers, {
      name: "kc_access_token",
      value: access_token,
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      maxAge: data.expires_in,
      domain: new URL(baseUrl).hostname,
    });

    // Redirect to the home page
    headers.set("Location", "/");
    return new Response(null, { status: 302, headers });
  },
}; 