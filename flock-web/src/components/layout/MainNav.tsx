"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input" // Example: if you create an Input component
import { cn } from "@/lib/utils"
import { Camera, Video, Calendar, Newspaper, MoreHorizontal } from "lucide-react"

export function MainNav() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Left side: Logo */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Flock</span>
          </Link>
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex flex-1 mx-6 max-w-md">
          <Input
            type="search"
            placeholder="Search..."
            className="border rounded-md w-full"
          />
        </div>

        {/* Right side: user session */}
        <div className="flex items-center space-x-2">
          {session?.user ? (
            <Button variant="ghost" onClick={() => signOut()}>
              Sign out
            </Button>
          ) : (
            <Link href="/login">
              <Button>Sign in</Button>
            </Link>
          )}
          {/* Placeholder for user avatar */}
          <div className="h-8 w-8 rounded-full bg-gray-300" />
        </div>
      </div>

      {/* Secondary row: “What’s on your mind?” and post-type menu */}
      <div className="border-b bg-background">
        <div className="container mx-auto flex items-center justify-between px-4 h-12">
          <div className="text-sm font-medium text-muted-foreground">What’s on your mind?</div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Camera className="mr-1 h-4 w-4" />
              Photo
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="mr-1 h-4 w-4" />
              Video
            </Button>
            <Button variant="ghost" size="sm">
              <Calendar className="mr-1 h-4 w-4" />
              Event
            </Button>
            <Button variant="ghost" size="sm">
              <Newspaper className="mr-1 h-4 w-4" />
              Article
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="mr-1 h-4 w-4" />
              More
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
