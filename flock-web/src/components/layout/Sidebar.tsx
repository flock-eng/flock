import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {Home, Bell, MessageSquare, User, Bookmark} from "lucide-react"

function ProfileCard() {
  return (
    <Card>
      <CardHeader className="flex items-center space-x-4">
        {/* Profile avatar */}
        <div className="h-12 w-12 rounded-full bg-gray-300" />
        <div>
          <CardTitle className="text-base">John Doe</CardTitle>
          <p className="text-xs text-muted-foreground">Software Engineer</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {/* Example stats */}
        <div className="flex justify-between">
          <span>Connections</span>
          <span className="font-medium">1.2k</span>
        </div>
        <div className="flex justify-between">
          <span>Posts</span>
          <span className="font-medium">123</span>
        </div>
        <div className="flex justify-between">
          <span>Groups</span>
          <span className="font-medium">4</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function Sidebar() {
  return (
    <div className="space-y-4 py-4">
      {/* Profile Dashboard Card */}
      <ProfileCard />

      {/* Quick Links (similar to your existing navigation) */}
      <nav className="space-y-1 pt-2 text-sm">
        <Link
          href="/"
          className="flex items-center px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
        >
          <Home className="mr-2 h-4 w-4" />
          Home
        </Link>
        <Link
          href="/notifications"
          className="flex items-center px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
        >
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </Link>
        <Link
          href="/messages"
          className="flex items-center px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Messages
        </Link>
        <Link
          href="/profile"
          className="flex items-center px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </Link>
        <Link
          href="/bookmarks"
          className="flex items-center px-4 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
        >
          <Bookmark className="mr-2 h-4 w-4" />
          Bookmarks
        </Link>
      </nav>
    </div>
  )
}
