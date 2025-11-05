// Analytics data structures and mock data for lender analytics page

export interface PerformanceMetrics {
  totalInvested: number
  currentValue: number
  totalReturns: number
  roi: number
  averageROI: number
  monthlyReturn: number
  yearlyReturn: number
}

export interface PortfolioBreakdownItem {
  category: string
  value: number
  percentage: number
  count: number
  averageROI: number
  color: string
}

export interface InvestmentTrendPoint {
  date: string
  invested: number
  returns: number
  netValue: number
  roi: number
}

export interface RiskMetric {
  category: string
  score: number
  maxScore: number
  level: 'low' | 'medium' | 'high'
  description: string
}

export interface MonthlyComparison {
  month: string
  invested: number
  returned: number
  roi: number
}

export interface TopPerformingInvestment {
  id: string
  title: string
  vendor: string
  invested: number
  returned: number
  roi: number
  duration: number
  status: string
}

export interface InvestmentDistribution {
  range: string
  count: number
  totalAmount: number
  percentage: number
}

// Performance Metrics
export const mockPerformanceMetrics: PerformanceMetrics = {
  totalInvested: 42000000,
  currentValue: 48500000,
  totalReturns: 6500000,
  roi: 15.48,
  averageROI: 12.3,
  monthlyReturn: 3.2,
  yearlyReturn: 15.48,
}

// Portfolio Breakdown by Category
export const mockPortfolioBreakdown: PortfolioBreakdownItem[] = [
  {
    category: 'Technology',
    value: 15000000,
    percentage: 35.71,
    count: 12,
    averageROI: 18.5,
    color: '#3b82f6',
  },
  {
    category: 'Agriculture',
    value: 10500000,
    percentage: 25,
    count: 8,
    averageROI: 14.2,
    color: '#10b981',
  },
  {
    category: 'Real Estate',
    value: 8400000,
    percentage: 20,
    count: 5,
    averageROI: 11.8,
    color: '#f59e0b',
  },
  {
    category: 'Manufacturing',
    value: 5040000,
    percentage: 12,
    count: 6,
    averageROI: 13.6,
    color: '#8b5cf6',
  },
  {
    category: 'Retail',
    value: 3060000,
    percentage: 7.29,
    count: 4,
    averageROI: 9.8,
    color: '#ec4899',
  },
]

// Investment Trends (Last 12 months)
export const mockInvestmentTrends: InvestmentTrendPoint[] = [
  { date: '2024-11', invested: 28000000, returns: 2100000, netValue: 30100000, roi: 7.5 },
  { date: '2024-12', invested: 30500000, returns: 2800000, netValue: 33300000, roi: 9.18 },
  { date: '2025-01', invested: 32000000, returns: 3200000, netValue: 35200000, roi: 10.0 },
  { date: '2025-02', invested: 34500000, returns: 3600000, netValue: 38100000, roi: 10.43 },
  { date: '2025-03', invested: 36000000, returns: 4100000, netValue: 40100000, roi: 11.39 },
  { date: '2025-04', invested: 37500000, returns: 4500000, netValue: 42000000, roi: 12.0 },
  { date: '2025-05', invested: 39000000, returns: 4900000, netValue: 43900000, roi: 12.56 },
  { date: '2025-06', invested: 40000000, returns: 5200000, netValue: 45200000, roi: 13.0 },
  { date: '2025-07', invested: 40500000, returns: 5500000, netValue: 46000000, roi: 13.58 },
  { date: '2025-08', invested: 41000000, returns: 5900000, netValue: 46900000, roi: 14.39 },
  { date: '2025-09', invested: 41500000, returns: 6200000, netValue: 47700000, roi: 14.94 },
  { date: '2025-10', invested: 42000000, returns: 6500000, netValue: 48500000, roi: 15.48 },
]

// Risk Analysis Metrics
export const mockRiskMetrics: RiskMetric[] = [
  {
    category: 'Diversification',
    score: 8.5,
    maxScore: 10,
    level: 'low',
    description: 'Well diversified across 5 sectors',
  },
  {
    category: 'Vendor Reliability',
    score: 7.8,
    maxScore: 10,
    level: 'low',
    description: 'Strong track record of on-time repayments',
  },
  {
    category: 'Market Volatility',
    score: 6.2,
    maxScore: 10,
    level: 'medium',
    description: 'Moderate exposure to market fluctuations',
  },
  {
    category: 'Liquidity Risk',
    score: 7.0,
    maxScore: 10,
    level: 'low',
    description: 'Good balance of short and long-term investments',
  },
  {
    category: 'Default Risk',
    score: 8.0,
    maxScore: 10,
    level: 'low',
    description: 'Low probability of vendor defaults',
  },
]

// Monthly Comparison (Last 6 months)
export const mockMonthlyComparison: MonthlyComparison[] = [
  { month: 'May', invested: 39000000, returned: 4900000, roi: 12.56 },
  { month: 'Jun', invested: 40000000, returned: 5200000, roi: 13.0 },
  { month: 'Jul', invested: 40500000, returned: 5500000, roi: 13.58 },
  { month: 'Aug', invested: 41000000, returned: 5900000, roi: 14.39 },
  { month: 'Sep', invested: 41500000, returned: 6200000, roi: 14.94 },
  { month: 'Oct', invested: 42000000, returned: 6500000, roi: 15.48 },
]

// Top Performing Investments
export const mockTopPerformingInvestments: TopPerformingInvestment[] = [
  {
    id: 'INV-001',
    title: 'AI-Powered Logistics Platform',
    vendor: 'TechFlow Solutions',
    invested: 5000000,
    returned: 6250000,
    roi: 25.0,
    duration: 8,
    status: 'completed',
  },
  {
    id: 'INV-002',
    title: 'Organic Farming Expansion',
    vendor: 'GreenHarvest Farms',
    invested: 3500000,
    returned: 4270000,
    roi: 22.0,
    duration: 10,
    status: 'completed',
  },
  {
    id: 'INV-003',
    title: 'E-commerce Infrastructure',
    vendor: 'Digital Retail Hub',
    invested: 4200000,
    returned: 5082000,
    roi: 21.0,
    duration: 6,
    status: 'active',
  },
  {
    id: 'INV-004',
    title: 'Manufacturing Equipment Upgrade',
    vendor: 'Industrial Motors Ltd',
    invested: 6000000,
    returned: 7140000,
    roi: 19.0,
    duration: 12,
    status: 'active',
  },
  {
    id: 'INV-005',
    title: 'Smart Warehouse System',
    vendor: 'LogiTech Systems',
    invested: 3800000,
    returned: 4446000,
    roi: 17.0,
    duration: 9,
    status: 'completed',
  },
]

// Investment Distribution by Amount
export const mockInvestmentDistribution: InvestmentDistribution[] = [
  { range: '₦0 - ₦1M', count: 8, totalAmount: 4500000, percentage: 10.71 },
  { range: '₦1M - ₦3M', count: 12, totalAmount: 24000000, percentage: 57.14 },
  { range: '₦3M - ₦5M', count: 6, totalAmount: 22500000, percentage: 53.57 },
  { range: '₦5M+', count: 9, totalAmount: 49000000, percentage: 116.67 },
]

// Calculate summary statistics
export const calculateAnalyticsSummary = () => {
  const totalInvestments = mockTopPerformingInvestments.length
  const activeInvestments = mockTopPerformingInvestments.filter(
    (inv) => inv.status === 'active'
  ).length
  const completedInvestments = mockTopPerformingInvestments.filter(
    (inv) => inv.status === 'completed'
  ).length

  const totalInvested = mockTopPerformingInvestments.reduce(
    (sum, inv) => sum + inv.invested,
    0
  )
  const totalReturned = mockTopPerformingInvestments.reduce(
    (sum, inv) => sum + inv.returned,
    0
  )
  const averageROI =
    mockTopPerformingInvestments.reduce((sum, inv) => sum + inv.roi, 0) /
    totalInvestments

  const averageDuration =
    mockTopPerformingInvestments.reduce((sum, inv) => sum + inv.duration, 0) /
    totalInvestments

  return {
    totalInvestments,
    activeInvestments,
    completedInvestments,
    totalInvested,
    totalReturned,
    averageROI,
    averageDuration,
    successRate: (completedInvestments / totalInvestments) * 100,
  }
}

// Get trend direction for a metric
export const getTrendDirection = (
  data: InvestmentTrendPoint[],
  metric: keyof InvestmentTrendPoint
): 'up' | 'down' | 'stable' => {
  if (data.length < 2) return 'stable'

  const recent = data.slice(-3)
  const values = recent.map((point) => point[metric] as number)

  const increasing = values.every((val, idx) => idx === 0 || val >= values[idx - 1])
  const decreasing = values.every((val, idx) => idx === 0 || val <= values[idx - 1])

  if (increasing) return 'up'
  if (decreasing) return 'down'
  return 'stable'
}

// Calculate growth rate between two periods
export const calculateGrowthRate = (current: number, previous: number): number => {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}

// Get risk level color
export const getRiskLevelColor = (level: 'low' | 'medium' | 'high'): string => {
  switch (level) {
    case 'low':
      return 'text-green-600'
    case 'medium':
      return 'text-amber-600'
    case 'high':
      return 'text-red-600'
  }
}
