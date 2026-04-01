'use client'

import * as React from 'react'
import { Label, Pie, PieChart } from 'recharts'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useTransactionStore } from '@/store/useTransactionStore'
import { getSpendingByCategory, getTotalExpenses, formatINR } from '@/lib/financeHelpers'
import { getCategoryConfig } from '@/data/categories'

export function SpendingBreakdownChart() {
  const { transactions, loading } = useTransactionStore()

  const { chartData, chartConfig, totalExpenses, spendingList } = React.useMemo(() => {
    const spending = getSpendingByCategory(transactions).slice(0, 6)
    const total = getTotalExpenses(transactions)

    const config: ChartConfig = {
      total: { label: 'Amount' },
    }
    const data = spending.map((item) => {
      const key = item.category.toLowerCase().replace(/\s+/g, '-')
      config[key] = {
        label: item.category,
        color: item.color,
      }
      return {
        category: key,
        total: item.total,
        fill: `var(--color-${key})`,
      }
    })

    return { chartData: data, chartConfig: config, totalExpenses: total, spendingList: spending }
  }, [transactions])

  if (loading) {
    return (
      <Card>
        <CardHeader className="items-center pb-0">
          <CardTitle>Spending Breakdown</CardTitle>
          <CardDescription>Expenses by category</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="mx-auto aspect-square max-h-[250px] w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle>Spending Breakdown</CardTitle>
        <CardDescription>Expenses by category</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto h-[280px] w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="category"
              innerRadius={70}
              outerRadius={120}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {formatINR(totalExpenses)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 22}
                          className="fill-muted-foreground text-xs"
                        >
                          Total Spent
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="space-y-2">
          {spendingList.map((item) => {
            const config = getCategoryConfig(item.category)
            const Icon = config.icon
            const pct = totalExpenses > 0 ? ((item.total / totalExpenses) * 100).toFixed(1) : '0'

            return (
              <div key={item.category} className="flex items-center gap-3 text-sm">
                <div
                  className="flex size-8 shrink-0 items-center justify-center"
                  style={{ color: item.color }}
                >
                  <Icon className="size-4" />
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-2.5 shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="font-medium">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{pct}%</span>
                    <span className="font-medium tabular-nums">{formatINR(item.total)}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
