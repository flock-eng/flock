import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"

interface SidebarNavButtonProps {
  href: string
  icon: LucideIcon
  children: React.ReactNode
}

export function SidebarNavButton({ href, icon: Icon, children }: SidebarNavButtonProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href}>
      <Button 
        variant="ghost" 
        className={`w-full justify-start gap-2 ${isActive ? 'bg-accent/70 hover:bg-accent/70' : ''}`}
      >
        <Icon className="h-5 w-5" />
        {children}
      </Button>
    </Link>
  )
}
