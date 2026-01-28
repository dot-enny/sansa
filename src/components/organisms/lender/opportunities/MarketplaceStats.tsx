// MarketplaceStats - Display key marketplace statistics with hero card layout

import { TrendingUp, DollarSign, BarChart3, Clock, AlertCircle } from 'lucide-react'
import { formatCurrency } from '@/utils/lender/opportunitiesUtils'
import type { MarketplaceStats } from '@/data/lender/mockOpportunities'

interface MarketplaceStatsProps {
  stats: MarketplaceStats
}

export default function MarketplaceStats({ stats }: MarketplaceStatsProps) {
  return (
    <div className="space-y-3">
      {/* Hero Card - Available Capital */}
      <div className="relative p-6 rounded-xl bg-card/60 backdrop-blur-xl border-t-4 border-green-500 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Your Available Capital
              </p>
            </div>
            <div className="flex items-baseline gap-3">
              <p className="text-4xl font-bold text-foreground">
                {formatCurrency(stats.availableCapital)}
              </p>
              <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>Ready to invest</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Secondary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Available Opportunities */}
        <div className="relative p-4 rounded-xl bg-card/60 backdrop-blur-xl border-t-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Available Opps
            </p>
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">
            {stats.totalOpportunities}
          </p>
          <p className="text-xs text-muted-foreground">Active listings</p>
        </div>

        {/* Total Requested */}
        <div className="relative p-4 rounded-xl bg-card/60 backdrop-blur-xl border-t-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-purple-600" />
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Total Requested
            </p>
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">
            {formatCurrency(stats.totalRequested)}
          </p>
          <p className="text-xs text-muted-foreground">Across all vendors</p>
        </div>

        {/* Average Merchant Score */}
        <div className="relative p-4 rounded-xl bg-card/60 backdrop-blur-xl border-t-4 border-amber-500 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-amber-600" />
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Avg. Score
            </p>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-foreground">
              {stats.averageScore}
            </p>
            <div className="flex items-center gap-0.5 text-green-600 text-xs font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>High quality</span>
            </div>
          </div>
        </div>

        {/* New Today */}
        <div className="relative p-4 rounded-xl bg-card/60 backdrop-blur-xl border-t-4 border-cyan-500 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-cyan-600" />
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              New Today
            </p>
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">
            {stats.newToday}
          </p>
          <p className="text-xs text-muted-foreground">Fresh opportunities</p>
        </div>

        {/* Expiring This Week */}
        <div className="relative p-4 rounded-xl bg-card/60 backdrop-blur-xl border-t-4 border-red-500 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Expiring Soon
            </p>
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">
            {stats.expiringThisWeek}
          </p>
          <p className="text-xs text-muted-foreground">Within 7 days</p>
        </div>
      </div>
    </div>
  )
}
