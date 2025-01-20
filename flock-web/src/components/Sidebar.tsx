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
    <nav className="bg-surface w-64 p-4 flex flex-col h-screen">
      <h1 className="text-2xl font-bold mb-8 text-text-primary">Flock</h1>

      <div className="space-y-1">
        <Link
          href="/"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover-transition ${
            isActive('/') ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">Home</span>
        </Link>

        <Link
          href="/discover"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover-transition ${
            isActive('/discover') ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="font-medium">Discover</span>
        </Link>

        <Link
          href="/notifications"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover-transition ${
            isActive('/notifications') ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
          }`}
        >
          <Bell className="w-5 h-5" />
          <span className="font-medium">Notifications</span>
        </Link>

        <Link
          href="/messages"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover-transition ${
            isActive('/messages') ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
          }`}
        >
          <Mail className="w-5 h-5" />
          <span className="font-medium">Messages</span>
        </Link>

        <Link
          href="/profile/me"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover-transition ${
            isActive('/profile') ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="font-medium">Profile</span>
        </Link>

        <Link
          href="/settings"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover-transition ${
            isActive('/settings') ? 'bg-primary text-white' : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>
      </div>

      <button className="mt-8 bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-xl font-medium hover-transition">
        New Post
      </button>
    </nav>
  );
} 