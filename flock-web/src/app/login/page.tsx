'use client'

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Sign in to Flock</h1>
        <Button 
          onClick={() => signIn('keycloak')} 
          size="lg"
        >
          Sign in with Keycloak
        </Button>
      </div>
    </main>
  )
} 