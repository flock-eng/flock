'use client'

import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

export function MainNav() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Flock</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {session?.user && (
            <Button
              variant="ghost"
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          )}
        </div>
      </div>
    </header>
  )
} 