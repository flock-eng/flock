import Link from "next/link"
import {
  HomeIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  BellIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline"

export function Sidebar() {
  return (
    <aside className="w-64 fixed left-0 top-16 bottom-0 bg-white shadow-sm p-4 overflow-y-auto">
      {/* Left navigation links (like Twitter) */}
      <nav className="space-y-1">

        <Link
          href="/"
          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all group"
        >
          <HomeIcon className="h-5 w-5 text-gray-500 group-hover:text-blue-500" />
          <span className="group-hover:text-blue-600">Home</span>
        </Link>

        <Link
          href="/profile"
          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all group"
        >
          <UserIcon className="h-5 w-5 text-gray-500 group-hover:text-blue-500" />
          <span className="group-hover:text-blue-600">Profile</span>
        </Link>

        <Link
          href="/messages"
          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all group"
        >
          <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-500 group-hover:text-blue-500" />
          <span className="group-hover:text-blue-600">Messages</span>
        </Link>

        <Link
          href="/notifications"
          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all group"
        >
          <BellIcon className="h-5 w-5 text-gray-500 group-hover:text-blue-500" />
          <span className="group-hover:text-blue-600">Notifications</span>
        </Link>

        <Link
          href="/settings"
          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all group"
        >
          <Cog6ToothIcon className="h-5 w-5 text-gray-500 group-hover:text-blue-500" />
          <span className="group-hover:text-blue-600">Settings</span>
        </Link>
      </nav>
    </aside>
  )
}
