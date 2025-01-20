"use client"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function MainNav() {
  const { data: session } = useSession()

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm flex items-center px-4 z-50 animate-fade-in">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Left: Logo */}
        <Link href="/">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent hover:from-blue-500 hover:to-blue-300 transition-colors">
            Flock
          </div>
        </Link>

        {/* Center: Search */}
        <div className="hidden md:flex flex-1 px-6 max-w-xl">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Search..."
              className="w-full px-4 py-2.5 rounded-full bg-gray-50 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
            <button className="absolute right-3 top-2.5 text-gray-400 hover:text-blue-400 transition-colors p-1">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right: Session or Login */}
        <nav className="flex items-center space-x-2">
          {session?.user ? (
            <Button variant="ghost" onClick={() => signOut()}>
              Sign out
            </Button>
          ) : (
            <Link href="/login">
              <Button>Sign in</Button>
            </Link>
          )}
          {/* Example avatar */}
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
        </nav>
      </div>
    </header>
  )
}
