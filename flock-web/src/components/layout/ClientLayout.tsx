"use client"
import { SessionProvider } from "next-auth/react"
import { MainNav } from "./MainNav"
import { Sidebar } from "./Sidebar"
import { RightSidebar } from "./RightSidebar"
import { usePathname } from "next/navigation"

/**
 * Layout that matches Deno Fresh:
 * - A fixed top navbar
 * - A left sidebar pinned below the navbar
 * - A right sidebar pinned as well
 * - Main feed area in the middle
 */
export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // If we're on the login page, render children without the layout
  if (pathname === "/login") {
    return <SessionProvider>{children}</SessionProvider>
  }

  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Top Nav (fixed) */}
        <MainNav />

        {/* Use padding-top to offset main content below the 64px navbar */}
        <div className="pt-16 flex">
          {/* Left Sidebar pinned to left */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          {/* Main content area. 
              We'll push it away from the left & right by the width of sidebars. */}
          <main className="flex-1 ml-64 mr-64 p-4 animate-fade-in">
            {children}
          </main>

          {/* Right Sidebar pinned to right */}
          <div className="hidden lg:block">
            <RightSidebar />
          </div>
        </div>
      </div>
    </SessionProvider>
  )
}
