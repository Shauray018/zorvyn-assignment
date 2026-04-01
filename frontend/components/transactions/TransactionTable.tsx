'use client'

import { useState, useMemo } from 'react'
import { Pencil, Trash2, FileX } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { useTransactionStore } from '@/store/useTransactionStore'
import { useRoleStore } from '@/store/useRoleStore'
import { useFilterStore } from '@/store/useFilterStore'
import { getCategoryConfig } from '@/data/categories'
import { formatINR, formatDate } from '@/lib/financeHelpers'
import { cn } from '@/lib/utils'
import { EditTransactionModal } from './EditTransactionModal'
import type { Transaction } from '@/types'

export function TransactionTable() {
  const { transactions, loading, deleteTransaction } = useTransactionStore()
  const role = useRoleStore((s) => s.role)
  const { search, category, type, sortBy, sortOrder } = useFilterStore()
  const [editTx, setEditTx] = useState<Transaction | null>(null)
  const [deleteTx, setDeleteTx] = useState<Transaction | null>(null)

  const filtered = useMemo(() => {
    let result = [...transactions]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter((t) => t.description.toLowerCase().includes(q))
    }
    if (category !== 'All') {
      result = result.filter((t) => t.category === category)
    }
    if (type !== 'All') {
      result = result.filter((t) => t.type === type)
    }

    result.sort((a, b) => {
      let cmp = 0
      if (sortBy === 'date') {
        cmp = new Date(a.date).getTime() - new Date(b.date).getTime()
      } else {
        cmp = a.amount - b.amount
      }
      return sortOrder === 'asc' ? cmp : -cmp
    })

    return result
  }, [transactions, search, category, type, sortBy, sortOrder])

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    )
  }

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <FileX className="mb-3 size-12" />
        <p className="text-lg font-medium">No transactions found</p>
        <p className="text-sm">Try adjusting your filters</p>
      </div>
    )
  }

  const handleDelete = async () => {
    if (deleteTx) {
      await deleteTransaction(deleteTx.id)
      setDeleteTx(null)
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              {role === 'admin' && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((tx) => {
              const catConfig = getCategoryConfig(tx.category)
              return (
                <TableRow key={tx.id}>
                  <TableCell className="text-muted-foreground">{formatDate(tx.date)}</TableCell>
                  <TableCell className="font-medium">{tx.description}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="gap-1"
                      style={{ borderColor: catConfig.color, color: catConfig.color }}
                    >
                      {tx.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={tx.type === 'income' ? 'default' : 'destructive'}>
                      {tx.type === 'income' ? 'Income' : 'Expense'}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={cn(
                      'text-right font-medium',
                      tx.type === 'income' ? 'text-green-500' : 'text-red-500'
                    )}
                  >
                    {tx.type === 'income' ? '+' : '-'}
                    {formatINR(tx.amount)}
                  </TableCell>
                  {role === 'admin' && (
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon-sm" onClick={() => setEditTx(tx)}>
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => setDeleteTx(tx)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <EditTransactionModal
        open={!!editTx}
        onOpenChange={(open) => !open && setEditTx(null)}
        transaction={editTx}
      />

      <Dialog open={!!deleteTx} onOpenChange={(open) => !open && setDeleteTx(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Transaction</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{deleteTx?.description}&quot;? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTx(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
