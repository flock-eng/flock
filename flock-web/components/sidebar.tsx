"use client"

import { Home, Bell, MessageSquare, User, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"
import { SidebarNavButton } from "@/components/ui/sidebar-nav-button"
import { Session } from "next-auth"
import { LogoutButton } from "./logout-button"
import { Spinner } from "@/components/ui/spinner"
import {useSession} from "next-auth/react";
import { CreatePostButton } from "@/components/ui/create-post-button";

export function Sidebar() {
  const { data, status } = useSession()
  const session = data as Session | null

  // Show the spinner only if the session is still loading
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center px-2 py-2 text-sm text-muted-foreground bg-muted/50 rounded-lg">
        <Spinner className="mr-2" /> Loading...
      </div>
    );
  }
  return (
    <div className="w-[250px] border-r h-screen sticky top-0 shrink-0">
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2 px-2 py-4">
          <div className="h-6 w-6 rounded-full bg-emerald-500" />
          <span className="font-semibold text-xl">Flock</span>
        </div>


        {session?.user?.name ? (
          <div className="px-2 py-2 text-sm text-muted-foreground bg-muted/50 rounded-lg">
            Hello, <span className="font-medium text-primary">{session.user.name}</span>
          </div>
        ) : null}

        <nav className="space-y-2">
          <SidebarNavButton href="/" icon={Home}>Home</SidebarNavButton>
          <SidebarNavButton href={`/profile/${session?.user?.user_id}`} icon={User}>Profile</SidebarNavButton>
          <SidebarNavButton href="/notifications" icon={Bell}>Notifications</SidebarNavButton>
          <SidebarNavButton href="/messages" icon={MessageSquare}>Messages</SidebarNavButton>
          <SidebarNavButton href="/settings" icon={Settings}>Settings</SidebarNavButton>
        </nav>

        <CreatePostButton authorId={session?.user?.id || ""} />

        <LogoutButton />
      </div>
    </div>
  )
}

