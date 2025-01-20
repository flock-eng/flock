import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { MainNav } from "@/components/layout/MainNav"
import { Sidebar } from "@/components/layout/Sidebar"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flock",
  description: "Connect with friends and share your moments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
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
      </body>
    </html>
  );
}