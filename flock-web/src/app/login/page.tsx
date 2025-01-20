'use client'

import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <h1 className="text-2xl font-bold">Welcome to Flock</h1>
          <p className="text-sm text-muted-foreground">Connect with friends and share your moments</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            className="w-full"
            onClick={() => signIn('keycloak', { callbackUrl: '/' })}
          >
            Sign in with Keycloak
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}