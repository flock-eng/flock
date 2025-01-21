<div class="min-h-screen bg-gray-50 flex flex-col">
  <main class="container mx-auto px-4 py-8 flex-1">
    <div class="max-w-2xl mx-auto text-center mb-16">
      <h1 class="text-4xl font-bold text-gray-900 mb-6">Welcome to Flock</h1>
      <p class="text-lg text-gray-600">
        Connect with your community and share your thoughts.
      </p>
    </div>

    <div class="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
      
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign In
        </button>
      </form>
    </div>
  </main>

  <footer class="text-center py-4 text-sm text-gray-600">
    <p>Don't have an account? <a href="/home" class="text-blue-600 hover:underline">Explore demo</a></p>
  </footer>
</div>
