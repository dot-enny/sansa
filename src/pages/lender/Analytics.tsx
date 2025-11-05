// Analytics Page - Comprehensive analytics and insights for lenders

import { useState } from 'react'
import { Download, FileText, TrendingUp, PieChart, Award, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAnalytics } from '@/hooks/lender/useAnalytics'
import PerformanceOverview from '@/components/organisms/lender/analytics/PerformanceOverview'
import PortfolioBreakdown from '@/components/organisms/lender/analytics/PortfolioBreakdown'
import InvestmentTrends from '@/components/organisms/lender/analytics/InvestmentTrends'
import RiskAnalysis from '@/components/organisms/lender/analytics/RiskAnalysis'
import TopPerformers from '@/components/organisms/lender/analytics/TopPerformers'
import MonthlyComparisonChart from '@/components/organisms/lender/analytics/MonthlyComparisonChart'

type TabType = 'overview' | 'portfolio' | 'performance' | 'risk'

export default function Analytics() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  
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

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: TrendingUp },
    { id: 'portfolio' as TabType, label: 'Portfolio', icon: PieChart },
    { id: 'performance' as TabType, label: 'Performance', icon: Award },
    { id: 'risk' as TabType, label: 'Risk Analysis', icon: Shield },
  ]

  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden bg-background">
      {/* Ambient backgrounds */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative h-full flex flex-col max-w-[1600px] mx-auto">
        {/* Compact Header */}
        <div className="shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-6 pb-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Analytics & Insights</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Comprehensive portfolio analysis
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={openExportDialog}
              className="h-9 px-4 bg-card/60 backdrop-blur-xl border-white/60 hover:bg-card/80"
            >
              <Download className="w-3.5 h-3.5 sm:mr-2" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button
              variant="default"
              size="sm"
              className="h-9 px-4 bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20"
            >
              <FileText className="w-3.5 h-3.5 sm:mr-2" />
              <span className="hidden sm:inline">PDF</span>
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="shrink-0 px-4 sm:px-6 mt-4">
          <div className="flex items-center gap-1 bg-card/40 backdrop-blur-xl rounded-xl p-1 border border-white/40 overflow-x-auto custom-scrollbar-minimal">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 custom-scrollbar">
          {activeTab === 'overview' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Performance Overview */}
              <PerformanceOverview metrics={performanceMetrics} />

              {/* Investment Trends */}
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

              {/* Split view on larger screens */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                <PortfolioBreakdown data={portfolioBreakdown} />
                <MonthlyComparisonChart data={monthlyComparison} />
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              <PortfolioBreakdown data={portfolioBreakdown} />
              <div className="space-y-4 sm:space-y-6">
                <MonthlyComparisonChart data={monthlyComparison} />
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-4 sm:space-y-6">
              <TopPerformers investments={topPerformingInvestments} />
              <MonthlyComparisonChart data={monthlyComparison} />
            </div>
          )}

          {activeTab === 'risk' && (
            <div className="max-w-5xl mx-auto">
              <RiskAnalysis metrics={riskMetrics} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
