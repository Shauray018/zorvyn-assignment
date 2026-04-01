'use client'

import { useTransactionStore } from '@/store/useTransactionStore'
import { SummaryCards } from '@/components/dashboard/SummaryCards'
import { BalanceTrendChart } from '@/components/dashboard/BalanceTrendChart'
import { SpendingBreakdownChart } from '@/components/dashboard/SpendingBreakdownChart'
import { DashboardSkeleton } from '@/components/skeletons/DashboardSkeleton'

export default function DashboardPage() {
  const loading = useTransactionStore((s) => s.loading)

  if (loading) return <DashboardSkeleton />

  return (
    <div className="space-y-6">
      <SummaryCards />
      <div className="grid gap-6 md:grid-cols-2">
        <BalanceTrendChart />
        <SpendingBreakdownChart />
      </div>
    </div>
  )
}
