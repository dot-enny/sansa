// Empty state component for Investments page

import React from 'react'
import { TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  hasFilters: boolean
  onClearFilters: () => void
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  hasFilters,
  onClearFilters,
}) => {
  return (
    <div className="relative p-16 rounded-xl bg-card/60 backdrop-blur-xl border border-border/60 shadow-xl shadow-black/10">
      <div className="text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
          <TrendingUp className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-3">
          {hasFilters ? 'No investments match your filters' : 'No investments yet'}
        </h3>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          {hasFilters
            ? 'Try adjusting your search criteria or clearing filters to see more investments.'
            : 'Start investing in vendors to grow your portfolio and earn returns.'}
        </p>
        {hasFilters && (
          <Button onClick={onClearFilters} variant="outline" className="shadow-md hover:shadow-lg transition-all">
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  )
}
