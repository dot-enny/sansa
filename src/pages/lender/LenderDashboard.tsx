import React from 'react'
import { useLenderDashboard } from '@/hooks/lender/useLenderDashboard'
import { mockInvestments, mockLenderInfo } from '@/data/lender/mockLenderData'
import { Header } from '@/components/organisms/lender/dashboard/Header'
import { KPICards } from '@/components/organisms/lender/dashboard/KPICards'
import { PortfolioHealthChart } from '@/components/organisms/lender/dashboard/PortfolioHealthChart'

const LenderDashboard: React.FC = () => {
  const { kpis, totalPortfolioCount, portfolioHealthPercentages } =
    useLenderDashboard(mockInvestments)

  return (
    <div className="relative max-w-7xl mx-auto pb-12">
      {/* Enhanced ambient background layers for depth */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
        <div
          className="absolute top-[10%] right-[15%] w-[600px] h-[600px] bg-linear-to-br from-primary/8 to-transparent rounded-full blur-[150px] animate-pulse"
          style={{ animationDuration: '12s' }}
        />
        <div
          className="absolute bottom-[15%] left-[10%] w-[500px] h-[500px] bg-linear-to-tr from-secondary/6 to-transparent rounded-full blur-[130px] animate-pulse"
          style={{ animationDuration: '9s', animationDelay: '2s' }}
        />
        <div
          className="absolute top-[50%] left-[50%] w-[400px] h-[400px] bg-linear-to-bl from-primary/4 to-transparent rounded-full blur-[100px] animate-pulse"
          style={{ animationDuration: '15s', animationDelay: '5s' }}
        />
      </div>

      <Header lenderInfo={mockLenderInfo} />

      <KPICards kpis={kpis} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PortfolioHealthChart
            portfolioHealth={kpis.portfolioHealth}
            totalCount={totalPortfolioCount}
            percentages={portfolioHealthPercentages}
          />
        </div>

        {/* Placeholder for additional charts or recent activity */}
        <div className="relative p-6 rounded-xl bg-card/40 backdrop-blur-md border border-border/40">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Recent Activity
          </h3>
          <p className="text-sm text-muted-foreground">Coming soon...</p>
        </div>
      </div>
    </div>
  )
}

export default LenderDashboard
