'use client'

import { useState } from 'react'
import { Search, RotateCcw } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useFilterStore } from '@/store/useFilterStore'
import { categoryConfig } from '@/data/categories'

export function TransactionFilters() {
  const {
    search,
    category,
    type,
    sortBy,
    sortOrder,
    setSearch,
    setCategory,
    setType,
    setSortBy,
    setSortOrder,
    resetFilters,
  } = useFilterStore()

  const [localSearch, setLocalSearch] = useState(search)

  useDebounce(() => setSearch(localSearch), 300, [localSearch])

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search transactions..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select value={category} onValueChange={(v) => setCategory(v as typeof category)}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            {categoryConfig.map((c) => (
              <SelectItem key={c.name} value={c.name}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={type} onValueChange={(v) => setType(v as typeof type)}>
          <SelectTrigger className="flex-1 sm:w-[130px] sm:flex-none">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={`${sortBy}-${sortOrder}`}
          onValueChange={(v) => {
            const [field, order] = v.split('-') as [typeof sortBy, typeof sortOrder]
            setSortBy(field)
            setSortOrder(order)
          }}
        >
          <SelectTrigger className="w-full sm:w-auto sm:min-w-fit">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Sort by: Date New to Old</SelectItem>
            <SelectItem value="date-asc">Sort by: Date Old to New</SelectItem>
            <SelectItem value="amount-desc">Sort by: Amount High to Low</SelectItem>
            <SelectItem value="amount-asc">Sort by: Amount Low to High</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="ghost" size="sm" onClick={() => { resetFilters(); setLocalSearch('') }}>
          <RotateCcw className="mr-1 size-3" />
          Reset
        </Button>
      </div>
    </div>
  )
}
