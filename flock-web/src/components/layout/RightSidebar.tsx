export function RightSidebar() {
  return (
    <aside className="w-64 fixed right-0 top-16 bottom-0 bg-white shadow-sm p-4 overflow-y-auto">
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Trending Topics</h3>
        <div className="space-y-3">
          <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50
                          rounded-lg hover:from-blue-100 hover:to-indigo-100
                          transition-colors cursor-pointer">
            <div className="text-sm font-medium text-gray-800">#Technology</div>
            <div className="text-xs text-gray-500 mt-1">1.2k posts today</div>
          </div>
          <div className="p-3 bg-gradient-to-r from-pink-50 to-rose-50
                          rounded-lg hover:from-pink-100 hover:to-rose-100
                          transition-colors cursor-pointer">
            <div className="text-sm font-medium text-gray-800">#Innovation</div>
            <div className="text-xs text-gray-500 mt-1">856 posts today</div>
          </div>
          <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50
                          rounded-lg hover:from-green-100 hover:to-emerald-100
                          transition-colors cursor-pointer">
            <div className="text-sm font-medium text-gray-800">#Sustainability</div>
            <div className="text-xs text-gray-500 mt-1">642 posts today</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Suggested Connections</h3>
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-white rounded-lg
                          hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-400
                            rounded-full flex-shrink-0" />
            <div className="ml-3 flex-1">
              <div className="text-sm font-medium text-gray-800">Jane Smith</div>
              <div className="text-xs text-gray-500">Product Designer</div>
            </div>
            <button className="ml-2 p-1.5 text-blue-500 hover:bg-blue-50
                               rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center p-3 bg-white rounded-lg
                          hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400
                            rounded-full flex-shrink-0" />
            <div className="ml-3 flex-1">
              <div className="text-sm font-medium text-gray-800">Alex Johnson</div>
              <div className="text-xs text-gray-500">Software Engineer</div>
            </div>
            <button className="ml-2 p-1.5 text-blue-500 hover:bg-blue-50
                               rounded-full transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
