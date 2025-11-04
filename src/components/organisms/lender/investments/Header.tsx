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
        <div className="relative p-6 rounded-xl bg-card/60 backdrop-blur-xl border border-border/60 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 group">
          <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center shadow-md shadow-blue-500/20">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-1.5 font-medium">Total Invested</p>
            <p className="text-2xl font-bold tracking-tight">{formatCurrency(totalInvested)}</p>
          </div>
        </div>

        {/* Total Returns */}
        <div className="relative p-6 rounded-xl bg-card/60 backdrop-blur-xl border border-border/60 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-green-500/10 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1 group">
          <div className="absolute inset-0 bg-linear-to-br from-green-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-green-500/20 to-green-600/10 flex items-center justify-center shadow-md shadow-green-500/20">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-right px-2 py-1 rounded-md bg-green-500/10">
                <p className="text-xs text-green-600 font-semibold">+{roi.toFixed(1)}% ROI</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-1.5 font-medium">Total Returns</p>
            <p className="text-2xl font-bold tracking-tight text-green-600">
              {formatCurrency(totalReturns)}
            </p>
          </div>
        </div>

        {/* Active Investments */}
        <div className="relative p-6 rounded-xl bg-card/60 backdrop-blur-xl border border-border/60 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 group">
          <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center shadow-md shadow-purple-500/20">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-1.5 font-medium">Active Investments</p>
            <p className="text-2xl font-bold tracking-tight">{activeCount}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
