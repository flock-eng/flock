"use client"
import { SessionProvider } from "next-auth/react"
import { MainNav } from "./MainNav"
import { Sidebar } from "./Sidebar"
import { RightSidebar } from "./RightSidebar"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="relative min-h-screen flex flex-col bg-page">
        {/* Top navbar: includes search and post-type menu */}
        <MainNav />

        {/* Main content area */}
        <div className="container mx-auto flex-1 px-4 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)_300px] gap-6">
            {/* Left sidebar (Profile + Nav) */}
            <aside className="hidden lg:block">
              <Sidebar />
            </aside>

            {/* Middle feed */}
            <main>{children}</main>

            {/* Right sidebar (Trending + Suggestions) */}
            <aside className="hidden lg:block">
              <RightSidebar />
            </aside>
          </div>
        </div>
      </div>
    </SessionProvider>
  )
}
