import { TrendingUp, DollarSign, Percent, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { formatCurrency, formatAPR } from '@/utils/lenderUtils'
import type { LenderKPIs } from '@/data/lender/mockLenderData'

interface KPICardsProps {
  kpis: LenderKPIs
}

export const KPICards = ({ kpis }: KPICardsProps) => {
  const kpiData = [
    {
      id: 'capital',
      title: 'Total Capital Deployed',
      value: formatCurrency(kpis.totalCapitalDeployed),
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-500/10',
      trend: '+12.5%',
      trendUp: true,
    },
    {
      id: 'returns',
      title: 'Total Returns (Yield)',
      value: formatCurrency(kpis.totalReturns),
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-500/10',
      trend: '+8.3%',
      trendUp: true,
    },
    {
      id: 'apr',
      title: 'Average APR',
      value: formatAPR(kpis.averageAPR),
      icon: Percent,
      color: 'text-purple-600',
      bgColor: 'bg-purple-500/10',
      trend: '+2.1%',
      trendUp: true,
    },
    {
      id: 'available',
      title: 'Available Capital',
      value: formatCurrency(kpis.availableCapital),
      icon: Wallet,
      color: 'text-amber-600',
      bgColor: 'bg-amber-500/10',
      trend: '-5.2%',
      trendUp: false,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {kpiData.map((kpi) => {
        const Icon = kpi.icon
        const TrendIcon = kpi.trendUp ? ArrowUpRight : ArrowDownRight

        return (
          <div
            key={kpi.id}
            className="group relative p-6 rounded-xl bg-card/40 backdrop-blur-md border border-border/40 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
          >
            {/* Background glow effect */}
            <div className={`absolute inset-0 ${kpi.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-xl -z-10`} />

            {/* Icon */}
            <div className={`w-12 h-12 rounded-lg ${kpi.bgColor} flex items-center justify-center mb-4`}>
              <Icon className={`w-6 h-6 ${kpi.color}`} />
            </div>

            {/* Title */}
            <p className="text-xs text-muted-foreground mb-1">{kpi.title}</p>

            {/* Value */}
            <p className="text-2xl font-bold text-foreground mb-2 tracking-tight">
              {kpi.value}
            </p>

            {/* Trend */}
            <div className="flex items-center gap-1">
              <TrendIcon
                className={`w-3 h-3 ${kpi.trendUp ? 'text-green-600' : 'text-red-600'}`}
              />
              <span
                className={`text-xs font-medium ${
                  kpi.trendUp ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {kpi.trend}
              </span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
