// Utility functions for analytics calculations and formatting

// Utility functions for analytics calculations and formatting
import type { InvestmentTrendPoint, RiskMetric } from "@/data/lender/mockAnalyticsData"

// Format currency in Nigerian Naira
export const formatCurrency = (amount: number): string => {
  if (amount >= 1000000000) {
    return `₦${(amount / 1000000000).toFixed(2)}B`
  }
  if (amount >= 1000000) {
    return `₦${(amount / 1000000).toFixed(2)}M`
  }
  if (amount >= 1000) {
    return `₦${(amount / 1000).toFixed(2)}K`
  }
  return `₦${amount.toLocaleString()}`
}

// Format full currency amount
export const formatFullCurrency = (amount: number): string => {
  return `₦${amount.toLocaleString('en-NG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`
}

// Format percentage
export const formatPercentage = (value: number, decimals = 2): string => {
  return `${value.toFixed(decimals)}%`
}

// Format ROI with sign
export const formatROI = (roi: number): string => {
  const sign = roi >= 0 ? '+' : ''
  return `${sign}${roi.toFixed(2)}%`
}

// Get ROI color class
export const getROIColor = (roi: number): string => {
  if (roi >= 15) return 'text-green-600'
  if (roi >= 10) return 'text-green-500'
  if (roi >= 5) return 'text-amber-600'
  if (roi >= 0) return 'text-amber-500'
  return 'text-red-600'
}

// Get ROI background color class
export const getROIBgColor = (roi: number): string => {
  if (roi >= 15) return 'bg-green-100'
  if (roi >= 10) return 'bg-green-50'
  if (roi >= 5) return 'bg-amber-100'
  if (roi >= 0) return 'bg-amber-50'
  return 'bg-red-50'
}

// Calculate growth rate between two values
export const calculateGrowth = (current: number, previous: number): number => {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}

// Get growth direction
export const getGrowthDirection = (growth: number): 'up' | 'down' | 'stable' => {
  if (growth > 0.5) return 'up'
  if (growth < -0.5) return 'down'
  return 'stable'
}

// Format month from date string (YYYY-MM)
export const formatMonth = (dateString: string): string => {
  const [year, month] = dateString.split('-')
  const date = new Date(parseInt(year), parseInt(month) - 1)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

// Format month short (MMM)
export const formatMonthShort = (dateString: string): string => {
  const [year, month] = dateString.split('-')
  const date = new Date(parseInt(year), parseInt(month) - 1)
  return date.toLocaleDateString('en-US', { month: 'short' })
}

// Calculate average from array of numbers
export const calculateAverage = (values: number[]): number => {
  if (values.length === 0) return 0
  return values.reduce((sum, val) => sum + val, 0) / values.length
}

// Calculate total from array of numbers
export const calculateTotal = (values: number[]): number => {
  return values.reduce((sum, val) => sum + val, 0)
}

// Get risk score percentage
export const getRiskScorePercentage = (score: number, maxScore: number): number => {
  return (score / maxScore) * 100
}

// Get risk level badge color
export const getRiskLevelColor = (level: 'low' | 'medium' | 'high'): string => {
  switch (level) {
    case 'low':
      return 'bg-green-100 text-green-700 border-green-200'
    case 'medium':
      return 'bg-amber-100 text-amber-700 border-amber-200'
    case 'high':
      return 'bg-red-100 text-red-700 border-red-200'
  }
}

// Get risk level text color
export const getRiskLevelTextColor = (level: 'low' | 'medium' | 'high'): string => {
  switch (level) {
    case 'low':
      return 'text-green-600'
    case 'medium':
      return 'text-amber-600'
    case 'high':
      return 'text-red-600'
  }
}

// Calculate overall risk score
export const calculateOverallRiskScore = (metrics: RiskMetric[]): number => {
  if (metrics.length === 0) return 0
  const totalScore = metrics.reduce((sum, metric) => sum + metric.score, 0)
  const totalMaxScore = metrics.reduce((sum, metric) => sum + metric.maxScore, 0)
  return (totalScore / totalMaxScore) * 100
}

// Get overall risk level
export const getOverallRiskLevel = (
  score: number
): 'low' | 'medium' | 'high' => {
  if (score >= 75) return 'low'
  if (score >= 50) return 'medium'
  return 'high'
}

// Filter trends by date range
export const filterTrendsByDateRange = (
  trends: InvestmentTrendPoint[],
  months: number
): InvestmentTrendPoint[] => {
  return trends.slice(-months)
}

// Get trend comparison
export const getTrendComparison = (
  trends: InvestmentTrendPoint[]
): {
  current: number
  previous: number
  growth: number
  direction: 'up' | 'down' | 'stable'
} => {
  if (trends.length < 2) {
    return { current: 0, previous: 0, growth: 0, direction: 'stable' }
  }

  const current = trends[trends.length - 1].roi
  const previous = trends[trends.length - 2].roi
  const growth = calculateGrowth(current, previous)

  return {
    current,
    previous,
    growth,
    direction: getGrowthDirection(growth),
  }
}

// Calculate moving average
export const calculateMovingAverage = (
  data: number[],
  period: number
): number[] => {
  if (data.length < period) return []

  const result: number[] = []
  for (let i = period - 1; i < data.length; i++) {
    const slice = data.slice(i - period + 1, i + 1)
    result.push(calculateAverage(slice))
  }
  return result
}

// Format duration in months
export const formatDuration = (months: number): string => {
  if (months === 1) return '1 month'
  if (months < 12) return `${months} months`
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  if (remainingMonths === 0) return years === 1 ? '1 year' : `${years} years`
  return `${years}y ${remainingMonths}m`
}

// Get status badge color
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-blue-100 text-blue-700 border-blue-200'
    case 'completed':
      return 'bg-green-100 text-green-700 border-green-200'
    case 'pending':
      return 'bg-amber-100 text-amber-700 border-amber-200'
    case 'cancelled':
      return 'bg-red-100 text-red-700 border-red-200'
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}

// Calculate compound annual growth rate (CAGR)
export const calculateCAGR = (
  beginningValue: number,
  endingValue: number,
  years: number
): number => {
  if (beginningValue === 0 || years === 0) return 0
  return (Math.pow(endingValue / beginningValue, 1 / years) - 1) * 100
}

// Format large numbers with suffix
export const formatLargeNumber = (num: number): string => {
  if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

// Get performance grade
export const getPerformanceGrade = (roi: number): string => {
  if (roi >= 20) return 'A+'
  if (roi >= 15) return 'A'
  if (roi >= 12) return 'B+'
  if (roi >= 10) return 'B'
  if (roi >= 7) return 'C+'
  if (roi >= 5) return 'C'
  return 'D'
}

// Get performance grade color
export const getPerformanceGradeColor = (grade: string): string => {
  if (grade.startsWith('A')) return 'text-green-600'
  if (grade.startsWith('B')) return 'text-blue-600'
  if (grade.startsWith('C')) return 'text-amber-600'
  return 'text-red-600'
}

// Export data to CSV format
export const exportToCSV = (
  data: any[],
  headers: string[],
  filename: string
): void => {
  const csvContent = [
    headers.join(','),
    ...data.map((row) => headers.map((header) => row[header]).join(',')),
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', `${filename}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
