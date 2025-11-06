// Custom hook for Investments page state management

import { useState, useMemo, useCallback } from 'react'
import { 
  type Investment, 
  type InvestmentStatus, 
  type RiskLevel 
} from '@/data/lender/mockInvestments'
import {
  filterInvestmentsBySearch,
  filterInvestmentsByStatus,
  filterInvestmentsByRisk,
  sortInvestments,
} from '@/utils/investmentUtils'

export const useInvestments = (initialInvestments: Investment[]) => {
  const [investments] = useState<Investment[]>(initialInvestments)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilters, setStatusFilters] = useState<InvestmentStatus[]>([])
  const [riskFilters, setRiskFilters] = useState<RiskLevel[]>([])
  const [sortBy, setSortBy] = useState<'amount' | 'date' | 'returns' | 'status' | 'risk'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  // Apply all filters and sorting
  const filteredInvestments = useMemo(() => {
    let filtered = investments

    // Search filter
    filtered = filterInvestmentsBySearch(filtered, searchQuery)

    // Status filter
    filtered = filterInvestmentsByStatus(filtered, statusFilters)

    // Risk filter
    filtered = filterInvestmentsByRisk(filtered, riskFilters)

    // Sort
    filtered = sortInvestments(filtered, sortBy, sortOrder)

    return filtered
  }, [investments, searchQuery, statusFilters, riskFilters, sortBy, sortOrder])

  // Calculate summary stats for filtered data
  const summaryStats = useMemo(() => {
    const totalInvested = filteredInvestments.reduce(
      (sum, inv) => sum + inv.principalAmount,
      0
    )
    const totalReturns = filteredInvestments.reduce(
      (sum, inv) => sum + inv.totalReturns,
      0
    )
    const activeCount = filteredInvestments.filter(
      inv => inv.status !== 'completed'
    ).length

    return {
      totalInvested,
      totalReturns,
      activeCount,
      totalCount: filteredInvestments.length,
    }
  }, [filteredInvestments])

  // Handle view investment details
  const handleViewDetails = useCallback((investment: Investment) => {
    setSelectedInvestment(investment)
    setIsDetailsDialogOpen(true)
  }, [])

  // Handle close details dialog
  const handleCloseDetails = useCallback(() => {
    setIsDetailsDialogOpen(false)
    setTimeout(() => setSelectedInvestment(null), 200)
  }, [])

  // Toggle status filter
  const toggleStatusFilter = useCallback((status: InvestmentStatus) => {
    setStatusFilters(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    )
  }, [])

  // Toggle risk filter
  const toggleRiskFilter = useCallback((risk: RiskLevel) => {
    setRiskFilters(prev =>
      prev.includes(risk)
        ? prev.filter(r => r !== risk)
        : [...prev, risk]
    )
  }, [])

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setSearchQuery('')
    setStatusFilters([])
    setRiskFilters([])
    setSortBy('date')
    setSortOrder('desc')
  }, [])

  // Handle sort change
  const handleSortChange = useCallback((
    newSortBy: 'amount' | 'date' | 'returns' | 'status' | 'risk'
  ) => {
    if (sortBy === newSortBy) {
      // Toggle order if same column
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(newSortBy)
      setSortOrder('desc')
    }
  }, [sortBy])

  const hasActiveFilters = searchQuery !== '' || statusFilters.length > 0 || riskFilters.length > 0

  return {
    investments,
    filteredInvestments,
    summaryStats,
    searchQuery,
    setSearchQuery,
    statusFilters,
    toggleStatusFilter,
    riskFilters,
    toggleRiskFilter,
    sortBy,
    sortOrder,
    handleSortChange,
    clearAllFilters,
    hasActiveFilters,
    selectedInvestment,
    isDetailsDialogOpen,
    handleViewDetails,
    handleCloseDetails,
  }
}
