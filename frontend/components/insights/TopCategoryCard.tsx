'use client'

import * as React from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'
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
import { getSpendingByCategory, formatINR } from '@/lib/financeHelpers'

export function TopCategoryCard() {
  const { transactions, loading } = useTransactionStore()

  const { chartData, chartConfig } = React.useMemo(() => {
    const spending = getSpendingByCategory(transactions).slice(0, 5)

    const config: ChartConfig = {
      total: {
        label: 'Amount',
        color: 'var(--chart-2)',
      },
      label: {
        color: 'var(--background)',
      },
    }

    spending.forEach((item) => {
      const key = item.category.toLowerCase()
      config[key] = {
        label: item.category,
        color: item.color,
      }
    })

    const data = spending.map((item) => {
      const key = item.category.toLowerCase()
      return {
        category: item.category,
        total: item.total,
        formattedTotal: formatINR(item.total),
        fill: `var(--color-${key})`,
      }
    })

    return { chartData: data, chartConfig: config }
  }, [transactions])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Spending Categories</CardTitle>
          <CardDescription>Highest expense categories</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Spending Categories</CardTitle>
        <CardDescription>Highest expense categories</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ right: 80 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />
            <XAxis dataKey="total" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="total" radius={4}>
              <LabelList
                dataKey="category"
                position="insideLeft"
                offset={8}
                className="fill-(--color-label)"
                fontSize={12}
              />
              <LabelList
                dataKey="formattedTotal"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
