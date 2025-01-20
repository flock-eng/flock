import { JSX } from "preact";

export default function RightSidebar(): JSX.Element {
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