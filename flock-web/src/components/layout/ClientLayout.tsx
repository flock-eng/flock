"use client"
import { SessionProvider } from "next-auth/react"
import { MainNav } from "./MainNav"
import { Sidebar } from "./Sidebar"
import { RightSidebar } from "./RightSidebar"
import { usePathname } from "next/navigation"
export function ClientLayout({ children }: { children: React.ReactNode }) {
  
  const pathname = usePathname()
  
  // If we're on the login page, render children without the layout
  if (pathname === "/login") {
    return <SessionProvider>{children}</SessionProvider>
  }

  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-50">
        <MainNav />

        <div className="pt-16 flex">
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          <main className="flex-1 ml-64 mr-64 p-4 animate-fade-in">
            {children}
          </main>

          <div className="hidden lg:block">
            <RightSidebar />
          </div>
        </div>
      </div>
    </SessionProvider>
  )
}
