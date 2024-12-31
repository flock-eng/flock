import NextAuth, {AuthOptions, getServerSession} from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions: AuthOptions = {
if (!process.env.KEYCLOAK_CLIENT_ID || !process.env.KEYCLOAK_CLIENT_SECRET || !process.env.KEYCLOAK_ISSUER) {
  throw new Error("Missing Keycloak environment variables");
}

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

      // On initial sign-in
      if (account && profile) {
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
      session.accessToken = token.accessToken
      session.user.user_id = token.sub
      session.user.username = token.username
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
};

// Initialize NextAuth with the provided authentication options
const handler = NextAuth(authOptions);

// Function to get the server session using the provided authentication options
// This is necessary to ensure that the data within the session callback (from authOptions) is available
// like the `accessToken`, `username`, and `user_id` for the user
const getCustomServerSession = () => getServerSession(authOptions)

export { handler as GET, handler as POST, getCustomServerSession };
