'use client'

import { AlertTriangle, CheckCircle, Info } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useTransactionStore } from '@/store/useTransactionStore'
import { getMonthOverMonthChange, getTotalExpenses, formatINR } from '@/lib/financeHelpers'
import { cn } from '@/lib/utils'

export function InsightsBanner() {
  const transactions = useTransactionStore((s) => s.transactions)
  const change = getMonthOverMonthChange(transactions)

  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear

  const currentExpenses = getTotalExpenses(
    transactions.filter((t) => {
      const d = new Date(t.date)
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear
    })
  )
  const lastExpenses = getTotalExpenses(
    transactions.filter((t) => {
      const d = new Date(t.date)
      return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear
    })
  )

  let icon = <Info className="size-5" />
  let bg = 'bg-blue-500/10 border-blue-500/20'
  let textColor = 'text-blue-700 dark:text-blue-400'
  let message = 'Your spending is consistent with last month'

  if (change > 0) {
    icon = <AlertTriangle className="size-5" />
    bg = 'bg-orange-500/10 border-orange-500/20'
    textColor = 'text-orange-700 dark:text-orange-400'
    message = `You spent ${change}% more this month than last month`
  } else if (change < 0) {
    icon = <CheckCircle className="size-5" />
    bg = 'bg-green-500/10 border-green-500/20'
    textColor = 'text-green-700 dark:text-green-400'
    message = `Great job! You spent ${Math.abs(change)}% less this month`
  }

  return (
    <Card className={cn('border', bg)}>
      <CardContent className="flex items-center gap-4 py-4">
        <div className={textColor}>{icon}</div>
        <div>
          <p className={cn('font-semibold', textColor)}>{message}</p>
          <p className="text-sm text-muted-foreground">
            This month: {formatINR(currentExpenses)} &middot; Last month: {formatINR(lastExpenses)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
