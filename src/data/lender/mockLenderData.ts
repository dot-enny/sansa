// Lender Dashboard Data Types

export interface Investment {
  id: string
  vendorName: string
  amount: number
  apr: number
  startDate: string
  endDate: string
  status: 'on-time' | 'late' | 'at-risk' | 'in-default' | 'completed'
  daysOverdue?: number
  nextPaymentDate: string
  totalReturns: number
}

export interface PortfolioHealth {
  onTime: number
  late: number
  atRisk: number
  inDefault: number
}

export interface LenderKPIs {
  totalCapitalDeployed: number
  totalReturns: number
  averageAPR: number
  availableCapital: number
  portfolioHealth: PortfolioHealth
}

export interface LenderInfo {
  name: string
  email: string
  joinDate: string
  totalInvestments: number
  avatar?: string
}

// Mock Lender Data
export const mockLenderInfo: LenderInfo = {
  name: 'Alex Thompson',
  email: 'alex.thompson@example.com',
  joinDate: '2024-01-15',
  totalInvestments: 12,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
}

// Mock Investments
export const mockInvestments: Investment[] = [
  {
    id: 'INV-001',
    vendorName: 'TechHub Electronics',
    amount: 50000,
    apr: 18.5,
    startDate: '2024-10-01',
    endDate: '2025-04-01',
    status: 'on-time',
    nextPaymentDate: '2025-01-01',
    totalReturns: 4625,
  },
  {
    id: 'INV-002',
    vendorName: 'Fashion Forward',
    amount: 30000,
    apr: 16.0,
    startDate: '2024-09-15',
    endDate: '2025-03-15',
    status: 'on-time',
    nextPaymentDate: '2024-12-15',
    totalReturns: 2400,
  },
  {
    id: 'INV-003',
    vendorName: 'Home Essentials Ltd',
    amount: 25000,
    apr: 20.0,
    startDate: '2024-08-01',
    endDate: '2025-02-01',
    status: 'late',
    daysOverdue: 15,
    nextPaymentDate: '2024-11-15',
    totalReturns: 2500,
  },
  {
    id: 'INV-004',
    vendorName: 'Gadget World',
    amount: 40000,
    apr: 17.5,
    startDate: '2024-07-10',
    endDate: '2025-01-10',
    status: 'on-time',
    nextPaymentDate: '2024-12-10',
    totalReturns: 3500,
  },
  {
    id: 'INV-005',
    vendorName: 'Sports Arena',
    amount: 20000,
    apr: 15.0,
    startDate: '2024-06-20',
    endDate: '2024-12-20',
    status: 'at-risk',
    daysOverdue: 35,
    nextPaymentDate: '2024-10-20',
    totalReturns: 1500,
  },
  {
    id: 'INV-006',
    vendorName: 'Books & More',
    amount: 15000,
    apr: 22.0,
    startDate: '2024-05-01',
    endDate: '2024-11-01',
    status: 'in-default',
    daysOverdue: 60,
    nextPaymentDate: '2024-09-01',
    totalReturns: 1650,
  },
  {
    id: 'INV-007',
    vendorName: 'Beauty Hub',
    amount: 35000,
    apr: 19.0,
    startDate: '2024-09-01',
    endDate: '2025-03-01',
    status: 'on-time',
    nextPaymentDate: '2024-12-01',
    totalReturns: 3325,
  },
]

// Calculate KPIs from investments
export const calculateLenderKPIs = (investments: Investment[]): LenderKPIs => {
  const activeInvestments = investments.filter((inv) => inv.status !== 'completed')

  const totalCapitalDeployed = activeInvestments.reduce((sum, inv) => sum + inv.amount, 0)
  const totalReturns = investments.reduce((sum, inv) => sum + inv.totalReturns, 0)
  const averageAPR = activeInvestments.length > 0
    ? activeInvestments.reduce((sum, inv) => sum + inv.apr, 0) / activeInvestments.length
    : 0

  const portfolioHealth: PortfolioHealth = {
    onTime: activeInvestments.filter((inv) => inv.status === 'on-time').length,
    late: activeInvestments.filter((inv) => inv.status === 'late').length,
    atRisk: activeInvestments.filter((inv) => inv.status === 'at-risk').length,
    inDefault: activeInvestments.filter((inv) => inv.status === 'in-default').length,
  }

  return {
    totalCapitalDeployed,
    totalReturns,
    averageAPR,
    availableCapital: 75000, // Mock available capital
    portfolioHealth,
  }
}

export const mockLenderKPIs = calculateLenderKPIs(mockInvestments)
