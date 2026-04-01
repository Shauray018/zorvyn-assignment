export type Role = 'admin' | 'viewer'

export type Category =
  | 'Food'
  | 'Transport'
  | 'Shopping'
  | 'Bills'
  | 'Entertainment'
  | 'Health'
  | 'Travel'
  | 'Salary'
  | 'Freelance'
  | 'Other'

export type TransactionType = 'income' | 'expense'

export type Transaction = {
  id: string
  date: string
  description: string
  category: Category
  type: TransactionType
  amount: number
}
