import { mockTransactions } from '@/data/mockTransactions'
import type { Transaction } from '@/types'

// Module-level mutable array seeded from mock data.
// This resets on every cold start since Next.js re-evaluates modules.
// For demo purposes only — swap with a real DB for production.
export let transactions: Transaction[] = [...mockTransactions]

export async function GET() {
  await new Promise((r) => setTimeout(r, 400))
  return Response.json(transactions)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newTransaction: Transaction = {
    ...body,
    id: crypto.randomUUID(),
  }
  transactions.push(newTransaction)
  return Response.json(newTransaction)
}
