// Utility functions for investment management

import { type Investment, type InvestmentStatus, type RiskLevel } from '@/data/lender/mockInvestments'

// Format currency to Nigerian Naira
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount)
}

// Format APR percentage
export const formatAPR = (rate: number): string => {
  return `${rate.toFixed(1)}%`
}

// Format date to readable string
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Calculate days until next payment
export const getDaysUntilPayment = (paymentDate: string): number => {
  const today = new Date()
  const payment = new Date(paymentDate)
  const diffTime = payment.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// Calculate ROI percentage
export const calculateROI = (investment: Investment): number => {
  const roi = (investment.totalReturns / investment.principalAmount) * 100
  return Math.round(roi * 10) / 10
}

// Calculate progress percentage
export const calculateProgress = (received: number, total: number): number => {
  return Math.round((received / total) * 100)
}

// Get status color classes
export const getStatusColor = (status: InvestmentStatus): string => {
  const statusColors = {
    'on-time': 'text-green-600 bg-green-500/10 border-green-500/20',
    'late': 'text-amber-600 bg-amber-500/10 border-amber-500/20',
    'at-risk': 'text-orange-600 bg-orange-500/10 border-orange-500/20',
    'in-default': 'text-red-600 bg-red-500/10 border-red-500/20',
    'completed': 'text-blue-600 bg-blue-500/10 border-blue-500/20',
  }
  return statusColors[status]
}

// Get status label
export const getStatusLabel = (status: InvestmentStatus): string => {
  const labels = {
    'on-time': 'On Time',
    'late': 'Late',
    'at-risk': 'At Risk',
    'in-default': 'In Default',
    'completed': 'Completed',
  }
  return labels[status]
}

// Get risk level color classes
export const getRiskColor = (risk: RiskLevel): string => {
  const riskColors = {
    'low': 'text-green-600 bg-green-500/10 border-green-500/20',
    'medium': 'text-amber-600 bg-amber-500/10 border-amber-500/20',
    'high': 'text-red-600 bg-red-500/10 border-red-500/20',
  }
  return riskColors[risk]
}

// Get risk level label
export const getRiskLabel = (risk: RiskLevel): string => {
  const labels = {
    'low': 'Low Risk',
    'medium': 'Medium Risk',
    'high': 'High Risk',
  }
  return labels[risk]
}

// Format payment schedule text
export const getPaymentScheduleText = (investment: Investment): string => {
  if (investment.status === 'completed') {
    return 'Completed'
  }
  
  const daysUntil = getDaysUntilPayment(investment.nextPaymentDate)
  
  if (daysUntil < 0) {
    const daysOverdue = Math.abs(daysUntil)
    return `${daysOverdue} day${daysOverdue === 1 ? '' : 's'} overdue`
  }
  
  if (daysUntil === 0) {
    return 'Due today'
  }
  
  if (daysUntil === 1) {
    return 'Due tomorrow'
  }
  
  if (daysUntil <= 7) {
    return `Due in ${daysUntil} days`
  }
  
  return formatDate(investment.nextPaymentDate)
}

// Sort investments by various criteria
export const sortInvestments = (
  investments: Investment[],
  sortBy: 'amount' | 'date' | 'returns' | 'status' | 'risk',
  order: 'asc' | 'desc' = 'desc'
): Investment[] => {
  const sorted = [...investments].sort((a, b) => {
    let comparison = 0
    
    switch (sortBy) {
      case 'amount':
        comparison = a.principalAmount - b.principalAmount
        break
      case 'date':
        comparison = new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        break
      case 'returns':
        comparison = a.totalReturns - b.totalReturns
        break
      case 'status':
        comparison = a.status.localeCompare(b.status)
        break
      case 'risk':
        const riskOrder = { low: 1, medium: 2, high: 3 }
        comparison = riskOrder[a.riskLevel] - riskOrder[b.riskLevel]
        break
    }
    
    return order === 'asc' ? comparison : -comparison
  })
  
  return sorted
}

// Filter investments by search query
export const filterInvestmentsBySearch = (
  investments: Investment[],
  searchQuery: string
): Investment[] => {
  if (!searchQuery.trim()) return investments
  
  const query = searchQuery.toLowerCase()
  
  return investments.filter(
    inv =>
      inv.vendorName.toLowerCase().includes(query) ||
      inv.id.toLowerCase().includes(query) ||
      inv.vendorCategory.toLowerCase().includes(query)
  )
}

// Filter investments by status
export const filterInvestmentsByStatus = (
  investments: Investment[],
  statuses: InvestmentStatus[]
): Investment[] => {
  if (statuses.length === 0) return investments
  return investments.filter(inv => statuses.includes(inv.status))
}

// Filter investments by risk level
export const filterInvestmentsByRisk = (
  investments: Investment[],
  risks: RiskLevel[]
): Investment[] => {
  if (risks.length === 0) return investments
  return investments.filter(inv => risks.includes(inv.riskLevel))
}
