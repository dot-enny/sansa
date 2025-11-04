// Investments table component

import React from 'react'
import { ArrowUpDown, Eye, TrendingUp, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { type Investment } from '@/data/lender/mockInvestments'
import {
  formatCurrency,
  formatAPR,
  calculateROI,
  calculateProgress,
  getStatusColor,
  getStatusLabel,
  getRiskColor,
  getRiskLabel,
  getPaymentScheduleText,
} from '@/utils/investmentUtils'

interface InvestmentsTableProps {
  investments: Investment[]
  onViewDetails: (investment: Investment) => void
  sortBy: string
  onSort: (field: 'amount' | 'date' | 'returns' | 'status' | 'risk') => void
}

export const InvestmentsTable: React.FC<InvestmentsTableProps> = ({
  investments,
  onViewDetails,
  sortBy,
  onSort,
}) => {
  const SortButton: React.FC<{ field: string; children: React.ReactNode }> = ({
    field,
    children,
  }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onSort(field as any)}
      className="h-8 px-2 hover:bg-primary/10 group"
    >
      <span className="text-xs font-medium">{children}</span>
      <ArrowUpDown
        className={`ml-1 w-3 h-3 transition-all ${
          sortBy === field
            ? 'text-primary scale-110'
            : 'text-muted-foreground group-hover:text-primary'
        }`}
      />
    </Button>
  )

  return (
    <div className="relative rounded-xl bg-card/40 backdrop-blur-md border border-border/40 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-border/40 bg-muted/30">
            <tr>
              <th className="text-left p-3">
                <span className="text-xs font-medium text-muted-foreground">Vendor</span>
              </th>
              <th className="text-left p-3">
                <SortButton field="amount">Amount</SortButton>
              </th>
              <th className="text-left p-3">
                <span className="text-xs font-medium text-muted-foreground">APR</span>
              </th>
              <th className="text-left p-3">
                <SortButton field="returns">Returns</SortButton>
              </th>
              <th className="text-left p-3">
                <span className="text-xs font-medium text-muted-foreground">Progress</span>
              </th>
              <th className="text-left p-3">
                <SortButton field="status">Status</SortButton>
              </th>
              <th className="text-left p-3">
                <SortButton field="risk">Risk</SortButton>
              </th>
              <th className="text-left p-3">
                <span className="text-xs font-medium text-muted-foreground">Next Payment</span>
              </th>
              <th className="text-right p-3">
                <span className="text-xs font-medium text-muted-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {investments.map(investment => {
              const progress = calculateProgress(
                investment.paymentsReceived,
                investment.totalPayments
              )
              const roi = calculateROI(investment)

              return (
                <tr
                  key={investment.id}
                  className="border-b border-border/20 hover:bg-muted/20 transition-all cursor-pointer group"
                  onClick={() => onViewDetails(investment)}
                >
                  {/* Vendor */}
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-primary">
                          {investment.vendorName.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{investment.vendorName}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {investment.vendorCategory}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="p-3">
                    <p className="text-sm font-semibold">
                      {formatCurrency(investment.principalAmount)}
                    </p>
                    <p className="text-xs text-muted-foreground">{investment.duration} months</p>
                  </td>

                  {/* APR */}
                  <td className="p-3">
                    <p className="text-sm font-medium">{formatAPR(investment.interestRate)}</p>
                  </td>

                  {/* Returns */}
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <p className="text-sm font-semibold text-green-600">
                        {formatCurrency(investment.totalReturns)}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">+{roi}% ROI</p>
                  </td>

                  {/* Progress */}
                  <td className="p-3">
                    <div className="space-y-1 min-w-[100px]">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {investment.paymentsReceived}/{investment.totalPayments}
                        </span>
                        <span className="text-xs font-medium">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-1.5" />
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-3">
                    <Badge variant="outline" className={getStatusColor(investment.status)}>
                      {getStatusLabel(investment.status)}
                    </Badge>
                  </td>

                  {/* Risk */}
                  <td className="p-3">
                    <Badge variant="outline" className={getRiskColor(investment.riskLevel)}>
                      {getRiskLabel(investment.riskLevel)}
                    </Badge>
                  </td>

                  {/* Next Payment */}
                  <td className="p-3">
                    {investment.status !== 'completed' ? (
                      <div>
                        <p className="text-sm font-medium">
                          {formatCurrency(investment.nextPaymentAmount)}
                        </p>
                        <div className="flex items-center gap-1">
                          {investment.daysOverdue && (
                            <AlertCircle className="w-3 h-3 text-red-600" />
                          )}
                          <p
                            className={`text-xs ${
                              investment.daysOverdue
                                ? 'text-red-600 font-medium'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {getPaymentScheduleText(investment)}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">—</p>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={e => {
                        e.stopPropagation()
                        onViewDetails(investment)
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
