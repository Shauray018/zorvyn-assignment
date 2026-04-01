'use client'

import { useState } from 'react'
import { Plus, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTransactionStore } from '@/store/useTransactionStore'
import { useRoleStore } from '@/store/useRoleStore'
import { useFilterStore } from '@/store/useFilterStore'
import { TransactionFilters } from '@/components/transactions/TransactionFilters'
import { TransactionTable } from '@/components/transactions/TransactionTable'
import { AddTransactionModal } from '@/components/transactions/AddTransactionModal'
import { TransactionsSkeleton } from '@/components/skeletons/TransactionsSkeleton'
import type { Transaction } from '@/types'

function getFilteredTransactions(
  transactions: Transaction[],
  filters: { search: string; category: string; type: string }
) {
  let result = [...transactions]
  if (filters.search) {
    const q = filters.search.toLowerCase()
    result = result.filter((t) => t.description.toLowerCase().includes(q))
  }
  if (filters.category !== 'All') {
    result = result.filter((t) => t.category === filters.category)
  }
  if (filters.type !== 'All') {
    result = result.filter((t) => t.type === filters.type)
  }
  return result
}

function exportCSV(transactions: Transaction[]) {
  const headers = 'Date,Description,Category,Type,Amount'
  const rows = transactions.map(
    (t) => `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`
  )
  const csv = [headers, ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'transactions.csv'
  a.click()
  URL.revokeObjectURL(url)
}

export default function TransactionsPage() {
  const { transactions, loading } = useTransactionStore()
  const role = useRoleStore((s) => s.role)
  const { search, category, type } = useFilterStore()
  const [addOpen, setAddOpen] = useState(false)

  if (loading) return <TransactionsSkeleton />

  const filtered = getFilteredTransactions(transactions, { search, category, type })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">All Transactions</h2>
        {role === 'admin' && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none" onClick={() => exportCSV(filtered)}>
              <Download className="mr-1 size-4" />
              Export CSV
            </Button>
            <Button size="sm" className="flex-1 sm:flex-none" onClick={() => setAddOpen(true)}>
              <Plus className="mr-1 size-4" />
              Add Transaction
            </Button>
          </div>
        )}
      </div>
      <TransactionFilters />
      <TransactionTable />
      <AddTransactionModal open={addOpen} onOpenChange={setAddOpen} />
    </div>
  )
}
