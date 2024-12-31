import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"

interface SidebarNavButtonProps {
  href: string
  icon: LucideIcon
  children: React.ReactNode
}

export function SidebarNavButton({ href, icon: Icon, children }: SidebarNavButtonProps) {
  return (
    <Link href={href}>
      <Button variant="ghost" className="w-full justify-start gap-2">
        <Icon className="h-5 w-5" />
        {children}
      </Button>
    </Link>
  )
}
