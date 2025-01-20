import '@/app/globals.css'
import { ClientLayout } from "@/components/layout/ClientLayout"
import { Providers } from "@/components/Providers"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  )
}