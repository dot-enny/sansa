// Transaction filters component for Wallet page

import React from 'react'
import { Filter, X, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  type TransactionType,
  type TransactionStatus,
} from '@/data/lender/mockWalletData'
import {
  getTransactionTypeLabel,
  getTransactionTypeColor,
  getTransactionStatusLabel,
  getTransactionStatusColor,
} from '@/utils/walletUtils'

interface TransactionFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  typeFilters: TransactionType[]
  onToggleType: (type: TransactionType) => void
  statusFilters: TransactionStatus[]
  onToggleStatus: (status: TransactionStatus) => void
  onClearAll: () => void
  hasActiveFilters: boolean
  resultsCount: number
}

const typeOptions: TransactionType[] = ['deposit', 'withdraw', 'investment', 'return', 'fee']
const statusOptions: TransactionStatus[] = ['completed', 'pending', 'failed']

export const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  searchQuery,
  onSearchChange,
  typeFilters,
  onToggleType,
  statusFilters,
  onToggleStatus,
  onClearAll,
  hasActiveFilters,
  resultsCount,
}) => {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
        <Input
          type="text"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search by description, ID, or reference..."
          className="pl-11 h-12 bg-card/60 backdrop-blur-xl border-border/60 shadow-md shadow-black/5 focus:shadow-lg focus:shadow-primary/10 focus:border-primary/60 transition-all"
        />
      </div>

      {/* Filters */}
      <div className="p-6 rounded-xl bg-card/60 backdrop-blur-xl border border-border/60 shadow-lg shadow-black/5">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Filter className="w-4 h-4 text-primary" />
            </div>
            <h3 className="text-sm font-semibold">Filters</h3>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="h-8 text-xs shadow-sm hover:shadow-md transition-all"
            >
              <X className="w-3 h-3 mr-1" />
              Clear all
            </Button>
          )}
        </div>

        <div className="space-y-5">
          {/* Transaction Type Filters */}
          <div>
            <p className="text-xs text-muted-foreground mb-3 font-medium">Transaction Type</p>
            <div className="flex flex-wrap gap-2">
              {typeOptions.map(type => {
                const isActive = typeFilters.includes(type)
                return (
                  <Badge
                    key={type}
                    variant={isActive ? 'default' : 'outline'}
                    className={`cursor-pointer transition-all hover:scale-105 shadow-sm hover:shadow-md ${
                      isActive
                        ? 'bg-primary text-primary-foreground border-primary shadow-primary/20'
                        : getTransactionTypeColor(type)
                    }`}
                    onClick={() => onToggleType(type)}
                  >
                    {getTransactionTypeLabel(type)}
                  </Badge>
                )
              })}
            </div>
          </div>

          {/* Status Filters */}
          <div>
            <p className="text-xs text-muted-foreground mb-3 font-medium">Status</p>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map(status => {
                const isActive = statusFilters.includes(status)
                return (
                  <Badge
                    key={status}
                    variant={isActive ? 'default' : 'outline'}
                    className={`cursor-pointer transition-all hover:scale-105 shadow-sm hover:shadow-md ${
                      isActive
                        ? 'bg-primary text-primary-foreground border-primary shadow-primary/20'
                        : getTransactionStatusColor(status)
                    }`}
                    onClick={() => onToggleStatus(status)}
                  >
                    {getTransactionStatusLabel(status)}
                  </Badge>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm px-1">
        <p className="text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{resultsCount}</span> transaction
          {resultsCount !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}
