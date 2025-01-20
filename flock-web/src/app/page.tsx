import { auth } from "@/lib/auth"

export default async function HomePage() {
  const session = await auth()

  return (
    <div className="py-10">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Welcome, {session?.user.name || 'Guest'}!</h1>
        {/* Add your feed components here */}
      </div>
    </div>
  )
}