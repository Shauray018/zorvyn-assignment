'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
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
import { getMonthlyData, getMonthOverMonthChange, formatINR } from '@/lib/financeHelpers'
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

export function BalanceTrendChart() {
  const { transactions, loading } = useTransactionStore()

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Balance Trend</CardTitle>
          <CardDescription>Income vs expenses over the last 6 months</CardDescription>
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
        <CardTitle>Balance Trend</CardTitle>
        <CardDescription>Income vs expenses over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  formatter={(value, name) => (
                    <div className="flex w-full items-center gap-2 text-xs">
                      <span className="text-muted-foreground">
                        {chartConfig[name as keyof typeof chartConfig]?.label ?? name}
                      </span>
                      <span className="ml-auto font-mono font-medium tabular-nums text-foreground">
                        {formatINR(value as number)}
                      </span>
                    </div>
                  )}
                />
              }
            />
            <defs>
              <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-income)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-income)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-expenses)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-expenses)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="expenses"
              type="natural"
              fill="url(#fillExpenses)"
              stroke="var(--color-expenses)"
              strokeWidth={2}
            />
            <Area
              dataKey="income"
              type="natural"
              fill="url(#fillIncome)"
              stroke="var(--color-income)"
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
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
              Compared to last month&apos;s expenses
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
