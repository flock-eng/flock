import { default as Link } from "next/link"

export function Sidebar() {
  return (
    <aside className="w-64 fixed left-0 top-16 bottom-0 bg-white shadow-sm p-4 overflow-y-auto">
      {/* Left navigation links (like Twitter) */}
      <nav className="space-y-1">
        <Link
          href="/profile"
          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all group"
        >
          <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
            <svg className="w-5 h-5 text-gray-500 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0z M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <span className="group-hover:text-blue-600">Profile</span>
        </Link>

        <Link
          href="/messages"
          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all group"
        >
          <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
            <svg className="w-5 h-5 text-gray-500 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 1.1-.9 2-2 2H7l-4 4V6c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v6z"/>
            </svg>
          </div>
          <span className="group-hover:text-blue-600">Messages</span>
        </Link>

        <Link
          href="/notifications"
          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all group"
        >
          <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
            <svg className="w-5 h-5 text-gray-500 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118
                14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4
                17h5m2 2a2 2 0 104 0"/>
            </svg>
          </div>
          <span className="group-hover:text-blue-600">Notifications</span>
        </Link>

        <Link
          href="/settings"
          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all group"
        >
          <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
            <svg className="w-5 h-5 text-gray-500 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" d="M9.743 3.97l.04-.124a2 2 0
                013.435 0l.04.124c.07.213.228.39.435.507l.107.057
                c.98.518 1.7 1.42 1.9 2.5l.02.12c.03.208.125.39.262.54l.083.078
                a2 2 0 010 2.826l-.083.078c-.137.15-.232.332-.262.54l-.02.12
                c-.2 1.08-.92 1.982-1.9 2.5l-.108.057a1 1 0 00-.434.507l-.04.124
                a2 2 0 01-3.435 0l-.04-.124a1 1 0 00-.435-.507l-.107-.057
                c-.98-.518-1.7-1.42-1.9-2.5l-.02-.12a1 1 0 00-.262-.54l-.083-.078
                a2 2 0 010-2.826l.083-.078c.137-.15.232-.332.262-.54l.02-.12
                c.2-1.08.92-1.982 1.9-2.5l.108-.057c.206-.117.364-.294.434-.507zM12
                9v3m0 3h.01"/>
            </svg>
          </div>
          <span className="group-hover:text-blue-600">Settings</span>
        </Link>
      </nav>
    </aside>
  )
}
