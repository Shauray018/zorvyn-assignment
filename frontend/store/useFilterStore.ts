'use client'

import { create } from 'zustand'
import type { Category, TransactionType } from '@/types'

type FilterState = {
  search: string
  category: Category | 'All'
  type: TransactionType | 'All'
  sortBy: 'date' | 'amount'
  sortOrder: 'asc' | 'desc'
  setSearch: (search: string) => void
  setCategory: (category: Category | 'All') => void
  setType: (type: TransactionType | 'All') => void
  setSortBy: (sortBy: 'date' | 'amount') => void
  setSortOrder: (sortOrder: 'asc' | 'desc') => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>()((set) => ({
  search: '',
  category: 'All',
  type: 'All',
  sortBy: 'date',
  sortOrder: 'desc',
  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
  setType: (type) => set({ type }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  resetFilters: () =>
    set({ search: '', category: 'All', type: 'All', sortBy: 'date', sortOrder: 'desc' }),
}))
