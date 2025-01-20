import { JSX } from "preact";

export default function Header(): JSX.Element {
  return (
    <header class="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm flex items-center px-4 z-50">
      <div class="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div class="flex items-center">
          <a href="/" class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent hover:from-blue-500 hover:to-blue-300 transition-all">
            Flock
          </a>
        </div>

        <div class="flex-1 max-w-xl px-6">
          <div class="relative group">
            <input
              type="text"
              placeholder="Search..."
              class="w-full px-4 py-2.5 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
            <button class="absolute right-3 top-2.5 text-gray-400 group-hover:text-blue-400 transition-colors p-1 rounded-full hover:bg-blue-50">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>
          </div>
        </div>

        <nav class="flex items-center">
          <div class="relative group">
            <button class="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center space-x-2">
              <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
                JD
              </div>
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div class="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block z-50">
              <a href="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
              <a href="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
              <a href="/help" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Help Center</a>
              <div class="border-t border-gray-100 my-2"></div>
              <a href="/logout" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign out</a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
} 
