// Risk Analysis Component - Display risk metrics with scores

import { Shield, AlertTriangle, TrendingUp, Target, Activity } from 'lucide-react'
import type { RiskMetric } from '@/data/lender/mockAnalyticsData'
import {
  getRiskLevelColor,
  getRiskScorePercentage,
  calculateOverallRiskScore,
  getOverallRiskLevel,
} from '@/utils/analyticsUtils'
import { Progress } from '@/components/ui/progress'

interface RiskAnalysisProps {
  metrics: RiskMetric[]
}

const riskIcons = {
  Diversification: Target,
  'Vendor Reliability': Shield,
  'Market Volatility': Activity,
  'Liquidity Risk': TrendingUp,
  'Default Risk': AlertTriangle,
}

export default function RiskAnalysis({ metrics }: RiskAnalysisProps) {
  const overallScore = calculateOverallRiskScore(metrics)
  const overallLevel = getOverallRiskLevel(overallScore)

  return (
    <div className="bg-card/60 backdrop-blur-xl rounded-2xl p-6 border border-white/60 shadow-lg shadow-black/5">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Risk Analysis</h3>
        
        {/* Overall risk score */}
        <div className="text-right">
          <p className="text-sm text-muted-foreground mb-1">Overall Risk Score</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{overallScore.toFixed(1)}</span>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full border ${getRiskLevelColor(
                overallLevel
              )}`}
            >
              {overallLevel.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {metrics.map((metric, index) => {
          const Icon = riskIcons[metric.category as keyof typeof riskIcons] || Shield
          const percentage = getRiskScorePercentage(metric.score, metric.maxScore)

          return (
            <div
              key={index}
              className="p-4 rounded-xl bg-card/40 border border-white/40 hover:bg-card/60 transition-colors"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-medium">{metric.category}</h4>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-sm font-semibold">
                        {metric.score.toFixed(1)}/{metric.maxScore}
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getRiskLevelColor(
                          metric.level
                        )}`}
                      >
                        {metric.level}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{metric.description}</p>
                  
                  {/* Progress bar */}
                  <Progress value={percentage} className="h-2" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Risk level legend */}
      <div className="mt-6 pt-6 border-t border-white/20">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="text-muted-foreground">Risk Levels:</span>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full border ${getRiskLevelColor('low')}`}>
              Low
            </span>
            <span className="text-muted-foreground">= 75%+</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full border ${getRiskLevelColor('medium')}`}>
              Medium
            </span>
            <span className="text-muted-foreground">= 50-74%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full border ${getRiskLevelColor('high')}`}>
              High
            </span>
            <span className="text-muted-foreground">= Below 50%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
