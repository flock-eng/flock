import { JSX } from "preact";
import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

interface Data {
  username: string;
}

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const cookies = getCookies(req.headers);
    const token = cookies.kc_access_token;
    
    if (!token) {
      return ctx.render({ username: "Unknown User" });
    }

    const [_header, payload, _signature] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    const username = decodedPayload.preferred_username || decodedPayload.sub || "Unknown User";
    
    return ctx.render({ username });
  }
};

function Header() {
  return (
    <header class="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm flex items-center px-4 z-50 animate-fade-in">
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

        <nav class="flex items-center space-x-1">
          <a href="/home" class="p-3 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all group relative">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            <span class="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform">
              3
            </span>
          </a>
          <a href="/notifications" class="p-3 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all group relative">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform">
              5
            </span>
          </a>
          <a href="/messages" class="p-3 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all group relative">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
            </svg>
            <span class="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform">
              2
            </span>
          </a>
          <div class="relative group">
            <button class="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center space-x-2">
              <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
                JD
              </div>
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block animate-fade-in">
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

function LeftSidebar() {
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
        <a href="/profile" class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200 group">
          <div class="p-2 bg-gray-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
            <svg class="w-5 h-5 text-gray-500 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <span class="group-hover:text-blue-600">Profile</span>
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

function RightSidebar() {
  return (
    <aside class="w-64 fixed right-0 top-16 bottom-0 bg-white shadow-sm p-4 overflow-y-auto">
      <div class="mb-6">
        <h3 class="font-semibold text-gray-900 mb-4">Trending Topics</h3>
        <div class="space-y-3">
          <div class="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-colors cursor-pointer">
            <div class="text-sm font-medium text-gray-800">#Technology</div>
            <div class="text-xs text-gray-500 mt-1">1.2K posts today</div>
          </div>
          <div class="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-colors cursor-pointer">
            <div class="text-sm font-medium text-gray-800">#Programming</div>
            <div class="text-xs text-gray-500 mt-1">856 posts today</div>
          </div>
          <div class="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-colors cursor-pointer">
            <div class="text-sm font-medium text-gray-800">#Innovation</div>
            <div class="text-xs text-gray-500 mt-1">642 posts today</div>
          </div>
        </div>
      </div>

      <div>
        <h3 class="font-semibold text-gray-900 mb-4">Suggested Connections</h3>
        <div class="space-y-4">
          <div class="flex items-center p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div class="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex-shrink-0"></div>
            <div class="ml-3 flex-1">
              <div class="text-sm font-medium text-gray-800">Jane Smith</div>
              <div class="text-xs text-gray-500">Product Designer</div>
            </div>
            <button class="ml-2 p-1.5 text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
            </button>
          </div>
          <div class="flex items-center p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex-shrink-0"></div>
            <div class="ml-3 flex-1">
              <div class="text-sm font-medium text-gray-800">Mike Johnson</div>
              <div class="text-xs text-gray-500">Developer</div>
            </div>
            <button class="ml-2 p-1.5 text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

function CreatePost() {
  return (
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 hover:shadow-md transition-shadow animate-slide-in">
      <div class="flex items-center space-x-4 mb-4">
        <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full shadow-md flex items-center justify-center text-white text-lg font-semibold">
          JD
        </div>
        <button class="flex-1 text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-100">
          <span class="text-sm">What's on your mind?</span>
        </button>
      </div>
      <div class="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
        <button class="flex items-center space-x-2 text-gray-600 hover:bg-blue-50 hover:text-blue-500 px-4 py-2 rounded-lg transition-colors group">
          <div class="p-1.5 bg-blue-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <span class="text-sm font-medium">Photo</span>
        </button>
        <button class="flex items-center space-x-2 text-gray-600 hover:bg-blue-50 hover:text-blue-500 px-4 py-2 rounded-lg transition-colors group">
          <div class="p-1.5 bg-blue-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
          </div>
          <span class="text-sm font-medium">Video</span>
        </button>
        <button class="flex items-center space-x-2 text-gray-600 hover:bg-blue-50 hover:text-blue-500 px-4 py-2 rounded-lg transition-colors group">
          <div class="p-1.5 bg-blue-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <span class="text-sm font-medium">Event</span>
        </button>
        <button class="flex items-center space-x-2 text-gray-600 hover:bg-blue-50 hover:text-blue-500 px-4 py-2 rounded-lg transition-colors group">
          <div class="p-1.5 bg-blue-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </div>
          <span class="text-sm font-medium">Article</span>
        </button>
        <button class="flex items-center space-x-2 text-gray-600 hover:bg-blue-50 hover:text-blue-500 px-4 py-2 rounded-lg transition-colors group ml-auto">
          <div class="p-1.5 bg-blue-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          </div>
          <span class="text-sm font-medium">More</span>
        </button>
      </div>
    </div>
  );
}

function MainFeed() {
  return (
    <div class="flex-1 max-w-2xl mx-auto pt-4">
      <CreatePost />
      
      <div class="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow animate-slide-in">
            <div class="flex items-center space-x-3 mb-4">
              <a href="/profile/user1" class="group">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full shadow-md flex items-center justify-center text-white text-lg font-semibold group-hover:shadow-lg transition-shadow">
                  JD
                </div>
              </a>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <div>
                    <a href="/profile/user1" class="font-medium text-gray-800 hover:text-blue-500 transition-colors">John Doe</a>
                    <p class="text-sm text-gray-500 flex items-center">
                      <span>Software Engineer at Tech Corp</span>
                      <span class="mx-1">·</span>
                      <span>2h ago</span>
                    </p>
                  </div>
                  <button class="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="space-y-4">
              <p class="text-gray-800 text-sm leading-relaxed">
                Just wrapped up an exciting project using the latest web technologies! 🚀 The combination of modern frameworks and best practices made it a breeze. Looking forward to sharing more insights about the development process. #WebDev #Innovation
              </p>
              <div class="rounded-xl overflow-hidden border border-gray-100">
                <img 
                  src={`https://picsum.photos/seed/${i}/800/400`}
                  alt="Post image"
                  class="w-full h-64 object-cover hover:opacity-95 transition-opacity"
                  loading="lazy"
                />
              </div>
              <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <div class="flex items-center space-x-4">
                  <button class="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors group">
                    <div class="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
                      </svg>
                    </div>
                    <span class="text-sm font-medium">123</span>
                  </button>
                  <button class="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors group">
                    <div class="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                    </div>
                    <span class="text-sm font-medium">45</span>
                  </button>
                  <button class="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors group">
                    <div class="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                      </svg>
                    </div>
                    <span class="text-sm font-medium">12</span>
                  </button>
                </div>
                <button class="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                  </svg>
                </button>
              </div>
              <div class="pt-4">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    JD
                  </div>
                  <div class="flex-1">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home({ data }: PageProps<Data>): JSX.Element {
  return (
    <>
      <Head>
        <title>Flock - Home</title>
      </Head>
      <div class="min-h-screen bg-gray-50">
        <Header />
        <div class="pt-16 flex">
          <LeftSidebar />
          <main class="flex-1 ml-64 mr-64 min-h-screen p-4 animate-fade-in">
            <MainFeed />
          </main>
          <RightSidebar />
        </div>
      </div>
    </>
  );
}
