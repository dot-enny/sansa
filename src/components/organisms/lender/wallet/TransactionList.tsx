// Transaction list component for Wallet page

import React from 'react'
import { ArrowUpRight, ArrowDownLeft, TrendingDown, TrendingUp, Receipt, CheckCircle2, Clock, XCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { type Transaction } from '@/data/lender/mockWalletData'
import {
  formatDateTime,
  getRelativeTime,
  formatTransactionAmount,
  getAmountColor,
  getTransactionTypeLabel,
  getTransactionStatusColor,
  getTransactionStatusLabel,
} from '@/utils/walletUtils'

interface TransactionListProps {
  transactions: Transaction[]
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
}) => {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return ArrowDownLeft
      case 'withdraw':
        return ArrowUpRight
      case 'investment':
        return TrendingDown
      case 'return':
        return TrendingUp
      case 'fee':
        return Receipt
      default:
        return Receipt
    }
  }

  const getTransactionIconBg = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'bg-green-500/10'
      case 'withdraw':
        return 'bg-orange-500/10'
      case 'investment':
        return 'bg-blue-500/10'
      case 'return':
        return 'bg-green-500/10'
      case 'fee':
        return 'bg-red-500/10'
      default:
        return 'bg-muted'
    }
  }

  const getTransactionIconColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'text-green-600'
      case 'withdraw':
        return 'text-orange-600'
      case 'investment':
        return 'text-blue-600'
      case 'return':
        return 'text-green-600'
      case 'fee':
        return 'text-red-600'
      default:
        return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle2
      case 'pending':
        return Clock
      case 'failed':
        return XCircle
      default:
        return Clock
    }
  }

  return (
    <div className="relative rounded-xl bg-card/60 backdrop-blur-xl border border-border/60 shadow-xl shadow-black/10 overflow-hidden">
      <div className="p-6 border-b border-border/60 bg-muted/50">
        <h3 className="text-lg font-bold">Recent Transactions</h3>
        <p className="text-sm text-muted-foreground font-medium">Your wallet activity</p>
      </div>

      <div className="divide-y divide-border/40">
        {transactions.map(transaction => {
          const Icon = getTransactionIcon(transaction.type)
          const StatusIcon = getStatusIcon(transaction.status)

          return (
            <div
              key={transaction.id}
              className="p-5 hover:bg-muted/30 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${getTransactionIconBg(transaction.type)} flex items-center justify-center shadow-md shrink-0`}>
                  <Icon className={`w-6 h-6 ${getTransactionIconColor(transaction.type)}`} />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {getRelativeTime(transaction.date)} • {formatDateTime(transaction.date)}
                      </p>
                    </div>

                    {/* Amount */}
                    <p className={`text-lg font-bold shrink-0 ${getAmountColor(transaction.amount)}`}>
                      {formatTransactionAmount(transaction.amount)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    {/* Status */}
                    <Badge 
                      variant="outline" 
                      className={`${getTransactionStatusColor(transaction.status)} shadow-sm`}
                    >
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {getTransactionStatusLabel(transaction.status)}
                    </Badge>

                    {/* Type */}
                    <span className="text-xs text-muted-foreground font-medium">
                      {getTransactionTypeLabel(transaction.type)}
                    </span>

                    {/* Reference */}
                    {transaction.reference && (
                      <span className="text-xs text-muted-foreground font-mono">
                        {transaction.reference}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
