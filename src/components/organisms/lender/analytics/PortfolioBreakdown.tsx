// Portfolio Breakdown Component - Pie/Donut chart showing investment distribution

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { PortfolioBreakdownItem } from '@/data/lender/mockAnalyticsData'
import { formatCurrency, formatPercentage } from '@/utils/analyticsUtils'

interface PortfolioBreakdownProps {
  data: PortfolioBreakdownItem[]
}

export default function PortfolioBreakdown({ data }: PortfolioBreakdownProps) {
  return (
    <div className="bg-card/60 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/60 shadow-lg shadow-black/5">
      <h3 className="text-base font-semibold mb-4">Portfolio Breakdown</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pie Chart */}
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data as any}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={85}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as PortfolioBreakdownItem
                    return (
                      <div className="bg-card/95 backdrop-blur-xl border border-white/60 rounded-xl p-3 shadow-xl">
                        <p className="font-semibold mb-2">{data.category}</p>
                        <div className="space-y-1 text-sm">
                          <p className="text-muted-foreground">
                            Value: <span className="font-medium text-foreground">{formatCurrency(data.value)}</span>
                          </p>
                          <p className="text-muted-foreground">
                            Share: <span className="font-medium text-foreground">{formatPercentage(data.percentage)}</span>
                          </p>
                          <p className="text-muted-foreground">
                            Count: <span className="font-medium text-foreground">{data.count} investments</span>
                          </p>
                          <p className="text-muted-foreground">
                            Avg ROI: <span className="font-medium text-foreground">{formatPercentage(data.averageROI)}</span>
                          </p>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend & Details */}
        <div className="space-y-2">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2.5 rounded-lg bg-card/40 border border-white/40 hover:bg-card/60 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <div
                  className="w-4 h-4 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.category}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.count} investment{item.count !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="font-semibold">{formatCurrency(item.value)}</p>
                <p className="text-sm text-muted-foreground">
                  {formatPercentage(item.percentage)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
