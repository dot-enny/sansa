// Investment data structures and mock data for Lender Investments page

export type InvestmentStatus = 'on-time' | 'late' | 'at-risk' | 'in-default' | 'completed'
export type RiskLevel = 'low' | 'medium' | 'high'

export interface Investment {
  id: string
  vendorId: string
  vendorName: string
  vendorCategory: string
  vendorAvatar?: string
  principalAmount: number
  interestRate: number // APR percentage
  duration: number // in months
  startDate: string
  endDate: string
  status: InvestmentStatus
  riskLevel: RiskLevel
  currentValue: number
  totalReturns: number
  nextPaymentDate: string
  nextPaymentAmount: number
  paymentsReceived: number
  totalPayments: number
  daysOverdue?: number
}

export interface PaymentHistory {
  investmentId: string
  paymentDate: string
  amount: number
  principal: number
  interest: number
  status: 'paid' | 'pending' | 'late'
}

// Mock investment data
export const mockInvestments: Investment[] = [
  {
    id: 'INV-001',
    vendorId: 'V-001',
    vendorName: 'Fashion Hub Nigeria',
    vendorCategory: 'Fashion & Apparel',
    principalAmount: 5000000,
    interestRate: 18.5,
    duration: 12,
    startDate: '2024-06-01',
    endDate: '2025-06-01',
    status: 'on-time',
    riskLevel: 'low',
    currentValue: 5462500,
    totalReturns: 462500,
    nextPaymentDate: '2024-12-01',
    nextPaymentAmount: 455208,
    paymentsReceived: 6,
    totalPayments: 12,
  },
  {
    id: 'INV-002',
    vendorId: 'V-002',
    vendorName: 'TechGear Store',
    vendorCategory: 'Electronics',
    principalAmount: 8000000,
    interestRate: 20.0,
    duration: 18,
    startDate: '2024-04-15',
    endDate: '2025-10-15',
    status: 'on-time',
    riskLevel: 'medium',
    currentValue: 9066667,
    totalReturns: 1066667,
    nextPaymentDate: '2024-12-15',
    nextPaymentAmount: 533333,
    paymentsReceived: 8,
    totalPayments: 18,
  },
  {
    id: 'INV-003',
    vendorId: 'V-003',
    vendorName: 'Home Essentials Co',
    vendorCategory: 'Home & Living',
    principalAmount: 3500000,
    interestRate: 16.0,
    duration: 6,
    startDate: '2024-08-01',
    endDate: '2025-02-01',
    status: 'late',
    riskLevel: 'medium',
    currentValue: 3746667,
    totalReturns: 246667,
    nextPaymentDate: '2024-11-01',
    nextPaymentAmount: 606667,
    paymentsReceived: 3,
    totalPayments: 6,
    daysOverdue: 8,
  },
  {
    id: 'INV-004',
    vendorId: 'V-004',
    vendorName: 'Beauty & Glow',
    vendorCategory: 'Beauty & Personal Care',
    principalAmount: 2000000,
    interestRate: 19.0,
    duration: 12,
    startDate: '2024-05-20',
    endDate: '2025-05-20',
    status: 'on-time',
    riskLevel: 'low',
    currentValue: 2190000,
    totalReturns: 190000,
    nextPaymentDate: '2024-12-20',
    nextPaymentAmount: 182500,
    paymentsReceived: 7,
    totalPayments: 12,
  },
  {
    id: 'INV-005',
    vendorId: 'V-005',
    vendorName: 'Sports Arena',
    vendorCategory: 'Sports & Fitness',
    principalAmount: 6000000,
    interestRate: 22.0,
    duration: 24,
    startDate: '2024-01-10',
    endDate: '2026-01-10',
    status: 'at-risk',
    riskLevel: 'high',
    currentValue: 7320000,
    totalReturns: 1320000,
    nextPaymentDate: '2024-11-10',
    nextPaymentAmount: 305000,
    paymentsReceived: 10,
    totalPayments: 24,
    daysOverdue: 15,
  },
  {
    id: 'INV-006',
    vendorId: 'V-006',
    vendorName: 'Kids World Store',
    vendorCategory: 'Kids & Toys',
    principalAmount: 4500000,
    interestRate: 17.5,
    duration: 12,
    startDate: '2024-03-01',
    endDate: '2025-03-01',
    status: 'completed',
    riskLevel: 'low',
    currentValue: 5287500,
    totalReturns: 787500,
    nextPaymentDate: '2025-03-01',
    nextPaymentAmount: 0,
    paymentsReceived: 12,
    totalPayments: 12,
  },
  {
    id: 'INV-007',
    vendorId: 'V-007',
    vendorName: 'Book Haven',
    vendorCategory: 'Books & Media',
    principalAmount: 1500000,
    interestRate: 15.0,
    duration: 6,
    startDate: '2024-09-01',
    endDate: '2025-03-01',
    status: 'on-time',
    riskLevel: 'low',
    currentValue: 1562500,
    totalReturns: 62500,
    nextPaymentDate: '2024-12-01',
    nextPaymentAmount: 268750,
    paymentsReceived: 3,
    totalPayments: 6,
  },
  {
    id: 'INV-008',
    vendorId: 'V-008',
    vendorName: 'Gadget Plus',
    vendorCategory: 'Electronics',
    principalAmount: 10000000,
    interestRate: 21.0,
    duration: 18,
    startDate: '2024-02-01',
    endDate: '2025-08-01',
    status: 'on-time',
    riskLevel: 'medium',
    currentValue: 11550000,
    totalReturns: 1550000,
    nextPaymentDate: '2024-12-01',
    nextPaymentAmount: 641667,
    paymentsReceived: 10,
    totalPayments: 18,
  },
  {
    id: 'INV-009',
    vendorId: 'V-009',
    vendorName: 'Organic Farms Market',
    vendorCategory: 'Food & Grocery',
    principalAmount: 7500000,
    interestRate: 18.0,
    duration: 12,
    startDate: '2024-07-01',
    endDate: '2025-07-01',
    status: 'late',
    riskLevel: 'medium',
    currentValue: 8025000,
    totalReturns: 525000,
    nextPaymentDate: '2024-11-01',
    nextPaymentAmount: 718750,
    paymentsReceived: 5,
    totalPayments: 12,
    daysOverdue: 5,
  },
  {
    id: 'INV-010',
    vendorId: 'V-010',
    vendorName: 'Pet Paradise',
    vendorCategory: 'Pets & Animals',
    principalAmount: 3000000,
    interestRate: 19.5,
    duration: 12,
    startDate: '2024-06-15',
    endDate: '2025-06-15',
    status: 'on-time',
    riskLevel: 'low',
    currentValue: 3292500,
    totalReturns: 292500,
    nextPaymentDate: '2024-12-15',
    nextPaymentAmount: 273750,
    paymentsReceived: 6,
    totalPayments: 12,
  },
  {
    id: 'INV-011',
    vendorId: 'V-011',
    vendorName: 'Artisan Crafts',
    vendorCategory: 'Arts & Crafts',
    principalAmount: 2500000,
    interestRate: 20.5,
    duration: 6,
    startDate: '2024-03-15',
    endDate: '2024-09-15',
    status: 'completed',
    riskLevel: 'medium',
    currentValue: 2756250,
    totalReturns: 256250,
    nextPaymentDate: '2024-09-15',
    nextPaymentAmount: 0,
    paymentsReceived: 6,
    totalPayments: 6,
  },
  {
    id: 'INV-012',
    vendorId: 'V-012',
    vendorName: 'Auto Parts Direct',
    vendorCategory: 'Automotive',
    principalAmount: 12000000,
    interestRate: 23.0,
    duration: 24,
    startDate: '2023-12-01',
    endDate: '2025-12-01',
    status: 'in-default',
    riskLevel: 'high',
    currentValue: 15180000,
    totalReturns: 3180000,
    nextPaymentDate: '2024-10-01',
    nextPaymentAmount: 632500,
    paymentsReceived: 11,
    totalPayments: 24,
    daysOverdue: 35,
  },
]

// Calculate investment summary metrics
export const calculateInvestmentSummary = (investments: Investment[]) => {
  const totalInvested = investments.reduce((sum, inv) => sum + inv.principalAmount, 0)
  const totalReturns = investments.reduce((sum, inv) => sum + inv.totalReturns, 0)
  const activeInvestments = investments.filter(inv => inv.status !== 'completed').length
  const averageAPR = investments.reduce((sum, inv) => sum + inv.interestRate, 0) / investments.length

  return {
    totalInvested,
    totalReturns,
    activeInvestments,
    averageAPR,
  }
}
