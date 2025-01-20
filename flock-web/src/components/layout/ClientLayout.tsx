'use client'
import '@/app/globals.css'
import { SessionProvider } from "next-auth/react"
import { MainNav } from "./MainNav"
import { Sidebar } from "./Sidebar"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="relative flex min-h-screen flex-col">
        <MainNav />
        <div className="flex-1">
          <div className="flex">
            <Sidebar />
            <main className="flex-1 lg:pl-72">
              <div className="px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </SessionProvider>
  )
} 