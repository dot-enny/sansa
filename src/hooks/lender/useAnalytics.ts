// Custom hook for analytics page state management

import { useState, useMemo } from 'react'
import {
  mockPerformanceMetrics,
  mockPortfolioBreakdown,
  mockInvestmentTrends,
  mockRiskMetrics,
  mockMonthlyComparison,
  mockTopPerformingInvestments,
  mockInvestmentDistribution,
} from '@/data/lender/mockAnalyticsData'
import { filterTrendsByDateRange } from '@/utils/analyticsUtils'

export type DateRangeOption = '3M' | '6M' | '1Y' | 'ALL'

export const useAnalytics = () => {
  // Date range filter
  const [dateRange, setDateRange] = useState<DateRangeOption>('6M')

  // Chart view toggles
  const [showNetValue, setShowNetValue] = useState(true)
  const [showInvested, setShowInvested] = useState(true)
  const [showReturns, setShowReturns] = useState(true)

  // Export dialog state
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)

  // Filter trends based on date range
  const filteredTrends = useMemo(() => {
    let monthsToShow: number

    switch (dateRange) {
      case '3M':
        monthsToShow = 3
        break
      case '6M':
        monthsToShow = 6
        break
      case '1Y':
        monthsToShow = 12
        break
      case 'ALL':
      default:
        monthsToShow = mockInvestmentTrends.length
        break
    }

    return filterTrendsByDateRange(mockInvestmentTrends, monthsToShow)
  }, [dateRange])

  // Calculate period comparison
  const periodComparison = useMemo(() => {
    if (filteredTrends.length < 2) {
      return { current: 0, previous: 0, growth: 0 }
    }

    const current = filteredTrends[filteredTrends.length - 1]
    const previous = filteredTrends[0]

    const investedGrowth =
      ((current.invested - previous.invested) / previous.invested) * 100
    const returnsGrowth =
      ((current.returns - previous.returns) / previous.returns) * 100
    const roiGrowth = ((current.roi - previous.roi) / previous.roi) * 100

    return {
      invested: {
        current: current.invested,
        previous: previous.invested,
        growth: investedGrowth,
      },
      returns: {
        current: current.returns,
        previous: previous.returns,
        growth: returnsGrowth,
      },
      roi: {
        current: current.roi,
        previous: previous.roi,
        growth: roiGrowth,
      },
    }
  }, [filteredTrends])

  // Handle date range change
  const handleDateRangeChange = (range: DateRangeOption) => {
    setDateRange(range)
  }

  // Toggle chart series visibility
  const toggleNetValue = () => setShowNetValue((prev) => !prev)
  const toggleInvested = () => setShowInvested((prev) => !prev)
  const toggleReturns = () => setShowReturns((prev) => !prev)

  // Export functionality
  const openExportDialog = () => setIsExportDialogOpen(true)
  const closeExportDialog = () => setIsExportDialogOpen(false)

  const handleExportData = (format: 'csv' | 'pdf' | 'excel') => {
    console.log(`Exporting analytics data as ${format}`)
    // TODO: Implement actual export logic
    closeExportDialog()
  }

  // Get chart data with visibility filters applied
  const chartData = useMemo(() => {
    return filteredTrends.map((trend) => ({
      ...trend,
      netValue: showNetValue ? trend.netValue : undefined,
      invested: showInvested ? trend.invested : undefined,
      returns: showReturns ? trend.returns : undefined,
    }))
  }, [filteredTrends, showNetValue, showInvested, showReturns])

  return {
    // Data
    performanceMetrics: mockPerformanceMetrics,
    portfolioBreakdown: mockPortfolioBreakdown,
    investmentTrends: filteredTrends,
    riskMetrics: mockRiskMetrics,
    monthlyComparison: mockMonthlyComparison,
    topPerformingInvestments: mockTopPerformingInvestments,
    investmentDistribution: mockInvestmentDistribution,

    // Computed data
    chartData,
    periodComparison,

    // Date range state
    dateRange,
    handleDateRangeChange,

    // Chart visibility state
    showNetValue,
    showInvested,
    showReturns,
    toggleNetValue,
    toggleInvested,
    toggleReturns,

    // Export state
    isExportDialogOpen,
    openExportDialog,
    closeExportDialog,
    handleExportData,
  }
}
