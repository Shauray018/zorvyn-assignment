import type { Transaction, Category } from '@/types'
import { categoryConfig } from '@/data/categories'

export function getTotalIncome(txs: Transaction[]): number {
  return txs.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
}

export function getTotalExpenses(txs: Transaction[]): number {
  return txs.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
}

export function getBalance(txs: Transaction[]): number {
  return getTotalIncome(txs) - getTotalExpenses(txs)
}

export function getSavingsRate(txs: Transaction[]): number {
  const income = getTotalIncome(txs)
  if (income === 0) return 0
  return Math.round(((income - getTotalExpenses(txs)) / income) * 100)
}

export function getSpendingByCategory(
  txs: Transaction[]
): { category: Category; total: number; color: string }[] {
  const expenses = txs.filter((t) => t.type === 'expense')
  const map = new Map<Category, number>()
  for (const t of expenses) {
    map.set(t.category, (map.get(t.category) ?? 0) + t.amount)
  }
  return Array.from(map.entries())
    .map(([category, total]) => ({
      category,
      total,
      color: categoryConfig.find((c) => c.name === category)?.color ?? '#94a3b8',
    }))
    .sort((a, b) => b.total - a.total)
}

export function getMonthlyData(
  txs: Transaction[]
): { month: string; income: number; expenses: number }[] {
  const now = new Date()
  const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const months = new Map<string, { income: number; expenses: number }>()

  for (const t of txs) {
    const d = new Date(t.date)
    // Skip future-dated transactions
    if (d > now) continue
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const entry = months.get(key) ?? { income: 0, expenses: 0 }
    if (t.type === 'income') entry.income += t.amount
    else entry.expenses += t.amount
    months.set(key, entry)
  }

  return Array.from(months.entries())
    .filter(([key]) => key !== currentMonthKey)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([key, data]) => {
      const [year, month] = key.split('-')
      const date = new Date(Number(year), Number(month) - 1)
      return {
        month: date.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
        income: data.income,
        expenses: data.expenses,
      }
    })
}

export function getHighestSpendingCategory(
  txs: Transaction[]
): { category: Category; total: number; color: string } {
  const spending = getSpendingByCategory(txs)
  return spending[0] ?? { category: 'Other', total: 0, color: '#94a3b8' }
}

export function getBiggestTransaction(txs: Transaction[]): Transaction {
  return txs.reduce((max, t) => (t.amount > max.amount ? t : max), txs[0])
}

export function getAverageDailySpend(txs: Transaction[]): number {
  const expenses = txs.filter((t) => t.type === 'expense')
  if (expenses.length === 0) return 0
  const dates = expenses.map((t) => new Date(t.date).getTime())
  const minDate = Math.min(...dates)
  const maxDate = Math.max(...dates)
  const days = Math.max(1, Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)))
  const total = getTotalExpenses(expenses)
  return Math.round(total / days)
}

export function getMonthOverMonthChange(txs: Transaction[]): number {
  // Compare last two COMPLETE months (skip current incomplete month)
  const now = new Date()
  const cm = now.getMonth()
  const cy = now.getFullYear()

  // Last complete month
  const lm = cm === 0 ? 11 : cm - 1
  const ly = cm === 0 ? cy - 1 : cy

  // Month before that
  const pm = lm === 0 ? 11 : lm - 1
  const py = lm === 0 ? ly - 1 : ly

  const lastTotal = txs
    .filter((t) => {
      const d = new Date(t.date)
      return d.getMonth() === lm && d.getFullYear() === ly && t.type === 'expense'
    })
    .reduce((sum, t) => sum + t.amount, 0)

  const prevTotal = txs
    .filter((t) => {
      const d = new Date(t.date)
      return d.getMonth() === pm && d.getFullYear() === py && t.type === 'expense'
    })
    .reduce((sum, t) => sum + t.amount, 0)

  if (prevTotal === 0) return 0
  return Math.round(((lastTotal - prevTotal) / prevTotal) * 100)
}

export function formatINR(amount: number): string {
  const isNegative = amount < 0
  const abs = Math.abs(Math.round(amount))
  const str = abs.toString()

  if (str.length <= 3) return `${isNegative ? '-' : ''}₹${str}`

  const last3 = str.slice(-3)
  const rest = str.slice(0, -3)
  const formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3

  return `${isNegative ? '-' : ''}₹${formatted}`
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}
