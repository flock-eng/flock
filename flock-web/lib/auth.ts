import {AuthOptions, getServerSession} from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID ?? "",
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET ?? "",
      issuer: process.env.KEYCLOAK_ISSUER ?? "",
      profile: profile => {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          username: profile.preferred_username,
        }
      }
    }),
  ],
  debug: false,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // @ts-expect-error: Property 'username' does not exist on type 'Token'
        token.username = profile.preferred_username
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.refreshToken = account.refresh_token;
        token.id = profile.sub
        token.sub = profile.sub
      }
      return token;
    },
    async session({ session, token }) {
        // @ts-expect-error: Property 'accessToken' does not exist on type 'Session'
      session.accessToken = token.accessToken
      // @ts-expect-error: Property 'user' does not exist on type 'Session'
      session.user.user_id = token.sub
      // @ts-expect-error: Property 'user' does not exist on type 'Session'
      session.user.username = token.username
      return session;
    },
  },
  events: {
    async signOut({ token }) {
      if (token.idToken) {
        try {
          const issuerUrl = process.env.KEYCLOAK_ISSUER!;
          const endSessionUrl = `${issuerUrl}/protocol/openid-connect/logout`;

          if (typeof token.idToken === 'string') {
            const params = new URLSearchParams({
              id_token_hint: token.idToken,
              post_logout_redirect_uri: process.env.NEXTAUTH_URL!,
            });

            await fetch(`${endSessionUrl}?${params.toString()}`);
          }
        } catch (error) {
          console.error('Error during Keycloak logout:', error);
        }
      }
    },
  },
};

// Function to get the server session using the provided authentication options
// This is necessary to ensure that the data within the session callback (from authOptions) is available
// like the `accessToken`, `username`, and `user_id` for the user
export const getCustomServerSession = () => getServerSession(authOptions)