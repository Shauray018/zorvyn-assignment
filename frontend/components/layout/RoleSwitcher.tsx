'use client'

import { Shield, Lock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRoleStore } from '@/store/useRoleStore'

export function RoleSwitcher() {
  const { role, setRole } = useRoleStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="cursor-pointer">
          <Badge variant={role === 'admin' ? 'destructive' : 'secondary'} className="gap-1 text-xs">
            {role === 'admin' ? <Shield className="size-3" /> : <Lock className="size-3" />}
            {role === 'admin' ? 'Admin' : 'Viewer'}
          </Badge>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setRole('admin')}>
          <Shield className="mr-2 size-4" />
          Admin
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setRole('viewer')}>
          <Lock className="mr-2 size-4" />
          Viewer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
