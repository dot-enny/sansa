// Analytics Page - Comprehensive analytics and insights for lenders

import { Download, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAnalytics } from '@/hooks/lender/useAnalytics'
import PerformanceOverview from '@/components/organisms/lender/analytics/PerformanceOverview'
import PortfolioBreakdown from '@/components/organisms/lender/analytics/PortfolioBreakdown'
import InvestmentTrends from '@/components/organisms/lender/analytics/InvestmentTrends'
import RiskAnalysis from '@/components/organisms/lender/analytics/RiskAnalysis'
import TopPerformers from '@/components/organisms/lender/analytics/TopPerformers'
import MonthlyComparisonChart from '@/components/organisms/lender/analytics/MonthlyComparisonChart'

export default function Analytics() {
  const {
    performanceMetrics,
    portfolioBreakdown,
    riskMetrics,
    monthlyComparison,
    topPerformingInvestments,
    chartData,
    dateRange,
    handleDateRangeChange,
    showNetValue,
    showInvested,
    showReturns,
    toggleNetValue,
    toggleInvested,
    toggleReturns,
    openExportDialog,
  } = useAnalytics()

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient backgrounds */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1600px] mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics & Insights</h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive analysis of your investment portfolio
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={openExportDialog}
              className="h-12 px-6 bg-card/60 backdrop-blur-xl border-white/60 hover:bg-card/80"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button
              variant="default"
              className="h-12 px-6 bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20"
            >
              <FileText className="w-4 h-4 mr-2" />
              Generate PDF
            </Button>
          </div>
        </div>

        {/* Performance Overview */}
        <PerformanceOverview metrics={performanceMetrics} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Investment Trends Chart */}
            <InvestmentTrends
              data={chartData as any}
              dateRange={dateRange}
              onDateRangeChange={handleDateRangeChange}
              showNetValue={showNetValue}
              showInvested={showInvested}
              showReturns={showReturns}
              onToggleNetValue={toggleNetValue}
              onToggleInvested={toggleInvested}
              onToggleReturns={toggleReturns}
            />

            {/* Monthly Comparison Chart */}
            <MonthlyComparisonChart data={monthlyComparison} />

            {/* Top Performers */}
            <TopPerformers investments={topPerformingInvestments} />
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Portfolio Breakdown */}
            <PortfolioBreakdown data={portfolioBreakdown} />

            {/* Risk Analysis */}
            <RiskAnalysis metrics={riskMetrics} />
          </div>
        </div>
      </div>
    </div>
  )
}
