import NextAuth from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak"

const handler = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
    }),
  ],
  debug: false,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  events: {
    async signOut({ token }) {
      // Perform KeyCloak-specific logout actions
      if (token.idToken) {
        try {
          const issuerUrl = process.env.KEYCLOAK_ISSUER!;
          const endSessionUrl = `${issuerUrl}/protocol/openid-connect/logout`;

          // Ensure `token.idToken` is a string
          if (typeof token.idToken === 'string') {
            const params = new URLSearchParams({
              id_token_hint: token.idToken,
              post_logout_redirect_uri: process.env.NEXTAUTH_URL!,
            });

            // Make a GET request to the end-session endpoint
            await fetch(`${endSessionUrl}?${params.toString()}`);
          } else {
            console.error('idToken is not a string:', token.idToken);
          }
        } catch (error) {
          console.error('Error during Keycloak logout:', error);
        }
      }
    },
  },
});

export { handler as GET, handler as POST };