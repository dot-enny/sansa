// Balance card component for Wallet page

import React from 'react'
import { Wallet, TrendingUp, Clock, DollarSign } from 'lucide-react'
import { formatCurrency } from '@/utils/walletUtils'
import { type WalletBalance } from '@/data/lender/mockWalletData'

interface BalanceCardProps {
  balance: WalletBalance
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  return (
    <div className="relative p-8 rounded-xl bg-card/60 backdrop-blur-xl border border-border/60 shadow-xl shadow-black/10 overflow-hidden group">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-purple-500/5 opacity-100" />
      
      {/* Content */}
      <div className="relative">
        {/* Main balance */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary/25 to-primary/10 flex items-center justify-center shadow-md shadow-primary/20">
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground font-medium">Available Balance</p>
          </div>
          <p className="text-4xl font-bold tracking-tight mb-1">
            {formatCurrency(balance.available)}
          </p>
          <p className="text-xs text-muted-foreground">
            Total Portfolio: {formatCurrency(balance.total)}
          </p>
        </div>

        {/* Balance breakdown */}
        <div className="grid grid-cols-3 gap-4">
          {/* Invested */}
          <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/10">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <p className="text-xs text-muted-foreground font-medium">Invested</p>
            </div>
            <p className="text-lg font-bold text-blue-600">
              {formatCurrency(balance.invested)}
            </p>
          </div>

          {/* Pending */}
          <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/10">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <p className="text-xs text-muted-foreground font-medium">Pending</p>
            </div>
            <p className="text-lg font-bold text-amber-600">
              {formatCurrency(balance.pending)}
            </p>
          </div>

          {/* Total */}
          <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/10">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <p className="text-xs text-muted-foreground font-medium">Total</p>
            </div>
            <p className="text-lg font-bold text-green-600">
              {formatCurrency(balance.total)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
