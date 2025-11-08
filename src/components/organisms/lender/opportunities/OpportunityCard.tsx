// OpportunityCard - Display opportunity in grid or list view

import { Clock, Users, ArrowRight, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import type { Opportunity } from '@/data/lender/mockOpportunities'
import {
  formatCurrency,
  formatPercentage,
  formatTerm,
  formatDateRelative,
  getUseOfFundsLabel,
  getCategoryLabel,
  getScoreColor,
  getScoreBgColor,
  getScoreBorderColor,
  getRiskColor,
  getStatusColor,
  getStatusLabel,
  getRiskLevelLabel,
  calculateFundingPercentage,
  calculateRemainingAmount,
  calculateExpectedReturn,
  getScoreGrade,
} from '@/utils/lender/opportunitiesUtils'

interface OpportunityCardProps {
  opportunity: Opportunity
  onViewDetails: (opportunity: Opportunity) => void
  onInvest: (opportunity: Opportunity) => void
  viewMode?: 'grid' | 'list'
}

export default function OpportunityCard({ 
  opportunity, 
  onViewDetails, 
  onInvest,
  viewMode = 'grid' 
}: OpportunityCardProps) {
  const fundingPercentage = calculateFundingPercentage(opportunity)
  const remainingAmount = calculateRemainingAmount(opportunity)
  const expectedReturn = calculateExpectedReturn(opportunity.minInvestment, opportunity)
  
  if (viewMode === 'list') {
    return (
      <div className="group relative p-4 rounded-xl bg-card/60 backdrop-blur-xl border border-border/60 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
        <div className="flex items-center gap-4">
          {/* Vendor Logo */}
          <div className="shrink-0">
            <div className="w-16 h-16 rounded-xl bg-linear-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <span className="text-xl font-bold text-primary">
                {opportunity.vendorName.charAt(0)}
              </span>
            </div>
          </div>
          
          {/* Main Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base mb-1 truncate">{opportunity.vendorName}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    {getCategoryLabel(opportunity.category)}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {getUseOfFundsLabel(opportunity.useOfFunds)}
                  </Badge>
                </div>
              </div>
              
              {/* Merchant Score */}
              <div className={`px-3 py-1.5 rounded-lg border ${getScoreBgColor(opportunity.merchantStrengthScore)} ${getScoreBorderColor(opportunity.merchantStrengthScore)}`}>
                <div className="text-xs text-muted-foreground mb-0.5">Score</div>
                <div className={`text-lg font-bold ${getScoreColor(opportunity.merchantStrengthScore)}`}>
                  {opportunity.merchantStrengthScore}
                </div>
                <div className="text-xs text-muted-foreground">{getScoreGrade(opportunity.merchantStrengthScore)}</div>
              </div>
            </div>
            
            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">Requested</div>
                <div className="text-sm font-semibold">{formatCurrency(opportunity.requestedAmount)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">APR</div>
                <div className="text-sm font-semibold text-green-600">{formatPercentage(opportunity.apr)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">Term</div>
                <div className="text-sm font-semibold">{formatTerm(opportunity.term)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">Remaining</div>
                <div className="text-sm font-semibold">{formatCurrency(remainingAmount)}</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">Funding Progress</span>
                <span className="font-medium">{formatPercentage(fundingPercentage, 0)}</span>
              </div>
              <Progress value={fundingPercentage} className="h-1.5" />
            </div>
            
            {/* Bottom Row */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatDateRelative(opportunity.expiryDate)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{opportunity.interestedInvestors} interested</span>
                </div>
                <Badge variant="outline" className={`text-xs ${getRiskColor(opportunity.riskLevel)}`}>
                  {getRiskLevelLabel(opportunity.riskLevel)}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewDetails(opportunity)}
                  className="h-8 px-3"
                >
                  <Eye className="w-3.5 h-3.5 mr-1.5" />
                  Details
                </Button>
                {opportunity.status !== 'fully-funded' && opportunity.status !== 'expired' && (
                  <Button
                    size="sm"
                    onClick={() => onInvest(opportunity)}
                    className="h-8 px-3 bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20"
                  >
                    Invest Now
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // Grid view
  return (
    <div className="group relative p-4 rounded-xl bg-card/60 backdrop-blur-xl border border-border/60 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300">
      {/* Status Badge */}
      {opportunity.status !== 'available' && (
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="outline" className={`text-xs ${getStatusColor(opportunity.status)}`}>
            {getStatusLabel(opportunity.status)}
          </Badge>
        </div>
      )}
      
      {/* Vendor Logo */}
      <div className="mb-3">
        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-3">
          <span className="text-lg font-bold text-primary">
            {opportunity.vendorName.charAt(0)}
          </span>
        </div>
        
        <h3 className="font-semibold text-base mb-1 line-clamp-1">{opportunity.vendorName}</h3>
        <div className="flex items-center gap-1.5 flex-wrap">
          <Badge variant="outline" className="text-xs">
            {getCategoryLabel(opportunity.category)}
          </Badge>
        </div>
      </div>
      
      {/* Merchant Score - Prominent */}
      <div className={`mb-3 p-3 rounded-lg border ${getScoreBgColor(opportunity.merchantStrengthScore)} ${getScoreBorderColor(opportunity.merchantStrengthScore)}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground mb-0.5">Merchant Score</div>
            <div className={`text-2xl font-bold ${getScoreColor(opportunity.merchantStrengthScore)}`}>
              {opportunity.merchantStrengthScore}
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-muted-foreground">{getScoreGrade(opportunity.merchantStrengthScore)}</div>
            <Badge variant="outline" className={`text-xs mt-1 ${getRiskColor(opportunity.riskLevel)}`}>
              {getRiskLevelLabel(opportunity.riskLevel)}
            </Badge>
          </div>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Requested</span>
          <span className="font-semibold">{formatCurrency(opportunity.requestedAmount)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">APR</span>
          <span className="font-semibold text-green-600">{formatPercentage(opportunity.apr)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Term</span>
          <span className="font-semibold">{formatTerm(opportunity.term)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Use of Funds</span>
          <Badge variant="outline" className="text-xs">
            {getUseOfFundsLabel(opportunity.useOfFunds)}
          </Badge>
        </div>
      </div>
      
      {/* Funding Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-muted-foreground">Funded</span>
          <span className="font-medium">{formatPercentage(fundingPercentage, 0)}</span>
        </div>
        <Progress value={fundingPercentage} className="h-1.5 mb-1" />
        <div className="text-xs text-muted-foreground text-right">
          {formatCurrency(remainingAmount)} remaining
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3 pb-3 border-b border-border/40">
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>{formatDateRelative(opportunity.expiryDate)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          <span>{opportunity.interestedInvestors}</span>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(opportunity)}
          className="flex-1 h-9"
        >
          <Eye className="w-3.5 h-3.5 mr-1.5" />
          Details
        </Button>
        {opportunity.status !== 'fully-funded' && opportunity.status !== 'expired' && (
          <Button
            size="sm"
            onClick={() => onInvest(opportunity)}
            className="flex-1 h-9 bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20"
          >
            Invest
          </Button>
        )}
      </div>
      
      {/* Expected Return Tooltip */}
      <div className="mt-2 text-xs text-center text-muted-foreground">
        Min. {formatCurrency(opportunity.minInvestment)} • Est. return: {formatCurrency(expectedReturn)}
      </div>
    </div>
  )
}
