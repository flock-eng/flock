'use client'

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Flock
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              <h1 className="text-5xl font-bold tracking-tight text-gray-900">
                Connect, Share, and Grow with{" "}
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Flock
                </span>
              </h1>
              <p className="text-xl text-gray-600">
                Join our community of professionals, share your insights, and discover new opportunities.
                Experience a new way of professional networking.
              </p>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  onClick={() => signIn("keycloak")}
                  className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white px-8"
                >
                  Sign in to get started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  Learn more
                </Button>
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-6 pt-8">
                <div className="flex gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg h-fit">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Professional Network</h3>
                    <p className="text-gray-600 text-sm">Connect with like-minded professionals</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="p-2 bg-green-50 rounded-lg h-fit">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Verified Community</h3>
                    <p className="text-gray-600 text-sm">Trusted and secure environment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div className="hidden lg:block relative h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-2xl">
                  {/* Decorative elements */}
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-2xl" />
                  <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-2xl" />
                </div>
                {/* Add illustration or screenshot here */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl shadow-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}