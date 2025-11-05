// Investment Trends Component - Line chart showing investment performance over time

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { InvestmentTrendPoint } from '@/data/lender/mockAnalyticsData'
import { formatCurrency, formatMonthShort } from '@/utils/analyticsUtils'
import type { DateRangeOption } from '@/hooks/lender/useAnalytics'
import { Button } from '@/components/ui/button'

interface InvestmentTrendsProps {
  data: InvestmentTrendPoint[]
  dateRange: DateRangeOption
  onDateRangeChange: (range: DateRangeOption) => void
  showNetValue: boolean
  showInvested: boolean
  showReturns: boolean
  onToggleNetValue: () => void
  onToggleInvested: () => void
  onToggleReturns: () => void
}

export default function InvestmentTrends({
  data,
  dateRange,
  onDateRangeChange,
  showNetValue,
  showInvested,
  showReturns,
  onToggleNetValue,
  onToggleInvested,
  onToggleReturns,
}: InvestmentTrendsProps) {
  const dateRangeOptions: DateRangeOption[] = ['3M', '6M', '1Y', 'ALL']

  return (
    <div className="bg-card/60 backdrop-blur-xl rounded-2xl p-6 border border-white/60 shadow-lg shadow-black/5">
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-lg font-semibold">Investment Trends</h3>

        <div className="flex items-center gap-2">
          {/* Date range selector */}
          <div className="flex items-center gap-1 bg-card/40 rounded-xl p-1 border border-white/40">
            {dateRangeOptions.map((option) => (
              <Button
                key={option}
                variant={dateRange === option ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onDateRangeChange(option)}
                className="h-8 px-3"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Legend toggles */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <button
          onClick={onToggleNetValue}
          className="flex items-center gap-2 text-sm transition-opacity hover:opacity-100"
          style={{ opacity: showNetValue ? 1 : 0.5 }}
        >
          <div className="w-3 h-3 rounded-full bg-purple-500" />
          <span>Net Value</span>
        </button>
        <button
          onClick={onToggleInvested}
          className="flex items-center gap-2 text-sm transition-opacity hover:opacity-100"
          style={{ opacity: showInvested ? 1 : 0.5 }}
        >
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span>Invested</span>
        </button>
        <button
          onClick={onToggleReturns}
          className="flex items-center gap-2 text-sm transition-opacity hover:opacity-100"
          style={{ opacity: showReturns ? 1 : 0.5 }}
        >
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span>Returns</span>
        </button>
      </div>

      {/* Chart */}
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data as any}>
            <defs>
              <linearGradient id="colorNetValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorReturns" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis
              dataKey="date"
              tickFormatter={formatMonthShort}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              tickFormatter={(value) => formatCurrency(value)}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as InvestmentTrendPoint
                  return (
                    <div className="bg-card/95 backdrop-blur-xl border border-white/60 rounded-xl p-4 shadow-xl">
                      <p className="font-semibold mb-3">
                        {formatMonthShort(data.date)} {data.date.split('-')[0]}
                      </p>
                      <div className="space-y-2">
                        {showNetValue && (
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-purple-500" />
                              Net Value
                            </span>
                            <span className="font-medium">{formatCurrency(data.netValue)}</span>
                          </div>
                        )}
                        {showInvested && (
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-blue-500" />
                              Invested
                            </span>
                            <span className="font-medium">{formatCurrency(data.invested)}</span>
                          </div>
                        )}
                        {showReturns && (
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                              Returns
                            </span>
                            <span className="font-medium">{formatCurrency(data.returns)}</span>
                          </div>
                        )}
                        <div className="pt-2 border-t border-white/20 mt-2">
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-sm text-muted-foreground">ROI</span>
                            <span className="font-medium text-green-600">
                              {data.roi.toFixed(2)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            {showNetValue && (
              <Area
                type="monotone"
                dataKey="netValue"
                stroke="#a855f7"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorNetValue)"
              />
            )}
            {showInvested && (
              <Area
                type="monotone"
                dataKey="invested"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorInvested)"
              />
            )}
            {showReturns && (
              <Area
                type="monotone"
                dataKey="returns"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorReturns)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
