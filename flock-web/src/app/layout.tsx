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
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <div className="min-h-screen grid grid-cols-[auto_1fr]">
          <Sidebar />
          <main className="max-w-2xl w-full mx-auto border-x min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
