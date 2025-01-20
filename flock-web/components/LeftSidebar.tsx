import { JSX } from "preact";

export default function LeftSidebar(): JSX.Element {
  return (
    <aside class="w-64 fixed left-0 top-16 bottom-0 bg-white shadow-sm p-4 overflow-y-auto">
      {/* Profile Card */}
      <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-gray-100 p-6 mb-6">
        <div class="flex flex-col items-center">
          <div class="relative">
            <div class="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full mb-4 shadow-lg flex items-center justify-center text-white text-2xl font-semibold">
              JD
            </div>
            <div class="absolute bottom-0 right-0 bg-green-400 w-4 h-4 rounded-full border-2 border-white"></div>
          </div>
          <h2 class="font-semibold text-gray-800">John Doe</h2>
          <p class="text-sm text-gray-500 mt-1">Software Engineer</p>
          <div class="w-full mt-4 pt-4 border-t border-gray-200">
            <div class="flex justify-between text-sm mb-4">
              <div class="text-center">
                <div class="font-semibold text-gray-800">1.2k</div>
                <div class="text-gray-500 text-xs">Connections</div>
              </div>
              <div class="text-center">
                <div class="font-semibold text-gray-800">42</div>
                <div class="text-gray-500 text-xs">Posts</div>
              </div>
              <div class="text-center">
                <div class="font-semibold text-gray-800">8</div>
                <div class="text-gray-500 text-xs">Groups</div>
              </div>
            </div>
            <button class="w-full px-4 py-2 bg-white text-blue-600 rounded-lg border border-blue-100 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center space-x-2 group">
              <span>View Profile</span>
              <svg class="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div class="bg-white rounded-xl border border-gray-100 p-4 mb-6">
        <h3 class="text-sm font-semibold text-gray-900 mb-4">Your Dashboard</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="p-2 bg-blue-50 rounded-lg">
                <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-800">Post views</div>
                <div class="text-xs text-gray-500">+48% this week</div>
              </div>
            </div>
            <span class="text-sm font-semibold text-gray-800">1,024</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="p-2 bg-green-50 rounded-lg">
                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <div class="text-sm font-medium text-gray-800">Engagement</div>
                <div class="text-xs text-gray-500">+12% this month</div>
              </div>
            </div>
            <span class="text-sm font-semibold text-gray-800">82%</span>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav class="space-y-1">
        <a href="/" class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group">
          <div class="p-2 bg-gray-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all relative">
            <svg class="w-5 h-5 text-gray-500 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            <span class="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform">
              3
            </span>
          </div>
          <span class="group-hover:text-blue-600">Home</span>
        </a>
        <a href="/profile" class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group">
          <div class="p-2 bg-gray-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
            <svg class="w-5 h-5 text-gray-500 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <span class="group-hover:text-blue-600">Profile</span>
        </a>
        <a href="/notifications" class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group">
          <div class="p-2 bg-gray-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all relative">
            <svg class="w-5 h-5 text-gray-500 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform">
              5
            </span>
          </div>
          <span class="group-hover:text-blue-600">Notifications</span>
        </a>
        <a href="/messages" class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group">
          <div class="p-2 bg-gray-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all relative">
            <svg class="w-5 h-5 text-gray-500 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
            </svg>
            <span class="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform">
              2
            </span>
          </div>
          <span class="group-hover:text-blue-600">Messages</span>
        </a>
        <a href="/connections" class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group">
          <div class="p-2 bg-gray-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
            <svg class="w-5 h-5 text-gray-500 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
          </div>
          <span class="group-hover:text-blue-600">Connections</span>
        </a>
        <a href="/groups" class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group">
          <div class="p-2 bg-gray-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
            <svg class="w-5 h-5 text-gray-500 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <span class="group-hover:text-blue-600">Groups</span>
        </a>
        <a href="/bookmarks" class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group">
          <div class="p-2 bg-gray-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
            <svg class="w-5 h-5 text-gray-500 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
            </svg>
          </div>
          <span class="group-hover:text-blue-600">Bookmarks</span>
        </a>
      </nav>

      {/* Premium Promotion */}
      <div class="mt-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
        <h3 class="font-semibold mb-2">Upgrade to Premium</h3>
        <p class="text-sm text-blue-100 mb-4">Get exclusive features and insights</p>
        <button class="w-full px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium text-sm">
          Try Free for 1 Month
        </button>
      </div>
    </aside>
  );
} 