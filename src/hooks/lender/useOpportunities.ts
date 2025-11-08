// Custom hook for opportunities marketplace state management

import { useState, useMemo } from 'react'
import type { Opportunity, OpportunityStatus, UseOfFunds, VendorCategory, AutoInvestRule } from '@/data/lender/mockOpportunities'
import { 
  filterBySearch,
  filterByScoreRange,
  filterByAmountRange,
  filterByTerms,
  filterByUseOfFunds,
  filterByCategories,
  filterByTimeOnPlatform,
  filterByStatus,
  filterByRiskLevel,
  sortOpportunities,
  type SortOption,
} from '@/utils/lender/opportunitiesUtils'

export const useOpportunities = (
  initialOpportunities: Opportunity[],
  autoInvestRules: AutoInvestRule[]
) => {
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [scoreRange, setScoreRange] = useState<[number, number]>([300, 900])
  const [amountRange, setAmountRange] = useState<[number, number]>([0, 50000])
  const [selectedTerms, setSelectedTerms] = useState<number[]>([])
  const [selectedUseOfFunds, setSelectedUseOfFunds] = useState<UseOfFunds[]>([])
  const [selectedCategories, setSelectedCategories] = useState<VendorCategory[]>([])
  const [minTimeOnPlatform, setMinTimeOnPlatform] = useState(0)
  const [selectedStatuses, setSelectedStatuses] = useState<OpportunityStatus[]>(['available', 'partially-funded'])
  const [selectedRiskLevels, setSelectedRiskLevels] = useState<('low' | 'medium' | 'high')[]>([])
  
  // Sort and view state
  const [sortBy, setSortBy] = useState<SortOption>('score-desc')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  // Dialog state
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isAutoInvestDialogOpen, setIsAutoInvestDialogOpen] = useState(false)
  const [isInvestDialogOpen, setIsInvestDialogOpen] = useState(false)
  
  // Auto-invest rule management
  const [activeRules, setActiveRules] = useState<AutoInvestRule[]>(autoInvestRules)
  const [editingRule, setEditingRule] = useState<AutoInvestRule | null>(null)
  
  // Filter opportunities
  const filteredOpportunities = useMemo(() => {
    let filtered = initialOpportunities
    
    // Apply all filters
    filtered = filterBySearch(filtered, searchQuery)
    filtered = filterByScoreRange(filtered, scoreRange[0], scoreRange[1])
    filtered = filterByAmountRange(filtered, amountRange[0], amountRange[1])
    filtered = filterByTerms(filtered, selectedTerms)
    filtered = filterByUseOfFunds(filtered, selectedUseOfFunds)
    filtered = filterByCategories(filtered, selectedCategories)
    filtered = filterByTimeOnPlatform(filtered, minTimeOnPlatform)
    filtered = filterByStatus(filtered, selectedStatuses)
    filtered = filterByRiskLevel(filtered, selectedRiskLevels)
    
    // Sort
    return sortOpportunities(filtered, sortBy)
  }, [
    initialOpportunities,
    searchQuery,
    scoreRange,
    amountRange,
    selectedTerms,
    selectedUseOfFunds,
    selectedCategories,
    minTimeOnPlatform,
    selectedStatuses,
    selectedRiskLevels,
    sortBy,
  ])
  
  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      searchQuery !== '' ||
      scoreRange[0] !== 300 ||
      scoreRange[1] !== 900 ||
      amountRange[0] !== 0 ||
      amountRange[1] !== 50000 ||
      selectedTerms.length > 0 ||
      selectedUseOfFunds.length > 0 ||
      selectedCategories.length > 0 ||
      minTimeOnPlatform > 0 ||
      selectedStatuses.length !== 2 || // Default is ['available', 'partially-funded']
      selectedRiskLevels.length > 0
    )
  }, [
    searchQuery,
    scoreRange,
    amountRange,
    selectedTerms,
    selectedUseOfFunds,
    selectedCategories,
    minTimeOnPlatform,
    selectedStatuses,
    selectedRiskLevels,
  ])
  
  // Filter handlers
  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
  }
  
  const handleScoreRangeChange = (range: [number, number]) => {
    setScoreRange(range)
  }
  
  const handleAmountRangeChange = (range: [number, number]) => {
    setAmountRange(range)
  }
  
  const toggleTerm = (term: number) => {
    setSelectedTerms(prev =>
      prev.includes(term)
        ? prev.filter(t => t !== term)
        : [...prev, term]
    )
  }
  
  const toggleUseOfFunds = (use: UseOfFunds) => {
    setSelectedUseOfFunds(prev =>
      prev.includes(use)
        ? prev.filter(u => u !== use)
        : [...prev, use]
    )
  }
  
  const toggleCategory = (category: VendorCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }
  
  const handleMinTimeChange = (months: number) => {
    setMinTimeOnPlatform(months)
  }
  
  const toggleStatus = (status: OpportunityStatus) => {
    setSelectedStatuses(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    )
  }
  
  const toggleRiskLevel = (risk: 'low' | 'medium' | 'high') => {
    setSelectedRiskLevels(prev =>
      prev.includes(risk)
        ? prev.filter(r => r !== risk)
        : [...prev, risk]
    )
  }
  
  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort)
  }
  
  const toggleViewMode = () => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid')
  }
  
  const clearAllFilters = () => {
    setSearchQuery('')
    setScoreRange([300, 900])
    setAmountRange([0, 50000])
    setSelectedTerms([])
    setSelectedUseOfFunds([])
    setSelectedCategories([])
    setMinTimeOnPlatform(0)
    setSelectedStatuses(['available', 'partially-funded'])
    setSelectedRiskLevels([])
  }
  
  // Opportunity selection handlers
  const openDetails = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity)
    setIsDetailsDialogOpen(true)
  }
  
  const closeDetails = () => {
    setIsDetailsDialogOpen(false)
    setTimeout(() => setSelectedOpportunity(null), 200)
  }
  
  const openInvest = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity)
    setIsInvestDialogOpen(true)
  }
  
  const closeInvest = () => {
    setIsInvestDialogOpen(false)
    setTimeout(() => setSelectedOpportunity(null), 200)
  }
  
  // Auto-invest handlers
  const openAutoInvestDialog = () => {
    setIsAutoInvestDialogOpen(true)
  }
  
  const closeAutoInvestDialog = () => {
    setIsAutoInvestDialogOpen(false)
    setEditingRule(null)
  }
  
  const handleCreateRule = (rule: Omit<AutoInvestRule, 'id' | 'totalInvested' | 'investmentCount' | 'createdDate'>) => {
    const newRule: AutoInvestRule = {
      ...rule,
      id: `RULE${Date.now()}`,
      totalInvested: 0,
      investmentCount: 0,
      createdDate: new Date().toISOString(),
    }
    setActiveRules(prev => [...prev, newRule])
  }
  
  const handleUpdateRule = (ruleId: string, updates: Partial<AutoInvestRule>) => {
    setActiveRules(prev =>
      prev.map(rule => (rule.id === ruleId ? { ...rule, ...updates } : rule))
    )
  }
  
  const handleDeleteRule = (ruleId: string) => {
    setActiveRules(prev => prev.filter(rule => rule.id !== ruleId))
  }
  
  const handleToggleRule = (ruleId: string) => {
    setActiveRules(prev =>
      prev.map(rule =>
        rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
      )
    )
  }
  
  const handleEditRule = (rule: AutoInvestRule) => {
    setEditingRule(rule)
    setIsAutoInvestDialogOpen(true)
  }
  
  return {
    // Filtered data
    opportunities: filteredOpportunities,
    
    // Search and filters
    searchQuery,
    scoreRange,
    amountRange,
    selectedTerms,
    selectedUseOfFunds,
    selectedCategories,
    minTimeOnPlatform,
    selectedStatuses,
    selectedRiskLevels,
    hasActiveFilters,
    
    // Sort and view
    sortBy,
    viewMode,
    
    // Dialogs
    selectedOpportunity,
    isDetailsDialogOpen,
    isAutoInvestDialogOpen,
    isInvestDialogOpen,
    
    // Auto-invest rules
    activeRules,
    editingRule,
    
    // Handlers
    handleSearchChange,
    handleScoreRangeChange,
    handleAmountRangeChange,
    toggleTerm,
    toggleUseOfFunds,
    toggleCategory,
    handleMinTimeChange,
    toggleStatus,
    toggleRiskLevel,
    handleSortChange,
    toggleViewMode,
    clearAllFilters,
    openDetails,
    closeDetails,
    openInvest,
    closeInvest,
    openAutoInvestDialog,
    closeAutoInvestDialog,
    handleCreateRule,
    handleUpdateRule,
    handleDeleteRule,
    handleToggleRule,
    handleEditRule,
  }
}
