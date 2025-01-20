"use client"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

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
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right: Session controls */}
        <nav className="flex items-center space-x-3">
          <Button variant="ghost" onClick={() => signOut()} className="text-gray-700 hover:text-gray-900">
            Sign out
          </Button>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {session?.user?.name?.[0] || 'U'}
          </div>
        </nav>
      </div>
    </header>
  )
}
