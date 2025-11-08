// Utilities for opportunities marketplace

import type { 
  Opportunity, 
  OpportunityStatus, 
  UseOfFunds, 
  VendorCategory,
  AutoInvestRule 
} from '@/data/lender/mockOpportunities'

// ============================================================================
// FORMATTING UTILITIES
// ============================================================================

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`
}

export const formatMerchantScore = (score: number): string => {
  return score.toString()
}

export const formatTerm = (months: number): string => {
  if (months === 1) return '1 month'
  if (months < 12) return `${months} months`
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  if (remainingMonths === 0) return `${years} ${years === 1 ? 'year' : 'years'}`
  return `${years}y ${remainingMonths}m`
}

export const formatTimeOnPlatform = (months: number): string => {
  if (months < 12) return `${months} months`
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  if (remainingMonths === 0) return `${years}+ ${years === 1 ? 'year' : 'years'}`
  return `${years}+ years`
}

export const formatDateRelative = (dateString: string): string => {
  const date = new Date(dateString)
  const today = new Date()
  const diffTime = date.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return 'Expired'
  if (diffDays === 0) return 'Expires today'
  if (diffDays === 1) return 'Expires tomorrow'
  if (diffDays <= 7) return `${diffDays} days left`
  return `${Math.ceil(diffDays / 7)} weeks left`
}

// ============================================================================
// LABEL & ICON UTILITIES
// ============================================================================

export const getUseOfFundsLabel = (useOfFunds: UseOfFunds): string => {
  const labels: Record<UseOfFunds, string> = {
    inventory: 'Inventory Purchase',
    marketing: 'Marketing & Ads',
    equipment: 'Equipment',
    expansion: 'Business Expansion',
    'working-capital': 'Working Capital',
    technology: 'Technology & Software',
    staffing: 'Staffing & HR',
    other: 'Other',
  }
  return labels[useOfFunds]
}

export const getCategoryLabel = (category: VendorCategory): string => {
  const labels: Record<VendorCategory, string> = {
    fashion: 'Fashion & Apparel',
    electronics: 'Electronics & Tech',
    'home-garden': 'Home & Garden',
    'beauty-health': 'Beauty & Health',
    'food-beverage': 'Food & Beverage',
    'sports-outdoors': 'Sports & Outdoors',
    'toys-games': 'Toys & Games',
    'books-media': 'Books & Media',
    automotive: 'Automotive',
    other: 'Other',
  }
  return labels[category]
}

export const getStatusLabel = (status: OpportunityStatus): string => {
  const labels: Record<OpportunityStatus, string> = {
    available: 'Available',
    'partially-funded': 'Partially Funded',
    'fully-funded': 'Fully Funded',
    expired: 'Expired',
  }
  return labels[status]
}

export const getRiskLevelLabel = (risk: 'low' | 'medium' | 'high'): string => {
  const labels = {
    low: 'Low Risk',
    medium: 'Medium Risk',
    high: 'High Risk',
  }
  return labels[risk]
}

// ============================================================================
// COLOR UTILITIES
// ============================================================================

export const getScoreColor = (score: number): string => {
  if (score >= 800) return 'text-green-600'
  if (score >= 700) return 'text-blue-600'
  if (score >= 600) return 'text-amber-600'
  return 'text-red-600'
}

export const getScoreBgColor = (score: number): string => {
  if (score >= 800) return 'bg-green-500/10'
  if (score >= 700) return 'bg-blue-500/10'
  if (score >= 600) return 'bg-amber-500/10'
  return 'bg-red-500/10'
}

export const getScoreBorderColor = (score: number): string => {
  if (score >= 800) return 'border-green-500/20'
  if (score >= 700) return 'border-blue-500/20'
  if (score >= 600) return 'border-amber-500/20'
  return 'border-red-500/20'
}

export const getRiskColor = (risk: 'low' | 'medium' | 'high'): string => {
  const colors = {
    low: 'text-green-600 bg-green-500/10 border-green-500/20',
    medium: 'text-amber-600 bg-amber-500/10 border-amber-500/20',
    high: 'text-red-600 bg-red-500/10 border-red-500/20',
  }
  return colors[risk]
}

export const getStatusColor = (status: OpportunityStatus): string => {
  const colors: Record<OpportunityStatus, string> = {
    available: 'text-green-600 bg-green-500/10 border-green-500/20',
    'partially-funded': 'text-blue-600 bg-blue-500/10 border-blue-500/20',
    'fully-funded': 'text-purple-600 bg-purple-500/10 border-purple-500/20',
    expired: 'text-gray-600 bg-gray-500/10 border-gray-500/20',
  }
  return colors[status]
}

// ============================================================================
// CALCULATION UTILITIES
// ============================================================================

export const calculateFundingPercentage = (opp: Opportunity): number => {
  return (opp.fundedAmount / opp.requestedAmount) * 100
}

export const calculateRemainingAmount = (opp: Opportunity): number => {
  return opp.requestedAmount - opp.fundedAmount
}

export const calculateMonthlyPayment = (amount: number, apr: number, term: number): number => {
  const monthlyRate = apr / 100 / 12
  return amount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1)
}

export const calculateTotalReturn = (amount: number, apr: number, term: number): number => {
  const monthlyPayment = calculateMonthlyPayment(amount, apr, term)
  return monthlyPayment * term
}

export const calculateROI = (amount: number, apr: number, term: number): number => {
  const totalReturn = calculateTotalReturn(amount, apr, term)
  return ((totalReturn - amount) / amount) * 100
}

export const calculateExpectedReturn = (investAmount: number, opp: Opportunity): number => {
  return calculateTotalReturn(investAmount, opp.apr, opp.term) - investAmount
}

export const getDaysUntilExpiry = (expiryDate: string): number => {
  const expiry = new Date(expiryDate)
  const today = new Date()
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

export const isExpiringSoon = (opp: Opportunity, daysThreshold: number = 3): boolean => {
  return getDaysUntilExpiry(opp.expiryDate) <= daysThreshold
}

// ============================================================================
// SCORING & GRADING UTILITIES
// ============================================================================

export const getScoreGrade = (score: number): string => {
  if (score >= 850) return 'A+'
  if (score >= 800) return 'A'
  if (score >= 750) return 'B+'
  if (score >= 700) return 'B'
  if (score >= 650) return 'C+'
  if (score >= 600) return 'C'
  return 'D'
}

export const calculateOpportunityScore = (opp: Opportunity): number => {
  // Composite score based on multiple factors (0-100)
  const merchantScore = (opp.merchantStrengthScore / 900) * 30 // 30 points
  const timeOnPlatform = Math.min((opp.timeOnPlatform / 24) * 20, 20) // 20 points
  const successfulLoans = Math.min(opp.successfulLoans * 5, 20) // 20 points
  const lowDefault = ((100 - opp.defaultProbability) / 100) * 15 // 15 points
  const fundingProgress = (calculateFundingPercentage(opp) / 100) * 10 // 10 points
  const popularity = Math.min((opp.interestedInvestors / 20) * 5, 5) // 5 points
  
  return merchantScore + timeOnPlatform + successfulLoans + lowDefault + fundingProgress + popularity
}

// ============================================================================
// FILTERING UTILITIES
// ============================================================================

export const filterBySearch = (opportunities: Opportunity[], query: string): Opportunity[] => {
  if (!query.trim()) return opportunities
  
  const lowerQuery = query.toLowerCase()
  return opportunities.filter(opp => 
    opp.vendorName.toLowerCase().includes(lowerQuery) ||
    opp.description.toLowerCase().includes(lowerQuery) ||
    opp.id.toLowerCase().includes(lowerQuery) ||
    getCategoryLabel(opp.category).toLowerCase().includes(lowerQuery) ||
    getUseOfFundsLabel(opp.useOfFunds).toLowerCase().includes(lowerQuery)
  )
}

export const filterByScoreRange = (opportunities: Opportunity[], min: number, max: number): Opportunity[] => {
  return opportunities.filter(opp => opp.merchantStrengthScore >= min && opp.merchantStrengthScore <= max)
}

export const filterByAmountRange = (opportunities: Opportunity[], min: number, max: number): Opportunity[] => {
  return opportunities.filter(opp => opp.requestedAmount >= min && opp.requestedAmount <= max)
}

export const filterByTerms = (opportunities: Opportunity[], terms: number[]): Opportunity[] => {
  if (terms.length === 0) return opportunities
  return opportunities.filter(opp => terms.includes(opp.term))
}

export const filterByUseOfFunds = (opportunities: Opportunity[], uses: UseOfFunds[]): Opportunity[] => {
  if (uses.length === 0) return opportunities
  return opportunities.filter(opp => uses.includes(opp.useOfFunds))
}

export const filterByCategories = (opportunities: Opportunity[], categories: VendorCategory[]): Opportunity[] => {
  if (categories.length === 0) return opportunities
  return opportunities.filter(opp => categories.includes(opp.category))
}

export const filterByTimeOnPlatform = (opportunities: Opportunity[], minMonths: number): Opportunity[] => {
  return opportunities.filter(opp => opp.timeOnPlatform >= minMonths)
}

export const filterByStatus = (opportunities: Opportunity[], statuses: OpportunityStatus[]): Opportunity[] => {
  if (statuses.length === 0) return opportunities
  return opportunities.filter(opp => statuses.includes(opp.status))
}

export const filterByRiskLevel = (opportunities: Opportunity[], risks: ('low' | 'medium' | 'high')[]): Opportunity[] => {
  if (risks.length === 0) return opportunities
  return opportunities.filter(opp => risks.includes(opp.riskLevel))
}

// ============================================================================
// SORTING UTILITIES
// ============================================================================

export type SortOption = 
  | 'score-desc'
  | 'score-asc'
  | 'amount-desc'
  | 'amount-asc'
  | 'apr-desc'
  | 'apr-asc'
  | 'term-asc'
  | 'term-desc'
  | 'expiry-asc'
  | 'newest'
  | 'popular'

export const sortOpportunities = (opportunities: Opportunity[], sortBy: SortOption): Opportunity[] => {
  const sorted = [...opportunities]
  
  switch (sortBy) {
    case 'score-desc':
      return sorted.sort((a, b) => b.merchantStrengthScore - a.merchantStrengthScore)
    case 'score-asc':
      return sorted.sort((a, b) => a.merchantStrengthScore - b.merchantStrengthScore)
    case 'amount-desc':
      return sorted.sort((a, b) => b.requestedAmount - a.requestedAmount)
    case 'amount-asc':
      return sorted.sort((a, b) => a.requestedAmount - b.requestedAmount)
    case 'apr-desc':
      return sorted.sort((a, b) => b.apr - a.apr)
    case 'apr-asc':
      return sorted.sort((a, b) => a.apr - b.apr)
    case 'term-asc':
      return sorted.sort((a, b) => a.term - b.term)
    case 'term-desc':
      return sorted.sort((a, b) => b.term - a.term)
    case 'expiry-asc':
      return sorted.sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime())
    case 'newest':
      return sorted.sort((a, b) => new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime())
    case 'popular':
      return sorted.sort((a, b) => b.interestedInvestors - a.interestedInvestors)
    default:
      return sorted
  }
}

export const getSortLabel = (sortBy: SortOption): string => {
  const labels: Record<SortOption, string> = {
    'score-desc': 'Highest Score',
    'score-asc': 'Lowest Score',
    'amount-desc': 'Highest Amount',
    'amount-asc': 'Lowest Amount',
    'apr-desc': 'Highest APR',
    'apr-asc': 'Lowest APR',
    'term-asc': 'Shortest Term',
    'term-desc': 'Longest Term',
    'expiry-asc': 'Expiring Soon',
    newest: 'Newest First',
    popular: 'Most Popular',
  }
  return labels[sortBy]
}

// ============================================================================
// AUTO-INVEST UTILITIES
// ============================================================================

export const checkAutoInvestMatch = (opportunity: Opportunity, rule: AutoInvestRule): boolean => {
  if (!rule.isActive) return false
  if (opportunity.status !== 'available' && opportunity.status !== 'partially-funded') return false
  
  // Score range check
  if (opportunity.merchantStrengthScore < rule.minMerchantScore) return false
  if (rule.maxMerchantScore && opportunity.merchantStrengthScore > rule.maxMerchantScore) return false
  
  // Amount range check
  if (rule.minLoanAmount && opportunity.requestedAmount < rule.minLoanAmount) return false
  if (rule.maxLoanAmount && opportunity.requestedAmount > rule.maxLoanAmount) return false
  
  // Term check
  if (rule.preferredTerms.length > 0 && !rule.preferredTerms.includes(opportunity.term)) return false
  
  // Use of funds check
  if (rule.preferredUseOfFunds.length > 0 && !rule.preferredUseOfFunds.includes(opportunity.useOfFunds)) return false
  
  // Category check
  if (rule.preferredCategories.length > 0 && !rule.preferredCategories.includes(opportunity.category)) return false
  
  // Time on platform check
  if (rule.minTimeOnPlatform && opportunity.timeOnPlatform < rule.minTimeOnPlatform) return false
  
  // Risk level check
  const riskLevels = ['low', 'medium', 'high']
  const maxRiskIndex = riskLevels.indexOf(rule.maxRiskLevel)
  const oppRiskIndex = riskLevels.indexOf(opportunity.riskLevel)
  if (oppRiskIndex > maxRiskIndex) return false
  
  return true
}

export const getMatchingRules = (opportunity: Opportunity, rules: AutoInvestRule[]): AutoInvestRule[] => {
  return rules.filter(rule => checkAutoInvestMatch(opportunity, rule))
}

export const calculateAutoInvestAmount = (opportunity: Opportunity, rule: AutoInvestRule): number => {
  const remaining = calculateRemainingAmount(opportunity)
  const maxAllowed = Math.min(rule.maxInvestmentPerVendor, opportunity.maxInvestment)
  return Math.min(remaining, maxAllowed)
}
