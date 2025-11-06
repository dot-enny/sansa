// Investment details dialog component

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  TrendingUp,
  Calendar,
  DollarSign,
  Percent,
  Clock,
  AlertCircle,
  Building2,
  Tag,
} from 'lucide-react'
import { type Investment } from '@/data/lender/mockInvestments'
import {
  formatCurrency,
  formatAPR,
  formatDate,
  calculateROI,
  calculateProgress,
  getStatusColor,
  getStatusLabel,
  getRiskColor,
  getRiskLabel,
  getPaymentScheduleText,
} from '@/utils/investmentUtils'

interface InvestmentDetailsDialogProps {
  investment: Investment | null
  isOpen: boolean
  onClose: () => void
}

export const InvestmentDetailsDialog: React.FC<InvestmentDetailsDialogProps> = ({
  investment,
  isOpen,
  onClose,
}) => {
  if (!investment) return null

  const roi = calculateROI(investment)
  const progress = calculateProgress(
    investment.paymentsReceived,
    investment.totalPayments
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-2xl">Investment Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Vendor Info */}
          <div className="p-4 rounded-lg bg-muted/30 border border-border/40">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-linear-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  {investment.vendorName.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{investment.vendorName}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="w-4 h-4" />
                  <span>{investment.vendorCategory}</span>
                </div>
              </div>
              <div className="text-right space-y-2">
                <Badge variant="outline" className={getStatusColor(investment.status)}>
                  {getStatusLabel(investment.status)}
                </Badge>
                <Badge variant="outline" className={getRiskColor(investment.riskLevel)}>
                  {getRiskLabel(investment.riskLevel)}
                </Badge>
              </div>
            </div>
          </div>

          {/* Investment Overview */}
          <div className="grid grid-cols-2 gap-4">
            {/* Principal Amount */}
            <div className="p-4 rounded-lg bg-card/40 border border-border/40">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-blue-600" />
                <p className="text-xs text-muted-foreground">Principal Amount</p>
              </div>
              <p className="text-xl font-bold">{formatCurrency(investment.principalAmount)}</p>
            </div>

            {/* Interest Rate */}
            <div className="p-4 rounded-lg bg-card/40 border border-border/40">
              <div className="flex items-center gap-2 mb-2">
                <Percent className="w-4 h-4 text-purple-600" />
                <p className="text-xs text-muted-foreground">Interest Rate (APR)</p>
              </div>
              <p className="text-xl font-bold">{formatAPR(investment.interestRate)}</p>
            </div>

            {/* Current Value */}
            <div className="p-4 rounded-lg bg-card/40 border border-border/40">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <p className="text-xs text-muted-foreground">Current Value</p>
              </div>
              <p className="text-xl font-bold text-green-600">
                {formatCurrency(investment.currentValue)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">+{roi}% ROI</p>
            </div>

            {/* Total Returns */}
            <div className="p-4 rounded-lg bg-card/40 border border-border/40">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <p className="text-xs text-muted-foreground">Total Returns</p>
              </div>
              <p className="text-xl font-bold text-green-600">
                {formatCurrency(investment.totalReturns)}
              </p>
            </div>
          </div>

          {/* Payment Progress */}
          <div className="p-4 rounded-lg bg-muted/30 border border-border/40">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold">Payment Progress</h4>
              <span className="text-sm font-medium">
                {investment.paymentsReceived} / {investment.totalPayments} payments
              </span>
            </div>
            <Progress value={progress} className="h-2 mb-2" />
            <p className="text-xs text-muted-foreground">{progress}% completed</p>
          </div>

          {/* Next Payment Info */}
          {investment.status !== 'completed' && (
            <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
              <div className="flex items-start gap-3">
                {investment.daysOverdue ? (
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                ) : (
                  <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
                )}
                <div className="flex-1">
                  <h4 className="text-sm font-semibold mb-1">Next Payment</h4>
                  <p className="text-lg font-bold mb-1">
                    {formatCurrency(investment.nextPaymentAmount)}
                  </p>
                  <p
                    className={`text-sm ${
                      investment.daysOverdue ? 'text-red-600 font-medium' : 'text-muted-foreground'
                    }`}
                  >
                    {getPaymentScheduleText(investment)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="grid grid-cols-2 gap-4">
            {/* Start Date */}
            <div className="p-4 rounded-lg bg-card/40 border border-border/40">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Start Date</p>
              </div>
              <p className="text-sm font-medium">{formatDate(investment.startDate)}</p>
            </div>

            {/* End Date */}
            <div className="p-4 rounded-lg bg-card/40 border border-border/40">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">End Date</p>
              </div>
              <p className="text-sm font-medium">{formatDate(investment.endDate)}</p>
            </div>

            {/* Duration */}
            <div className="p-4 rounded-lg bg-card/40 border border-border/40">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Duration</p>
              </div>
              <p className="text-sm font-medium">{investment.duration} months</p>
            </div>

            {/* Investment ID */}
            <div className="p-4 rounded-lg bg-card/40 border border-border/40">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Investment ID</p>
              </div>
              <p className="text-sm font-medium font-mono">{investment.id}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
