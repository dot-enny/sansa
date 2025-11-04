import { Package } from 'lucide-react'

interface EmptyStateProps {
  hasSearch: boolean
}

export const EmptyState = ({ hasSearch }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <Package className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {hasSearch ? 'No orders found' : 'No orders yet'}
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md text-sm">
        {hasSearch
          ? 'Try adjusting your search to find what you\'re looking for'
          : 'Orders from your customers will appear here'}
      </p>
    </div>
  )
}
