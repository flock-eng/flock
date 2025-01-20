import { signOut } from "@/lib/auth"

// Add proper return type and handle the response
export async function POST(request: Request) {
  try {
    return await signOut({ redirectTo: "/login" })
  } catch (error) {
    console.error("Sign out error:", error)
    return new Response(JSON.stringify({ error: "Failed to sign out" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}