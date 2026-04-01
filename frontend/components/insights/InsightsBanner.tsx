'use client'

import { AlertTriangle, CheckCircle, Info } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useTransactionStore } from '@/store/useTransactionStore'
import { getMonthOverMonthChange, getTotalExpenses, formatINR } from '@/lib/financeHelpers'
import { cn } from '@/lib/utils'

export function InsightsBanner() {
  const transactions = useTransactionStore((s) => s.transactions)
  const change = getMonthOverMonthChange(transactions)

  // Compare last two COMPLETE months (same logic as getMonthOverMonthChange)
  const now = new Date()
  const cm = now.getMonth()
  const cy = now.getFullYear()
  const lm = cm === 0 ? 11 : cm - 1
  const ly = cm === 0 ? cy - 1 : cy
  const pm = lm === 0 ? 11 : lm - 1
  const py = lm === 0 ? ly - 1 : ly

  const lastMonthName = new Date(ly, lm).toLocaleDateString('en-IN', { month: 'long' })
  const prevMonthName = new Date(py, pm).toLocaleDateString('en-IN', { month: 'long' })

  const lastExpenses = getTotalExpenses(
    transactions.filter((t) => {
      const d = new Date(t.date)
      return d.getMonth() === lm && d.getFullYear() === ly
    })
  )
  const prevExpenses = getTotalExpenses(
    transactions.filter((t) => {
      const d = new Date(t.date)
      return d.getMonth() === pm && d.getFullYear() === py
    })
  )

  let icon = <Info className="size-5" />
  let bg = 'bg-blue-500/10 border-blue-500/20'
  let textColor = 'text-blue-700 dark:text-blue-400'
  let message = 'Your spending is consistent month over month'

  if (change > 0) {
    icon = <AlertTriangle className="size-5" />
    bg = 'bg-orange-500/10 border-orange-500/20'
    textColor = 'text-orange-700 dark:text-orange-400'
    message = `You spent ${change}% more in ${lastMonthName} than ${prevMonthName}`
  } else if (change < 0) {
    icon = <CheckCircle className="size-5" />
    bg = 'bg-green-500/10 border-green-500/20'
    textColor = 'text-green-700 dark:text-green-400'
    message = `Great job! You spent ${Math.abs(change)}% less in ${lastMonthName}`
  }

  return (
    <Card className={cn('border', bg)}>
      <CardContent className="flex items-center gap-4 py-4">
        <div className={textColor}>{icon}</div>
        <div>
          <p className={cn('font-semibold', textColor)}>{message}</p>
          <p className="text-sm text-muted-foreground">
            {lastMonthName}: {formatINR(lastExpenses)} &middot; {prevMonthName}: {formatINR(prevExpenses)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
