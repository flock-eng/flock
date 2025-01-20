'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Bell, Mail, Settings, User } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-white w-64 p-4 flex flex-col h-screen border-r">
      <h1 className="text-2xl font-bold mb-6">Flock</h1>

      <div className="space-y-2">
        <Link
          href="/"
          className={`flex items-center gap-3 px-4 py-2 rounded-full transition-colors ${
            isActive('/') ? 'bg-gray-100' : 'hover:bg-gray-50'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        <Link
          href="/discover"
          className={`flex items-center gap-3 px-4 py-2 rounded-full transition-colors ${
            isActive('/discover') ? 'bg-gray-100' : 'hover:bg-gray-50'
          }`}
        >
          <Search className="w-5 h-5" />
          <span>Discover</span>
        </Link>

        <Link
          href="/notifications"
          className={`flex items-center gap-3 px-4 py-2 rounded-full transition-colors ${
            isActive('/notifications') ? 'bg-gray-100' : 'hover:bg-gray-50'
          }`}
        >
          <Bell className="w-5 h-5" />
          <span>Notifications</span>
        </Link>

        <Link
          href="/messages"
          className={`flex items-center gap-3 px-4 py-2 rounded-full transition-colors ${
            isActive('/messages') ? 'bg-gray-100' : 'hover:bg-gray-50'
          }`}
        >
          <Mail className="w-5 h-5" />
          <span>Messages</span>
        </Link>

        <Link
          href="/profile/me"
          className={`flex items-center gap-3 px-4 py-2 rounded-full transition-colors ${
            isActive('/profile') ? 'bg-gray-100' : 'hover:bg-gray-50'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>

        <Link
          href="/settings"
          className={`flex items-center gap-3 px-4 py-2 rounded-full transition-colors ${
            isActive('/settings') ? 'bg-gray-100' : 'hover:bg-gray-50'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </div>

      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
      >
        New Post
      </button>
    </nav>
  );
} 