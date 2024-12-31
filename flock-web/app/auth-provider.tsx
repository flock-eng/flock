"use client"

import { SessionProvider, useSession } from "next-auth/react"
import { Session } from "next-auth"
import { ReactNode } from "react"

export function AuthProvider({ 
  children,
  session 
}: { 
  children: ReactNode
  session: Session | null
}) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export function useAuthSession() {
  const { data: session, status } = useSession()
  return { session, status }
}
