import NextAuth from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak"
import { JWT } from "next-auth/jwt"

// Extend the JWT type to include additional fields
declare module 'next-auth/jwt' {
  interface JWT {
    id_token?: string
    provider?: string
  }
}

// Extend the Session type to include additional fields
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

// Type for Keycloak configuration
interface KeycloakConfig {
  clientId: string
  clientSecret: string
  issuer: string
}

// Get Keycloak configuration from environment variables
const getKeycloakConfig = (): KeycloakConfig => {
  const clientId = process.env.KEYCLOAK_CLIENT_ID
  const clientSecret = process.env.KEYCLOAK_CLIENT_SECRET
  const issuer = process.env.KEYCLOAK_ISSUER

  if (!clientId) {
    throw new Error("Missing required KEYCLOAK_CLIENT_ID environment variable")
  }
  if (!clientSecret) {
    throw new Error("Missing required KEYCLOAK_CLIENT_SECRET environment variable") 
  }
  if (!issuer) {
    throw new Error("Missing required KEYCLOAK_ISSUER environment variable")
  }

  return { clientId, clientSecret, issuer }
}

// Handle Keycloak sign out
const handleKeycloakSignOut = async (token: JWT) => {
  if (token.provider === "keycloak" && token.id_token) {
    const issuerUrl = process.env.KEYCLOAK_ISSUER!
    const logOutUrl = new URL(`${issuerUrl}/protocol/openid-connect/logout`)
    logOutUrl.searchParams.set("id_token_hint", token.id_token)
    
    try {
      await fetch(logOutUrl)
    } catch (error) {
      console.error("Failed to sign out from Keycloak:", error)
    }
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    KeycloakProvider(getKeycloakConfig()),
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
      if ('token' in message && message.token) {
        await handleKeycloakSignOut(message.token)
      }
    },
  },
  pages: {
    signIn: "/login",
  },
}) 