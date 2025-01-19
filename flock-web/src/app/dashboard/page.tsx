import { auth, signOut } from "@/lib/auth"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const session = await auth()
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome {session?.user?.name}</h1>
        <p className="text-xl mb-8">You are now signed in!</p>
        <form action={async () => {
          "use server"
          await signOut()
        }}>
          <Button type="submit" variant="outline" size="lg">
            Sign out
          </Button>
        </form>
      </div>
    </main>
  )
} 