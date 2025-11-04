import { useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import type { PortfolioHealth } from '@/data/lender/mockLenderData'
import {
  getPortfolioHealthColor,
  getPortfolioHealthLabel,
} from '@/utils/lenderUtils'

interface PortfolioHealthChartProps {
  portfolioHealth: PortfolioHealth
  totalCount: number
  percentages: {
    onTime: number
    late: number
    atRisk: number
    inDefault: number
  }
}

export const PortfolioHealthChart = ({
  portfolioHealth,
  totalCount,
  percentages,
}: PortfolioHealthChartProps) => {
  const chartData = useMemo(() => {
    return [
      {
        name: getPortfolioHealthLabel('onTime'),
        value: portfolioHealth.onTime,
        percentage: percentages.onTime,
        color: getPortfolioHealthColor('onTime'),
      },
      {
        name: getPortfolioHealthLabel('late'),
        value: portfolioHealth.late,
        percentage: percentages.late,
        color: getPortfolioHealthColor('late'),
      },
      {
        name: getPortfolioHealthLabel('atRisk'),
        value: portfolioHealth.atRisk,
        percentage: percentages.atRisk,
        color: getPortfolioHealthColor('atRisk'),
      },
      {
        name: getPortfolioHealthLabel('inDefault'),
        value: portfolioHealth.inDefault,
        percentage: percentages.inDefault,
        color: getPortfolioHealthColor('inDefault'),
      },
    ].filter((item) => item.value > 0) // Only show categories with values
  }, [portfolioHealth, percentages])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-card/95 backdrop-blur-md border border-border/40 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold text-foreground mb-1">{data.name}</p>
          <p className="text-xs text-muted-foreground">
            {data.value} investment{data.value !== 1 ? 's' : ''} ({data.percentage.toFixed(1)}%)
          </p>
        </div>
      )
    }
    return null
  }

  const renderCustomLabel = (entry: any) => {
    return `${entry.percentage.toFixed(0)}%`
  }

  return (
    <div className="relative p-6 rounded-xl bg-card/40 backdrop-blur-md border border-border/40 hover:border-primary/40 transition-all duration-300">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Portfolio Health</h3>
        <p className="text-sm text-muted-foreground">
          Overview of {totalCount} active investment{totalCount !== 1 ? 's' : ''}
        </p>
      </div>

      {totalCount > 0 ? (
        <>
          <div className="h-[300px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={800}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value: string) => (
                    <span className="text-sm text-foreground">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {chartData.map((item) => (
              <div
                key={item.name}
                className="p-3 rounded-lg bg-muted/20 border border-border/20"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <p className="text-xs text-muted-foreground truncate">{item.name}</p>
                </div>
                <p className="text-lg font-bold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-sm text-muted-foreground">No active investments</p>
        </div>
      )}
    </div>
  )
}
