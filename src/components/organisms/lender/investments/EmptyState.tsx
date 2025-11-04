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
    <div className="relative p-12 rounded-xl bg-card/40 backdrop-blur-md border border-border/40">
      <div className="text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <TrendingUp className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2">
          {hasFilters ? 'No investments match your filters' : 'No investments yet'}
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          {hasFilters
            ? 'Try adjusting your search criteria or clearing filters to see more investments.'
            : 'Start investing in vendors to grow your portfolio and earn returns.'}
        </p>
        {hasFilters && (
          <Button onClick={onClearFilters} variant="outline">
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  )
}
