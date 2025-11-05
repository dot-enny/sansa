// Performance Overview Component - Key metrics cards

import { TrendingUp, DollarSign, Percent, Calendar } from 'lucide-react'
import type { PerformanceMetrics } from '@/data/lender/mockAnalyticsData'
import { formatCurrency, formatPercentage, getROIColor } from '@/utils/analyticsUtils'

interface PerformanceOverviewProps {
  metrics: PerformanceMetrics
}

export default function PerformanceOverview({ metrics }: PerformanceOverviewProps) {
  const cards = [
    {
      title: 'Total Invested',
      value: formatCurrency(metrics.totalInvested),
      icon: DollarSign,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600',
      shadow: 'shadow-blue-500/20',
    },
    {
      title: 'Current Value',
      value: formatCurrency(metrics.currentValue),
      icon: TrendingUp,
      color: 'green',
      gradient: 'from-green-500 to-green-600',
      shadow: 'shadow-green-500/20',
    },
    {
      title: 'Total Returns',
      value: formatCurrency(metrics.totalReturns),
      icon: TrendingUp,
      color: 'emerald',
      gradient: 'from-emerald-500 to-emerald-600',
      shadow: 'shadow-emerald-500/20',
    },
    {
      title: 'ROI',
      value: formatPercentage(metrics.roi),
      icon: Percent,
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600',
      shadow: 'shadow-purple-500/20',
    },
  ]

  return (
    <div className="space-y-3">
      {/* Main KPIs - More compact */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((card, index) => {
          const Icon = card.icon
          return (
            <div
              key={index}
              className="group relative bg-card/60 backdrop-blur-xl rounded-xl p-4 border border-white/60 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${card.gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}
              />

              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs text-muted-foreground">{card.title}</span>
                  <div
                    className={`w-8 h-8 rounded-lg bg-linear-to-br ${card.gradient} flex items-center justify-center shadow-lg ${card.shadow}`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </div>

                <p className="text-xl font-bold">{card.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Additional metrics - More compact */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-card/60 backdrop-blur-xl rounded-xl p-4 border border-white/60 shadow-lg shadow-black/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Percent className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Average ROI</p>
              <p className={`text-lg font-bold ${getROIColor(metrics.averageROI)}`}>
                {formatPercentage(metrics.averageROI)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card/60 backdrop-blur-xl rounded-xl p-4 border border-white/60 shadow-lg shadow-black/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Monthly Return</p>
              <p className={`text-lg font-bold ${getROIColor(metrics.monthlyReturn)}`}>
                +{formatPercentage(metrics.monthlyReturn)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card/60 backdrop-blur-xl rounded-xl p-4 border border-white/60 shadow-lg shadow-black/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Yearly Return</p>
              <p className={`text-lg font-bold ${getROIColor(metrics.yearlyReturn)}`}>
                +{formatPercentage(metrics.yearlyReturn)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
