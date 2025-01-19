import { Button } from "@/components/ui/button"
import { signIn } from "@/lib/auth"

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Flock</h1>
        <p className="text-xl mb-8">Sign in to get started</p>
        <form action={async () => {
          "use server"
          await signIn("keycloak")
        }}>
          <Button type="submit" size="lg">
            Sign in
          </Button>
        </form>
      </div>
    </main>
  )
}
