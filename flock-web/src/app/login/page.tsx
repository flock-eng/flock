'use client'

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    try {
      setIsLoading(true)
      await signIn('keycloak', { callbackUrl: '/' })
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Flock</h1>
        <p className="text-xl mb-8">Sign in to get started</p>
        <Button 
          onClick={handleSignIn}
          size="lg"
          disabled={isLoading}
        >
          Sign in with Keycloak
          {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </Button>
      </div>
    </main>
  )
} 