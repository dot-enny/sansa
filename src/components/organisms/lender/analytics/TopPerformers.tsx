// Top Performing Investments Component

import { TrendingUp, Clock, Award } from 'lucide-react'
import type { TopPerformingInvestment } from '@/data/lender/mockAnalyticsData'
import {
  formatCurrency,
  formatPercentage,
  formatDuration,
  getStatusColor,
  getROIColor,
} from '@/utils/analyticsUtils'

interface TopPerformersProps {
  investments: TopPerformingInvestment[]
}

export default function TopPerformers({ investments }: TopPerformersProps) {
  return (
    <div className="bg-card/60 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/60 shadow-lg shadow-black/5">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-linear-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <Award className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-base font-semibold">Top Performing Investments</h3>
      </div>

      <div className="space-y-2.5">
        {investments.map((investment, index) => (
          <div
            key={investment.id}
            className="group p-3 rounded-lg bg-card/40 border border-white/40 hover:bg-card/60 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              {/* Rank badge */}
              <div className="w-7 h-7 rounded-lg bg-linear-to-br from-amber-500 to-amber-600 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
                <span className="text-xs font-bold text-white">#{index + 1}</span>
              </div>

              {/* Investment details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold truncate">{investment.title}</h4>
                    <p className="text-xs text-muted-foreground truncate">
                      {investment.vendor}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full border shrink-0 ${getStatusColor(
                      investment.status
                    )}`}
                  >
                    {investment.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-2">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Invested</p>
                    <p className="text-sm font-medium">{formatCurrency(investment.invested)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Returned</p>
                    <p className="text-sm font-medium text-green-600">
                      {formatCurrency(investment.returned)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      ROI
                    </p>
                    <p className={`text-sm font-bold ${getROIColor(investment.roi)}`}>
                      +{formatPercentage(investment.roi)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Duration
                    </p>
                    <p className="text-sm font-medium">{formatDuration(investment.duration)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
