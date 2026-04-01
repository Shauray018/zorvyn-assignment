'use client'

import { TrendingUp, ArrowDownLeft, ArrowUpRight, PiggyBank } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useTransactionStore } from '@/store/useTransactionStore'
import {
  getBalance,
  getTotalIncome,
  getTotalExpenses,
  getSavingsRate,
  formatINR,
} from '@/lib/financeHelpers'
import { cn } from '@/lib/utils'
import { BentoCard } from './DashboardBento'

export function SummaryCards() {
  const transactions = useTransactionStore((s) => s.transactions)

  const balance = getBalance(transactions)
  const income = getTotalIncome(transactions)
  const expenses = getTotalExpenses(transactions)
  const savingsRate = getSavingsRate(transactions)
  const cards = [
    {
      label: 'Total Balance',
      value: formatINR(balance),
      icon: TrendingUp,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Total Income',
      value: formatINR(income),
      icon: ArrowDownLeft,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Total Expenses',
      value: formatINR(expenses),
      icon: ArrowUpRight,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
    {
      label: 'Savings Rate',
      value: `${savingsRate}%`,
      icon: PiggyBank,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {cards.map((card) => (
        <BentoCard key={card.label}>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium text-muted-foreground">{card.label}</span>
              <div className={cn('rounded-md p-1.5', card.bgColor)}>
                <card.icon className={cn('size-4', card.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        </BentoCard>
      ))}
    </div>
  )
}
