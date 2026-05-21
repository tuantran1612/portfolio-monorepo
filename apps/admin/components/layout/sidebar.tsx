'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, FolderKanban, Mail,
  LogOut, Moon, Sun, Tag, Users,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { useLogout } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/projects', label: 'Projects', icon: FolderKanban },
  { href: '/dashboard/categories', label: 'Categories', icon: Tag },
  { href: '/dashboard/contacts', label: 'Contacts', icon: Mail },
  { href: '/dashboard/users', label: 'Users', icon: Users },
]

export function Sidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const logout = useLogout()

  return (
    <aside className="w-60 border-r border-border/40 flex flex-col min-h-screen bg-background shrink-0">

      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border/40">
        <span className="font-bold text-lg tracking-tight">
          tuan<span className="text-primary">.</span>admin
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1 p-4">
        {navLinks.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              <link.icon className="h-4 w-4 shrink-0" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-4 border-t border-border/40 flex flex-col gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-3 text-muted-foreground"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          Toggle theme
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

    </aside>
  )
}