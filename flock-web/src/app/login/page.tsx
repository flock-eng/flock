'use client'

import { Button } from "@/components/ui/button"

export default function LoginPage() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Please login to continue!</h1>
        <Button onClick={() => console.log('Button clicked!')}>Click me</Button>
      </div>
    </main>
  )
}