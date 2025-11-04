// Header component for Investments page

import React from 'react'
import { DollarSign, TrendingUp, Activity } from 'lucide-react'
import { formatCurrency } from '@/utils/investmentUtils'

interface HeaderProps {
  totalInvested: number
  totalReturns: number
  activeCount: number
}

export const Header: React.FC<HeaderProps> = ({
  totalInvested,
  totalReturns,
  activeCount,
}) => {
  const roi = totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">My Investments</h1>
        <p className="text-muted-foreground">
          Track and manage your investment portfolio
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Invested */}
        <div className="relative p-5 rounded-xl bg-card/40 backdrop-blur-md border border-border/40 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Total Invested</p>
          <p className="text-2xl font-bold tracking-tight">{formatCurrency(totalInvested)}</p>
        </div>

        {/* Total Returns */}
        <div className="relative p-5 rounded-xl bg-card/40 backdrop-blur-md border border-border/40 hover:border-green-500/40 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-right">
              <p className="text-xs text-green-600 font-medium">+{roi.toFixed(1)}% ROI</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Total Returns</p>
          <p className="text-2xl font-bold tracking-tight text-green-600">
            {formatCurrency(totalReturns)}
          </p>
        </div>

        {/* Active Investments */}
        <div className="relative p-5 rounded-xl bg-card/40 backdrop-blur-md border border-border/40 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-1">Active Investments</p>
          <p className="text-2xl font-bold tracking-tight">{activeCount}</p>
        </div>
      </div>
    </div>
  )
}
