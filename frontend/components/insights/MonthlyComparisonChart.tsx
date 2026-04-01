'use client'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import { useTransactionStore } from '@/store/useTransactionStore'
import { getMonthlyData, getMonthOverMonthChange } from '@/lib/financeHelpers'
import { TrendingUp, TrendingDown } from 'lucide-react'

const chartConfig = {
  income: {
    label: 'Income',
    color: 'var(--chart-1)',
  },
  expenses: {
    label: 'Expenses',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

export function MonthlyComparisonChart() {
  const { transactions, loading } = useTransactionStore()

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Monthly Comparison</CardTitle>
          <CardDescription>Income vs expenses per month</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-75 w-full" />
        </CardContent>
      </Card>
    )
  }

  const data = getMonthlyData(transactions)
  const momChange = getMonthOverMonthChange(transactions)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Comparison</CardTitle>
        <CardDescription>Income vs expenses per month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              {momChange <= 0 ? 'Spending down' : 'Spending up'} by {Math.abs(momChange)}% this
              month
              {momChange <= 0 ? (
                <TrendingDown className="size-4 text-green-500" />
              ) : (
                <TrendingUp className="size-4 text-red-500" />
              )}
            </div>
            <div className="leading-none text-muted-foreground">
              Showing income and expenses for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
