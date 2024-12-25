import Link from "next/link"
import { Home, Bell, MessageSquare, User, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Sidebar() {
  return (
    <div className="w-[250px] border-r h-screen sticky top-0 shrink-0">
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2 px-2 py-4">
          <div className="h-6 w-6 rounded-full bg-emerald-500" />
          <span className="font-semibold text-xl">Flock</span>
        </div>

        <nav className="space-y-2">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Home className="h-5 w-5" />
              Home
            </Button>
          </Link>
          <Link href="/notifications">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </Button>
          </Link>
          <Link href="/messages">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <MessageSquare className="h-5 w-5" />
              Messages
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <User className="h-5 w-5" />
              Profile
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="h-5 w-5" />
              Settings
            </Button>
          </Link>
        </nav>

        <Button className="w-full">New Post</Button>
      </div>
    </div>
  )
}

