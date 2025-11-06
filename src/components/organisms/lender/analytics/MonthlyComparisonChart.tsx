// Monthly Comparison Component - Bar chart showing monthly performance

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { MonthlyComparison } from '@/data/lender/mockAnalyticsData'
import { formatCurrency } from '@/utils/analyticsUtils'

interface MonthlyComparisonProps {
  data: MonthlyComparison[]
}

export default function MonthlyComparisonChart({ data }: MonthlyComparisonProps) {
  return (
    <div className="bg-card/60 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/60 shadow-lg shadow-black/5">
      <h3 className="text-base font-semibold mb-4">Monthly Performance</h3>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data as any}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis
              dataKey="month"
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
                  const data = payload[0].payload as MonthlyComparison
                  return (
                    <div className="bg-card/95 backdrop-blur-xl border border-white/60 rounded-xl p-4 shadow-xl">
                      <p className="font-semibold mb-3">{data.month}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            Invested
                          </span>
                          <span className="font-medium">{formatCurrency(data.invested)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            Returned
                          </span>
                          <span className="font-medium text-green-600">
                            {formatCurrency(data.returned)}
                          </span>
                        </div>
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
            <Bar dataKey="invested" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            <Bar dataKey="returned" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-sm text-muted-foreground">Invested</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-sm text-muted-foreground">Returned</span>
        </div>
      </div>
    </div>
  )
}
