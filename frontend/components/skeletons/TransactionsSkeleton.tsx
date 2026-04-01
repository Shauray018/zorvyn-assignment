'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function TransactionFiltersSkeleton() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Skeleton className="h-9 flex-1 min-w-[200px]" />
      <Skeleton className="h-9 w-[150px]" />
      <Skeleton className="h-9 w-[130px]" />
      <Skeleton className="h-9 w-[120px]" />
      <Skeleton className="size-9" />
    </div>
  )
}

export function TransactionTableSkeleton() {
  return (
    <div className="rounded-md border">
      <div className="border-b p-4">
        <div className="flex gap-8">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20 ml-auto" />
        </div>
      </div>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center gap-8 border-b p-4 last:border-0">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-20 ml-auto" />
        </div>
      ))}
    </div>
  )
}

export function TransactionsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-40" />
      </div>
      <TransactionFiltersSkeleton />
      <TransactionTableSkeleton />
    </div>
  )
}
