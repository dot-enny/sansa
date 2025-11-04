// Utility functions for wallet management

import { type Transaction, type TransactionType, type TransactionStatus } from '@/data/lender/mockWalletData'

// Format currency to Nigerian Naira
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount)
}

// Format date and time
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Format date only
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Format time only
export const formatTime = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-NG', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Get relative time (e.g., "2 hours ago")
export const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} min${diffMins === 1 ? '' : 's'} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`
  return formatDate(dateString)
}

// Get transaction type label
export const getTransactionTypeLabel = (type: TransactionType): string => {
  const labels = {
    deposit: 'Deposit',
    withdraw: 'Withdrawal',
    investment: 'Investment',
    return: 'Return',
    fee: 'Fee',
  }
  return labels[type]
}

// Get transaction type color
export const getTransactionTypeColor = (type: TransactionType): string => {
  const colors = {
    deposit: 'text-green-600 bg-green-500/10 border-green-500/20',
    withdraw: 'text-orange-600 bg-orange-500/10 border-orange-500/20',
    investment: 'text-blue-600 bg-blue-500/10 border-blue-500/20',
    return: 'text-green-600 bg-green-500/10 border-green-500/20',
    fee: 'text-red-600 bg-red-500/10 border-red-500/20',
  }
  return colors[type]
}

// Get transaction type icon color
export const getTransactionTypeIconColor = (type: TransactionType): string => {
  const colors = {
    deposit: 'text-green-600',
    withdraw: 'text-orange-600',
    investment: 'text-blue-600',
    return: 'text-green-600',
    fee: 'text-red-600',
  }
  return colors[type]
}

// Get transaction status color
export const getTransactionStatusColor = (status: TransactionStatus): string => {
  const colors = {
    completed: 'text-green-600 bg-green-500/10 border-green-500/20',
    pending: 'text-amber-600 bg-amber-500/10 border-amber-500/20',
    failed: 'text-red-600 bg-red-500/10 border-red-500/20',
  }
  return colors[status]
}

// Get transaction status label
export const getTransactionStatusLabel = (status: TransactionStatus): string => {
  const labels = {
    completed: 'Completed',
    pending: 'Pending',
    failed: 'Failed',
  }
  return labels[status]
}

// Format transaction amount with sign
export const formatTransactionAmount = (amount: number): string => {
  const formatted = formatCurrency(Math.abs(amount))
  return amount >= 0 ? `+${formatted}` : `-${formatted}`
}

// Get amount color based on positive/negative
export const getAmountColor = (amount: number): string => {
  return amount >= 0 ? 'text-green-600' : 'text-red-600'
}

// Filter transactions by type
export const filterTransactionsByType = (
  transactions: Transaction[],
  types: TransactionType[]
): Transaction[] => {
  if (types.length === 0) return transactions
  return transactions.filter(txn => types.includes(txn.type))
}

// Filter transactions by status
export const filterTransactionsByStatus = (
  transactions: Transaction[],
  statuses: TransactionStatus[]
): Transaction[] => {
  if (statuses.length === 0) return transactions
  return transactions.filter(txn => statuses.includes(txn.status))
}

// Filter transactions by date range
export const filterTransactionsByDateRange = (
  transactions: Transaction[],
  startDate: Date | null,
  endDate: Date | null
): Transaction[] => {
  let filtered = transactions

  if (startDate) {
    filtered = filtered.filter(txn => new Date(txn.date) >= startDate)
  }

  if (endDate) {
    const endOfDay = new Date(endDate)
    endOfDay.setHours(23, 59, 59, 999)
    filtered = filtered.filter(txn => new Date(txn.date) <= endOfDay)
  }

  return filtered
}

// Search transactions
export const searchTransactions = (
  transactions: Transaction[],
  searchQuery: string
): Transaction[] => {
  if (!searchQuery.trim()) return transactions

  const query = searchQuery.toLowerCase()

  return transactions.filter(
    txn =>
      txn.description.toLowerCase().includes(query) ||
      txn.id.toLowerCase().includes(query) ||
      (txn.reference && txn.reference.toLowerCase().includes(query))
  )
}

// Sort transactions
export const sortTransactions = (
  transactions: Transaction[],
  sortBy: 'date' | 'amount',
  order: 'asc' | 'desc' = 'desc'
): Transaction[] => {
  const sorted = [...transactions].sort((a, b) => {
    let comparison = 0

    if (sortBy === 'date') {
      comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
    } else if (sortBy === 'amount') {
      comparison = Math.abs(a.amount) - Math.abs(b.amount)
    }

    return order === 'asc' ? comparison : -comparison
  })

  return sorted
}
