import { signIn } from "@/lib/auth"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Sign in to Flock</h1>
        <form action={async () => {
          "use server"
          await signIn("keycloak")
        }}>
          <Button type="submit" size="lg">
            Sign in with Keycloak
          </Button>
        </form>
      </div>
    </main>
  )
} 