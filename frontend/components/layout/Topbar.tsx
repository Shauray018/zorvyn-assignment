'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Sun, Moon, Shield, Lock, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRoleStore } from '@/store/useRoleStore'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/transactions': 'Transactions',
  '/insights': 'Insights',
}

export function Topbar() {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const { role, setRole } = useRoleStore()
  const [mounted, setMounted] = useState(false)
  const title = pageTitles[pathname] ?? 'FinTrack'
  const isAdmin = role === 'admin'

  useEffect(() => setMounted(true), [])

  return (
    <header className="sticky top-0 z-20 flex py-3 items-center gap-2 border-b bg-background/20 backdrop-blur-md px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <h1 className="text-lg font-semibold">{title}</h1>

      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5">
              {isAdmin ? <Shield className="size-4" /> : <Lock className="size-4" />}
              <span className="text-xs">{isAdmin ? 'Admin' : 'Viewer'}</span>
              <ChevronsUpDown className="size-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setRole('admin')}>
              <Shield className="mr-2 size-4" />
              Admin
              <span className="ml-auto text-xs text-muted-foreground">Full access</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRole('viewer')}>
              <Lock className="mr-2 size-4" />
              Viewer
              <span className="ml-auto text-xs text-muted-foreground">Read-only</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        >
          {mounted ? (
            resolvedTheme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />
          ) : (
            <span className="size-4" />
          )}
        </Button>
      </div>
    </header>
  )
}
