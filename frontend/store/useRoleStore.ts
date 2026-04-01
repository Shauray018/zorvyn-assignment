'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Role } from '@/types'

type RoleState = {
  role: Role
  setRole: (role: Role) => void
}

export const useRoleStore = create<RoleState>()(
  persist(
    (set) => ({
      role: 'viewer',
      setRole: (role) => set({ role }),
    }),
    { name: 'fintrack-role' }
  )
)
