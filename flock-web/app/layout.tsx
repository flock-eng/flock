import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { AuthProvider } from "./auth-provider"
import { ToastProvider } from "@/components/ui/toaster"
import {getCustomServerSession} from "@/app/api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Flock",
  description: "A social platform for real-time interaction and engagement",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCustomServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider session={session}>
          <div className="flex min-h-screen">
            <Sidebar />
            {children}
          </div>
          <ToastProvider />
        </AuthProvider>
      </body>
    </html>
  )
}

