'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Transaction } from '@/types'

type TransactionState = {
  transactions: Transaction[]
  loading: boolean
  error: string | null
  fetchTransactions: () => Promise<void>
  addTransaction: (data: Omit<Transaction, 'id'>) => Promise<void>
  editTransaction: (id: string, data: Partial<Transaction>) => Promise<void>
  deleteTransaction: (id: string) => Promise<void>
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set, get) => ({
      transactions: [],
      loading: false,
      error: null,

      fetchTransactions: async () => {
        if (get().transactions.length > 0) {
          return
        }
        set({ loading: true, error: null })
        try {
          const res = await fetch('/api/transactions')
          const data = await res.json()
          set({ transactions: data, loading: false })
        } catch {
          set({ error: 'Failed to fetch transactions', loading: false })
        }
      },

      addTransaction: async (data) => {
        try {
          const res = await fetch('/api/transactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
          const newTx = await res.json()
          set((state) => ({ transactions: [...state.transactions, newTx] }))
        } catch {
          set({ error: 'Failed to add transaction' })
        }
      },

      editTransaction: async (id, data) => {
        try {
          const res = await fetch(`/api/transactions/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
          const updated = await res.json()
          set((state) => ({
            transactions: state.transactions.map((t) => (t.id === id ? updated : t)),
          }))
        } catch {
          set({ error: 'Failed to edit transaction' })
        }
      },

      deleteTransaction: async (id) => {
        try {
          await fetch(`/api/transactions/${id}`, { method: 'DELETE' })
          set((state) => ({
            transactions: state.transactions.filter((t) => t.id !== id),
          }))
        } catch {
          set({ error: 'Failed to delete transaction' })
        }
      },
    }),
    {
      name: 'fintrack-transactions',
      partialize: (state) => ({ transactions: state.transactions }),
    }
  )
)
