'use client'

import * as React from 'react'
import { Label, Pie, PieChart } from 'recharts'
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
} from '@/components/ui/chart'
import { useTransactionStore } from '@/store/useTransactionStore'
import { getSpendingByCategory, getTotalExpenses, formatINR } from '@/lib/financeHelpers'

export function SpendingBreakdownChart() {
  const { transactions, loading } = useTransactionStore()

  const { chartData, chartConfig, totalExpenses } = React.useMemo(() => {
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

    return { chartData: data, chartConfig: config, totalExpenses: total }
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
      <CardHeader className="items-center pb-0">
        <CardTitle>Spending Breakdown</CardTitle>
        <CardDescription>Expenses by category</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
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
              innerRadius={60}
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalExpenses.toLocaleString('en-IN')}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
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
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing top {chartData.length} spending categories
        </div>
      </CardFooter>
    </Card>
  )
}
