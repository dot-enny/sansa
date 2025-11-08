// MarketplaceStats - Display key marketplace statistics

import { TrendingUp, DollarSign, BarChart3, Clock, AlertCircle } from 'lucide-react'
import { formatCurrency } from '@/utils/lender/opportunitiesUtils'
import type { MarketplaceStats } from '@/data/lender/mockOpportunities'

interface MarketplaceStatsProps {
  stats: MarketplaceStats
}

export default function MarketplaceStats({ stats }: MarketplaceStatsProps) {
  const statCards = [
    {
      label: 'Available Opportunities',
      value: stats.totalOpportunities,
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-600',
    },
    {
      label: 'Your Available Capital',
      value: formatCurrency(stats.availableCapital),
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-600',
    },
    {
      label: 'Total Requested',
      value: formatCurrency(stats.totalRequested),
      icon: BarChart3,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-600',
    },
    {
      label: 'Avg. Merchant Score',
      value: stats.averageScore,
      icon: BarChart3,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-500/10',
      textColor: 'text-amber-600',
    },
    {
      label: 'New Today',
      value: stats.newToday,
      icon: Clock,
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-500/10',
      textColor: 'text-cyan-600',
    },
    {
      label: 'Expiring This Week',
      value: stats.expiringThisWeek,
      icon: AlertCircle,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-500/10',
      textColor: 'text-red-600',
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {statCards.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className="group relative p-3 rounded-xl bg-card/60 backdrop-blur-xl border border-border/60 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-2">
              <div className={`w-8 h-8 rounded-lg bg-linear-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className={`text-lg font-bold ${stat.textColor} mb-0.5`}>
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground leading-tight">
              {stat.label}
            </div>
          </div>
        )
      })}
    </div>
  )
}
