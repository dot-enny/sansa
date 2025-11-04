import type { Investment, PortfolioHealth } from '@/data/lender/mockLenderData'

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount)
}

export const formatAPR = (apr: number): string => {
  return `${apr.toFixed(1)}%`
}

export const getInvestmentStatusColor = (status: Investment['status']): string => {
  const colors = {
    'on-time': 'text-green-600 bg-green-500/10 border-green-500/20',
    late: 'text-amber-600 bg-amber-500/10 border-amber-500/20',
    'at-risk': 'text-orange-600 bg-orange-500/10 border-orange-500/20',
    'in-default': 'text-red-600 bg-red-500/10 border-red-500/20',
    completed: 'text-blue-600 bg-blue-500/10 border-blue-500/20',
  }
  return colors[status]
}

export const getInvestmentStatusLabel = (status: Investment['status']): string => {
  const labels = {
    'on-time': 'On Time',
    late: 'Late',
    'at-risk': 'At Risk',
    'in-default': 'In Default',
    completed: 'Completed',
  }
  return labels[status]
}

export const getPortfolioHealthColor = (status: keyof PortfolioHealth): string => {
  const colors = {
    onTime: '#10b981', // green-500
    late: '#f59e0b', // amber-500
    atRisk: '#f97316', // orange-500
    inDefault: '#ef4444', // red-500
  }
  return colors[status]
}

export const getPortfolioHealthLabel = (status: keyof PortfolioHealth): string => {
  const labels = {
    onTime: 'On Time',
    late: 'Late (1-30 days)',
    atRisk: 'At Risk (30+ days)',
    inDefault: 'In Default',
  }
  return labels[status]
}

export const calculatePortfolioHealthPercentage = (
  count: number,
  total: number
): number => {
  if (total === 0) return 0
  return (count / total) * 100
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export const getDaysUntilPayment = (paymentDate: string): number => {
  const today = new Date()
  const payment = new Date(paymentDate)
  const diffTime = payment.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}
