'use client'

import { Receipt, CalendarDays, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTransactionStore } from '@/store/useTransactionStore'
import {
  getBiggestTransaction,
  getAverageDailySpend,
  formatINR,
  formatDate,
} from '@/lib/financeHelpers'
import { InsightsBanner } from '@/components/insights/InsightsBanner'
import { TopCategoryCard } from '@/components/insights/TopCategoryCard'
import { MonthlyComparisonChart } from '@/components/insights/MonthlyComparisonChart'
import { InsightsSkeleton } from '@/components/skeletons/InsightsSkeleton'

export default function InsightsPage() {
  const { transactions, loading } = useTransactionStore()

  if (loading) return <InsightsSkeleton />

  const biggest = transactions.length > 0 ? getBiggestTransaction(transactions) : null
  const avgDaily = getAverageDailySpend(transactions)
  const uniqueMonths = new Set(
    transactions.map((t) => {
      const d = new Date(t.date)
      return `${d.getFullYear()}-${d.getMonth()}`
    })
  ).size

  return (
    <div className="space-y-6">
      <InsightsBanner />

      <div className="grid gap-6 md:grid-cols-2">
        <MonthlyComparisonChart />
        <TopCategoryCard />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Receipt className="size-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Biggest Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            {biggest ? (
              <>
                <p className="text-lg font-bold">{formatINR(biggest.amount)}</p>
                <p className="text-sm text-muted-foreground">{biggest.description}</p>
                <p className="text-xs text-muted-foreground">{formatDate(biggest.date)}</p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No transactions</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Zap className="size-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Avg. Daily Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold">{formatINR(avgDaily)}</p>
            <p className="text-sm text-muted-foreground">Based on expense transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <CalendarDays className="size-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Months Tracked</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold">{uniqueMonths}</p>
            <p className="text-sm text-muted-foreground">Unique months with data</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
