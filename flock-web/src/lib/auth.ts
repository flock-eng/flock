import NextAuth from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak"
import { JWT } from "next-auth/jwt"

declare module 'next-auth/jwt' {
  interface JWT {
    id_token?: string;
    provider?: string;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id_token = account.id_token
        token.provider = account.provider
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
      }
      return session
    },
  },
  events: {
    async signOut(message) {
      if ('token' in message && message.token && 
          'provider' in message.token && message.token.provider === "keycloak" && 
          'id_token' in message.token && message.token.id_token) {
        const issuerUrl = process.env.KEYCLOAK_ISSUER!
        const logOutUrl = new URL(`${issuerUrl}/protocol/openid-connect/logout`)
        console.log("Signing out", message.token.id_token)
        console.log("Issuer URL", issuerUrl)
        console.log("Log out URL", logOutUrl)
        logOutUrl.searchParams.set("id_token_hint", message.token.id_token)
        await fetch(logOutUrl)
      }
    },
  },
  pages: {
    signIn: "/login",
  },
}) 