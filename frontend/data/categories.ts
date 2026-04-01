import {
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Receipt,
  Film,
  Heart,
  Plane,
  Banknote,
  Briefcase,
  MoreHorizontal,
} from 'lucide-react'
import type { Category } from '@/types'
import type { LucideIcon } from 'lucide-react'

export type CategoryConfig = {
  name: Category
  color: string
  icon: LucideIcon
}

export const categoryConfig: CategoryConfig[] = [
  { name: 'Food', color: '#f97316', icon: UtensilsCrossed },
  { name: 'Transport', color: '#3b82f6', icon: Car },
  { name: 'Shopping', color: '#a855f7', icon: ShoppingBag },
  { name: 'Bills', color: '#ef4444', icon: Receipt },
  { name: 'Entertainment', color: '#ec4899', icon: Film },
  { name: 'Health', color: '#22c55e', icon: Heart },
  { name: 'Travel', color: '#14b8a6', icon: Plane },
  { name: 'Salary', color: '#84cc16', icon: Banknote },
  { name: 'Freelance', color: '#eab308', icon: Briefcase },
  { name: 'Other', color: '#94a3b8', icon: MoreHorizontal },
]

export function getCategoryConfig(name: Category) {
  return categoryConfig.find((c) => c.name === name) ?? categoryConfig[9]
}
