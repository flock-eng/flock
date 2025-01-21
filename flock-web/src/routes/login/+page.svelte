<div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
  <div class="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
    <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Sign In</h2>
    
    <form class="space-y-6">
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

    <p class="mt-6 text-center text-sm text-gray-600">
      Don't have an account?{' '}
      <a href="/" class="text-blue-600 hover:underline">Return home</a>
    </p>
  </div>
</div>
