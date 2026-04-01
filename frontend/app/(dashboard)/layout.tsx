'use client'

import { useEffect } from 'react'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
import { useTransactionStore } from '@/store/useTransactionStore'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const fetchTransactions = useTransactionStore((s) => s.fetchTransactions)

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
