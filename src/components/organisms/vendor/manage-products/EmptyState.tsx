import { Package } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  hasFilters: boolean
}

export const EmptyState = ({ hasFilters }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <Package className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {hasFilters ? 'No products found' : 'No products yet'}
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md text-sm">
        {hasFilters
          ? 'Try adjusting your filters to see more results'
          : 'Start building your inventory by adding your first product'}
      </p>
      {!hasFilters && (
        <Button asChild>
          <Link to="/vendor-dashboard/add-product">Add Your First Product</Link>
        </Button>
      )}
    </div>
  )
}
