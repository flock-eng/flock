import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flock",
  description: "A social media platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} bg-gray-50 h-full`}>
        <div className="min-h-screen grid grid-cols-[280px_1fr_350px] max-w-7xl mx-auto">
          <div className="border-r">
            <div className="fixed top-0 h-screen w-[280px] flex flex-col">
              <Sidebar />
            </div>
          </div>

          <main className="min-h-screen border-x bg-white">
            {children}
          </main>

          <aside className="border-l p-4">
            <div className="sticky top-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <h2 className="font-semibold mb-4">Who to follow</h2>
                <p className="text-gray-500 text-sm">
                  Suggestions coming soon...
                </p>
              </div>
            </div>
          </aside>
        </div>
      </body>
    </html>
  );
}
