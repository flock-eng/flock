import { default as Link } from "next/link"

export function Sidebar() {
  return (
    <aside className="w-64 fixed left-0 top-16 bottom-0 bg-white shadow-sm p-4 overflow-y-auto">
      {/* Profile Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-gray-100 p-6 mb-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full mb-4 shadow-lg flex items-center justify-center text-white text-2xl font-semibold">
              JD
            </div>
            <div className="absolute bottom-0 right-0 bg-green-400 w-4 h-4 rounded-full border-2 border-white" />
          </div>
          <h2 className="font-semibold text-gray-800">John Doe</h2>
          <p className="text-sm text-gray-500 mt-1">Software Engineer</p>

          <div className="w-full mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm mb-4">
              <div className="text-center">
                <div className="font-semibold text-gray-800">1.2k</div>
                <div className="text-gray-500 text-xs">Connections</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-800">123</div>
                <div className="text-gray-500 text-xs">Posts</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-800">4</div>
                <div className="text-gray-500 text-xs">Groups</div>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-white text-blue-600 rounded-lg border border-blue-100 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center space-x-2 group">
              <span>View Profile</span>
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Card */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Your Dashboard</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <svg
                  className="w-5 h-5 text-blue-500"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7
                          -1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">Post views</div>
                <div className="text-xs text-gray-500">+48% this week</div>
              </div>
            </div>
            <span className="text-sm font-semibold text-gray-800">1,024</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0
                          002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">Engagement</div>
                <div className="text-xs text-gray-500">+12% this month</div>
              </div>
            </div>
            <span className="text-sm font-semibold text-gray-800">82%</span>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="space-y-1">
        <Link
          href="/profile"
          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all group"
        >
          <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
            <svg
              className="w-5 h-5 text-gray-500 group-hover:text-blue-500"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12
                      14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <span className="group-hover:text-blue-600">Profile</span>
        </Link>
      </nav>

      {/* Premium Promotion */}
      <div className="mt-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
        <h3 className="font-semibold mb-2">Upgrade to Premium</h3>
        <p className="text-sm text-blue-100 mb-4">
          Get exclusive features and insights
        </p>
        <button className="w-full px-4 py-2 bg-white text-blue-600 rounded-lg
                           hover:bg-blue-50 transition-colors duration-200 font-medium text-sm">
          Try Free for 1 Month
        </button>
      </div>
    </aside>
  )
}
