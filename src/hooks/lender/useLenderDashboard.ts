import { useState, useMemo } from 'react'
import type { Investment, LenderKPIs } from '@/data/lender/mockLenderData'
import { calculateLenderKPIs } from '@/data/lender/mockLenderData'

export const useLenderDashboard = (initialInvestments: Investment[]) => {
  const [investments] = useState<Investment[]>(initialInvestments)

  // Calculate KPIs from current investments
  const kpis: LenderKPIs = useMemo(() => {
    return calculateLenderKPIs(investments)
  }, [investments])

  // Get active investments count
  const activeInvestmentsCount = useMemo(() => {
    return investments.filter((inv) => inv.status !== 'completed').length
  }, [investments])

  // Get total portfolio health count
  const totalPortfolioCount = useMemo(() => {
    const { onTime, late, atRisk, inDefault } = kpis.portfolioHealth
    return onTime + late + atRisk + inDefault
  }, [kpis.portfolioHealth])

  // Calculate portfolio health percentages
  const portfolioHealthPercentages = useMemo(() => {
    const total = totalPortfolioCount
    if (total === 0) {
      return {
        onTime: 0,
        late: 0,
        atRisk: 0,
        inDefault: 0,
      }
    }
    return {
      onTime: (kpis.portfolioHealth.onTime / total) * 100,
      late: (kpis.portfolioHealth.late / total) * 100,
      atRisk: (kpis.portfolioHealth.atRisk / total) * 100,
      inDefault: (kpis.portfolioHealth.inDefault / total) * 100,
    }
  }, [kpis.portfolioHealth, totalPortfolioCount])

  return {
    investments,
    kpis,
    activeInvestmentsCount,
    totalPortfolioCount,
    portfolioHealthPercentages,
  }
}
