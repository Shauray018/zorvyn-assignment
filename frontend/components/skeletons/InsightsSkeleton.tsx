'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ChartCardSkeleton } from './DashboardSkeleton'

export function InsightsBannerSkeleton() {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 py-4">
        <Skeleton className="size-5" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
      </CardContent>
    </Card>
  )
}

export function TopCategorySkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-36" />
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </CardContent>
    </Card>
  )
}

export function StatCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <Skeleton className="size-4" />
        <Skeleton className="h-4 w-32" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-7 w-24" />
        <Skeleton className="mt-1 h-4 w-40" />
      </CardContent>
    </Card>
  )
}

export function InsightsSkeleton() {
  return (
    <div className="space-y-6">
      <InsightsBannerSkeleton />
      <div className="grid gap-6 md:grid-cols-2">
        <ChartCardSkeleton title="Monthly Comparison" />
        <TopCategorySkeleton />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>
    </div>
  )
}
