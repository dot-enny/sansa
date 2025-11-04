// Filters bar component for Investments page

import React from 'react'
import { Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  type InvestmentStatus,
  type RiskLevel,
} from '@/data/lender/mockInvestments'
import {
  getStatusLabel,
  getStatusColor,
  getRiskLabel,
  getRiskColor,
} from '@/utils/investmentUtils'

interface FiltersBarProps {
  statusFilters: InvestmentStatus[]
  riskFilters: RiskLevel[]
  onToggleStatus: (status: InvestmentStatus) => void
  onToggleRisk: (risk: RiskLevel) => void
  onClearAll: () => void
  hasActiveFilters: boolean
  resultsCount: number
}

const statusOptions: InvestmentStatus[] = ['on-time', 'late', 'at-risk', 'in-default', 'completed']
const riskOptions: RiskLevel[] = ['low', 'medium', 'high']

export const FiltersBar: React.FC<FiltersBarProps> = ({
  statusFilters,
  riskFilters,
  onToggleStatus,
  onToggleRisk,
  onClearAll,
  hasActiveFilters,
  resultsCount,
}) => {
  return (
    <div className="space-y-4">
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
                        : getStatusColor(status)
                    }`}
                    onClick={() => onToggleStatus(status)}
                  >
                    {getStatusLabel(status)}
                  </Badge>
                )
              })}
            </div>
          </div>

          {/* Risk Level Filters */}
          <div>
            <p className="text-xs text-muted-foreground mb-3 font-medium">Risk Level</p>
            <div className="flex flex-wrap gap-2">
              {riskOptions.map(risk => {
                const isActive = riskFilters.includes(risk)
                return (
                  <Badge
                    key={risk}
                    variant={isActive ? 'default' : 'outline'}
                    className={`cursor-pointer transition-all hover:scale-105 shadow-sm hover:shadow-md ${
                      isActive
                        ? 'bg-primary text-primary-foreground border-primary shadow-primary/20'
                        : getRiskColor(risk)
                    }`}
                    onClick={() => onToggleRisk(risk)}
                  >
                    {getRiskLabel(risk)}
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
          Showing <span className="font-semibold text-foreground">{resultsCount}</span> investment
          {resultsCount !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}
