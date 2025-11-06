// Custom hook for Wallet page state management

import { useState, useMemo, useCallback } from 'react'
import {
  type Transaction,
  type TransactionType,
  type TransactionStatus,
} from '@/data/lender/mockWalletData'
import {
  searchTransactions,
  filterTransactionsByType,
  filterTransactionsByStatus,
  sortTransactions,
} from '@/utils/walletUtils'

export const useWallet = (initialTransactions: Transaction[]) => {
  const [transactions] = useState<Transaction[]>(initialTransactions)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilters, setTypeFilters] = useState<TransactionType[]>([])
  const [statusFilters, setStatusFilters] = useState<TransactionStatus[]>([])
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  
  // Dialog states
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false)
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false)

  // Apply all filters and sorting
  const filteredTransactions = useMemo(() => {
    let filtered = transactions

    // Search filter
    filtered = searchTransactions(filtered, searchQuery)

    // Type filter
    filtered = filterTransactionsByType(filtered, typeFilters)

    // Status filter
    filtered = filterTransactionsByStatus(filtered, statusFilters)

    // Sort
    filtered = sortTransactions(filtered, sortBy, sortOrder)

    return filtered
  }, [transactions, searchQuery, typeFilters, statusFilters, sortBy, sortOrder])

  // Toggle type filter
  const toggleTypeFilter = useCallback((type: TransactionType) => {
    setTypeFilters(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }, [])

  // Toggle status filter
  const toggleStatusFilter = useCallback((status: TransactionStatus) => {
    setStatusFilters(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    )
  }, [])

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setSearchQuery('')
    setTypeFilters([])
    setStatusFilters([])
    setSortBy('date')
    setSortOrder('desc')
  }, [])

  // Handle sort change
  const handleSortChange = useCallback((newSortBy: 'date' | 'amount') => {
    if (sortBy === newSortBy) {
      // Toggle order if same column
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(newSortBy)
      setSortOrder('desc')
    }
  }, [sortBy])

  // Dialog handlers
  const openDepositDialog = useCallback(() => {
    setIsDepositDialogOpen(true)
  }, [])

  const closeDepositDialog = useCallback(() => {
    setIsDepositDialogOpen(false)
  }, [])

  const openWithdrawDialog = useCallback(() => {
    setIsWithdrawDialogOpen(true)
  }, [])

  const closeWithdrawDialog = useCallback(() => {
    setIsWithdrawDialogOpen(false)
  }, [])

  // Handle deposit submission
  const handleDeposit = useCallback((amount: number, method: string) => {
    // In a real app, this would call an API
    console.log('Deposit:', { amount, method })
    closeDepositDialog()
    // Show success notification
  }, [closeDepositDialog])

  // Handle withdrawal submission
  const handleWithdraw = useCallback((amount: number, method: string) => {
    // In a real app, this would call an API
    console.log('Withdraw:', { amount, method })
    closeWithdrawDialog()
    // Show success notification
  }, [closeWithdrawDialog])

  const hasActiveFilters = searchQuery !== '' || typeFilters.length > 0 || statusFilters.length > 0

  return {
    transactions,
    filteredTransactions,
    searchQuery,
    setSearchQuery,
    typeFilters,
    toggleTypeFilter,
    statusFilters,
    toggleStatusFilter,
    sortBy,
    sortOrder,
    handleSortChange,
    clearAllFilters,
    hasActiveFilters,
    isDepositDialogOpen,
    isWithdrawDialogOpen,
    openDepositDialog,
    closeDepositDialog,
    openWithdrawDialog,
    closeWithdrawDialog,
    handleDeposit,
    handleWithdraw,
  }
}
