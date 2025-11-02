import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import type { Order } from '@/data/mockOrders'

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  filteredOrders: Order[]
  totalOrders: number
}

export const SearchBar = ({
  searchQuery,
  setSearchQuery,
  filteredOrders,
  totalOrders,
}: SearchBarProps) => {
  return (
    <div className="mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by order ID, customer name, or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-transparent border-0 border-b border-border/40 rounded-none focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors text-sm"
        />
      </div>
      {searchQuery && (
        <p className="text-xs text-muted-foreground mt-2">
          Showing {filteredOrders.length} of {totalOrders} orders
        </p>
      )}
    </div>
  )
}
