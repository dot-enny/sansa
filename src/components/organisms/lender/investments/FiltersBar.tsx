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
      <div className="p-5 rounded-xl bg-card/40 backdrop-blur-md border border-border/40">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Filters</h3>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="h-7 text-xs"
            >
              <X className="w-3 h-3 mr-1" />
              Clear all
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {/* Status Filters */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">Status</p>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map(status => {
                const isActive = statusFilters.includes(status)
                return (
                  <Badge
                    key={status}
                    variant={isActive ? 'default' : 'outline'}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      isActive
                        ? 'bg-primary text-primary-foreground border-primary'
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
            <p className="text-xs text-muted-foreground mb-2">Risk Level</p>
            <div className="flex flex-wrap gap-2">
              {riskOptions.map(risk => {
                const isActive = riskFilters.includes(risk)
                return (
                  <Badge
                    key={risk}
                    variant={isActive ? 'default' : 'outline'}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      isActive
                        ? 'bg-primary text-primary-foreground border-primary'
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
      <div className="flex items-center justify-between text-sm">
        <p className="text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{resultsCount}</span> investment
          {resultsCount !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}
