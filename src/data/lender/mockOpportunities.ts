// Mock data for marketplace opportunities - vendors seeking funding

export type UseOfFunds = 
  | 'inventory'
  | 'marketing'
  | 'equipment'
  | 'expansion'
  | 'working-capital'
  | 'technology'
  | 'staffing'
  | 'other'

export type OpportunityStatus = 'available' | 'partially-funded' | 'fully-funded' | 'expired'

export type VendorCategory = 
  | 'fashion'
  | 'electronics'
  | 'home-garden'
  | 'beauty-health'
  | 'food-beverage'
  | 'sports-outdoors'
  | 'toys-games'
  | 'books-media'
  | 'automotive'
  | 'other'

export interface Opportunity {
  id: string
  vendorId: string
  vendorName: string
  vendorLogo?: string
  category: VendorCategory
  merchantStrengthScore: number // 300-900 (similar to credit score)
  
  // Funding Request Details
  requestedAmount: number
  fundedAmount: number
  minInvestment: number
  maxInvestment: number
  term: number // months
  apr: number // annual percentage rate
  useOfFunds: UseOfFunds
  
  // Vendor Info
  timeOnPlatform: number // months
  totalRevenue: number // last 12 months
  monthlyRevenue: number // average
  orderVolume: number // last 30 days
  successfulLoans: number // previously repaid
  
  // Dates
  listedDate: string
  expiryDate: string
  
  status: OpportunityStatus
  description: string
  businessPlan?: string
  
  // Risk Indicators
  riskLevel: 'low' | 'medium' | 'high'
  defaultProbability: number // 0-100
  
  // Platform metrics
  viewCount: number
  interestedInvestors: number
}

export interface AutoInvestRule {
  id: string
  name: string
  isActive: boolean
  
  // Investment criteria
  maxInvestmentPerVendor: number
  minMerchantScore: number
  maxMerchantScore?: number
  minLoanAmount?: number
  maxLoanAmount?: number
  preferredTerms: number[] // [3, 6, 12]
  preferredUseOfFunds: UseOfFunds[]
  preferredCategories: VendorCategory[]
  minTimeOnPlatform?: number // months
  maxRiskLevel: 'low' | 'medium' | 'high'
  
  // Safety limits
  requireMinAvailableCapital: number
  maxDailyInvestments?: number
  maxMonthlyInvestments?: number
  
  // Stats
  totalInvested: number
  investmentCount: number
  createdDate: string
  lastTriggered?: string
}

export interface MarketplaceStats {
  totalOpportunities: number
  availableCapital: number // from lender's wallet
  totalRequested: number
  averageScore: number
  newToday: number
  expiringThisWeek: number
}

// Mock opportunities data
export const mockOpportunities: Opportunity[] = [
  {
    id: 'OPP001',
    vendorId: 'VEN001',
    vendorName: 'StyleHub Fashion',
    category: 'fashion',
    merchantStrengthScore: 850,
    requestedAmount: 15000,
    fundedAmount: 8000,
    minInvestment: 500,
    maxInvestment: 5000,
    term: 6,
    apr: 12.5,
    useOfFunds: 'inventory',
    timeOnPlatform: 18,
    totalRevenue: 240000,
    monthlyRevenue: 20000,
    orderVolume: 156,
    successfulLoans: 3,
    listedDate: '2025-11-05',
    expiryDate: '2025-11-19',
    status: 'partially-funded',
    description: 'Seeking capital to purchase spring collection inventory from verified suppliers. Expected 200% ROI based on historical data.',
    riskLevel: 'low',
    defaultProbability: 8,
    viewCount: 234,
    interestedInvestors: 12,
  },
  {
    id: 'OPP002',
    vendorId: 'VEN002',
    vendorName: 'TechGear Pro',
    category: 'electronics',
    merchantStrengthScore: 780,
    requestedAmount: 25000,
    fundedAmount: 0,
    minInvestment: 1000,
    maxInvestment: 10000,
    term: 12,
    apr: 14.0,
    useOfFunds: 'expansion',
    timeOnPlatform: 24,
    totalRevenue: 480000,
    monthlyRevenue: 40000,
    orderVolume: 89,
    successfulLoans: 5,
    listedDate: '2025-11-06',
    expiryDate: '2025-11-20',
    status: 'available',
    description: 'Expanding to new product categories including smart home devices. Strong existing customer base and proven track record.',
    riskLevel: 'low',
    defaultProbability: 12,
    viewCount: 178,
    interestedInvestors: 8,
  },
  {
    id: 'OPP003',
    vendorId: 'VEN003',
    vendorName: 'GreenLife Organics',
    category: 'food-beverage',
    merchantStrengthScore: 820,
    requestedAmount: 8000,
    fundedAmount: 8000,
    minInvestment: 500,
    maxInvestment: 3000,
    term: 3,
    apr: 10.5,
    useOfFunds: 'marketing',
    timeOnPlatform: 14,
    totalRevenue: 156000,
    monthlyRevenue: 13000,
    orderVolume: 212,
    successfulLoans: 2,
    listedDate: '2025-11-01',
    expiryDate: '2025-11-15',
    status: 'fully-funded',
    description: 'Marketing campaign for holiday season. Proven 5x ROAS on previous campaigns.',
    riskLevel: 'low',
    defaultProbability: 6,
    viewCount: 312,
    interestedInvestors: 18,
  },
  {
    id: 'OPP004',
    vendorId: 'VEN004',
    vendorName: 'FitZone Equipment',
    category: 'sports-outdoors',
    merchantStrengthScore: 720,
    requestedAmount: 12000,
    fundedAmount: 0,
    minInvestment: 500,
    maxInvestment: 4000,
    term: 6,
    apr: 15.5,
    useOfFunds: 'equipment',
    timeOnPlatform: 9,
    totalRevenue: 96000,
    monthlyRevenue: 8000,
    orderVolume: 67,
    successfulLoans: 1,
    listedDate: '2025-11-07',
    expiryDate: '2025-11-21',
    status: 'available',
    description: 'Purchasing warehouse automation equipment to increase fulfillment speed by 40%.',
    riskLevel: 'medium',
    defaultProbability: 18,
    viewCount: 89,
    interestedInvestors: 4,
  },
  {
    id: 'OPP005',
    vendorId: 'VEN005',
    vendorName: 'HomeDecor Plus',
    category: 'home-garden',
    merchantStrengthScore: 860,
    requestedAmount: 20000,
    fundedAmount: 5000,
    minInvestment: 1000,
    maxInvestment: 8000,
    term: 9,
    apr: 13.0,
    useOfFunds: 'inventory',
    timeOnPlatform: 30,
    totalRevenue: 360000,
    monthlyRevenue: 30000,
    orderVolume: 178,
    successfulLoans: 6,
    listedDate: '2025-11-04',
    expiryDate: '2025-11-18',
    status: 'partially-funded',
    description: 'Stocking up for Q4 holiday season. Historical data shows 300% revenue increase during holidays.',
    riskLevel: 'low',
    defaultProbability: 5,
    viewCount: 267,
    interestedInvestors: 15,
  },
  {
    id: 'OPP006',
    vendorId: 'VEN006',
    vendorName: 'BeautyBliss Cosmetics',
    category: 'beauty-health',
    merchantStrengthScore: 790,
    requestedAmount: 10000,
    fundedAmount: 0,
    minInvestment: 500,
    maxInvestment: 3000,
    term: 6,
    apr: 13.5,
    useOfFunds: 'marketing',
    timeOnPlatform: 16,
    totalRevenue: 180000,
    monthlyRevenue: 15000,
    orderVolume: 134,
    successfulLoans: 3,
    listedDate: '2025-11-08',
    expiryDate: '2025-11-22',
    status: 'available',
    description: 'Influencer marketing campaign targeting Gen Z audience. 80% repeat customer rate.',
    riskLevel: 'low',
    defaultProbability: 10,
    viewCount: 145,
    interestedInvestors: 9,
  },
  {
    id: 'OPP007',
    vendorId: 'VEN007',
    vendorName: 'KidsWorld Toys',
    category: 'toys-games',
    merchantStrengthScore: 680,
    requestedAmount: 7000,
    fundedAmount: 0,
    minInvestment: 500,
    maxInvestment: 2000,
    term: 3,
    apr: 16.0,
    useOfFunds: 'inventory',
    timeOnPlatform: 6,
    totalRevenue: 48000,
    monthlyRevenue: 4000,
    orderVolume: 45,
    successfulLoans: 0,
    listedDate: '2025-11-08',
    expiryDate: '2025-11-15',
    status: 'available',
    description: 'First-time funding request for holiday toy inventory. Strong pre-orders indicate high demand.',
    riskLevel: 'medium',
    defaultProbability: 22,
    viewCount: 56,
    interestedInvestors: 3,
  },
  {
    id: 'OPP008',
    vendorId: 'VEN008',
    vendorName: 'AutoParts Direct',
    category: 'automotive',
    merchantStrengthScore: 810,
    requestedAmount: 18000,
    fundedAmount: 12000,
    minInvestment: 1000,
    maxInvestment: 6000,
    term: 12,
    apr: 12.0,
    useOfFunds: 'expansion',
    timeOnPlatform: 22,
    totalRevenue: 288000,
    monthlyRevenue: 24000,
    orderVolume: 98,
    successfulLoans: 4,
    listedDate: '2025-11-03',
    expiryDate: '2025-11-17',
    status: 'partially-funded',
    description: 'Expanding to commercial fleet parts. Secured contracts with 3 major logistics companies.',
    riskLevel: 'low',
    defaultProbability: 9,
    viewCount: 198,
    interestedInvestors: 11,
  },
  {
    id: 'OPP009',
    vendorId: 'VEN009',
    vendorName: 'BookHaven',
    category: 'books-media',
    merchantStrengthScore: 750,
    requestedAmount: 6000,
    fundedAmount: 0,
    minInvestment: 500,
    maxInvestment: 2000,
    term: 6,
    apr: 14.5,
    useOfFunds: 'technology',
    timeOnPlatform: 12,
    totalRevenue: 84000,
    monthlyRevenue: 7000,
    orderVolume: 156,
    successfulLoans: 2,
    listedDate: '2025-11-07',
    expiryDate: '2025-11-21',
    status: 'available',
    description: 'Implementing AI-powered recommendation engine. Expected to increase average order value by 35%.',
    riskLevel: 'medium',
    defaultProbability: 15,
    viewCount: 78,
    interestedInvestors: 5,
  },
  {
    id: 'OPP010',
    vendorId: 'VEN010',
    vendorName: 'EcoHome Solutions',
    category: 'home-garden',
    merchantStrengthScore: 840,
    requestedAmount: 14000,
    fundedAmount: 0,
    minInvestment: 1000,
    maxInvestment: 5000,
    term: 9,
    apr: 11.5,
    useOfFunds: 'working-capital',
    timeOnPlatform: 20,
    totalRevenue: 216000,
    monthlyRevenue: 18000,
    orderVolume: 123,
    successfulLoans: 4,
    listedDate: '2025-11-08',
    expiryDate: '2025-11-22',
    status: 'available',
    description: 'Bridge financing for large B2B order fulfillment. 60-day payment terms from client.',
    riskLevel: 'low',
    defaultProbability: 7,
    viewCount: 201,
    interestedInvestors: 10,
  },
]

// Mock auto-invest rules
export const mockAutoInvestRules: AutoInvestRule[] = [
  {
    id: 'RULE001',
    name: 'High Quality Vendors',
    isActive: true,
    maxInvestmentPerVendor: 1000,
    minMerchantScore: 850,
    preferredTerms: [6, 9],
    preferredUseOfFunds: ['inventory', 'marketing'],
    preferredCategories: ['fashion', 'electronics', 'home-garden'],
    minTimeOnPlatform: 12,
    maxRiskLevel: 'low',
    requireMinAvailableCapital: 10000,
    maxDailyInvestments: 3,
    totalInvested: 8500,
    investmentCount: 9,
    createdDate: '2025-09-15',
    lastTriggered: '2025-11-06',
  },
  {
    id: 'RULE002',
    name: 'Quick Returns',
    isActive: true,
    maxInvestmentPerVendor: 500,
    minMerchantScore: 800,
    preferredTerms: [3],
    preferredUseOfFunds: ['marketing', 'working-capital'],
    preferredCategories: [],
    maxRiskLevel: 'medium',
    requireMinAvailableCapital: 5000,
    maxMonthlyInvestments: 20,
    totalInvested: 3200,
    investmentCount: 7,
    createdDate: '2025-10-01',
    lastTriggered: '2025-11-05',
  },
]

// Helper functions
export const getOpportunitiesByStatus = (status: OpportunityStatus): Opportunity[] => {
  return mockOpportunities.filter(opp => opp.status === status)
}

export const getOpportunitiesByCategory = (category: VendorCategory): Opportunity[] => {
  return mockOpportunities.filter(opp => opp.category === category)
}

export const getOpportunitiesByScoreRange = (min: number, max: number): Opportunity[] => {
  return mockOpportunities.filter(opp => opp.merchantStrengthScore >= min && opp.merchantStrengthScore <= max)
}

export const getOpportunitiesByUseOfFunds = (useOfFunds: UseOfFunds): Opportunity[] => {
  return mockOpportunities.filter(opp => opp.useOfFunds === useOfFunds)
}

export const calculateFundingPercentage = (opp: Opportunity): number => {
  return (opp.fundedAmount / opp.requestedAmount) * 100
}

export const getRemainingAmount = (opp: Opportunity): number => {
  return opp.requestedAmount - opp.fundedAmount
}

export const isExpiringSoon = (opp: Opportunity): boolean => {
  const expiryDate = new Date(opp.expiryDate)
  const today = new Date()
  const daysUntilExpiry = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  return daysUntilExpiry <= 3
}

export const getMarketplaceStats = (opportunities: Opportunity[], availableCapital: number): MarketplaceStats => {
  const today = new Date().toISOString().split('T')[0]
  
  return {
    totalOpportunities: opportunities.length,
    availableCapital,
    totalRequested: opportunities.reduce((sum, opp) => sum + getRemainingAmount(opp), 0),
    averageScore: Math.round(opportunities.reduce((sum, opp) => sum + opp.merchantStrengthScore, 0) / opportunities.length),
    newToday: opportunities.filter(opp => opp.listedDate === today).length,
    expiringThisWeek: opportunities.filter(opp => isExpiringSoon(opp)).length,
  }
}

export const matchesAutoInvestRule = (opportunity: Opportunity, rule: AutoInvestRule): boolean => {
  // Check if opportunity matches all criteria
  if (opportunity.merchantStrengthScore < rule.minMerchantScore) return false
  if (rule.maxMerchantScore && opportunity.merchantStrengthScore > rule.maxMerchantScore) return false
  if (rule.minLoanAmount && opportunity.requestedAmount < rule.minLoanAmount) return false
  if (rule.maxLoanAmount && opportunity.requestedAmount > rule.maxLoanAmount) return false
  if (!rule.preferredTerms.includes(opportunity.term)) return false
  if (rule.preferredUseOfFunds.length > 0 && !rule.preferredUseOfFunds.includes(opportunity.useOfFunds)) return false
  if (rule.preferredCategories.length > 0 && !rule.preferredCategories.includes(opportunity.category)) return false
  if (rule.minTimeOnPlatform && opportunity.timeOnPlatform < rule.minTimeOnPlatform) return false
  
  // Check risk level
  const riskLevels = ['low', 'medium', 'high']
  const maxRiskIndex = riskLevels.indexOf(rule.maxRiskLevel)
  const oppRiskIndex = riskLevels.indexOf(opportunity.riskLevel)
  if (oppRiskIndex > maxRiskIndex) return false
  
  return true
}
