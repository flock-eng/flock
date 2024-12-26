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
  debug: true,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token
      return session
    },
  },
  events: {
    async signOut({ token }) {
      // Perform KeyCloak-specific logout actions
      if (token.accessToken) {
        try {
          const logoutUrl = `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`
          await fetch(logoutUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `client_id=${process.env.KEYCLOAK_CLIENT_ID}&refresh_token=${token.refreshToken}`,
          })
        } catch (error) {
          console.error('Error during Keycloak logout:', error)
        }
      }
    },
  },
})

export { handler as GET, handler as POST }

