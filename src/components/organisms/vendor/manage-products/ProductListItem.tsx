import { Link } from 'react-router-dom'
import { Edit2, MoreHorizontal, Power, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Product } from '@/data/mockProducts'
import { formatPrice, getStatusColor, getStatusLabel, getStockColor } from '@/utils/productUtils'

interface ProductListItemProps {
  product: Product
  onToggleStatus: (id: string) => void
  onDeleteClick: (product: Product) => void
}

export const ProductListItem = ({
  product,
  onToggleStatus,
  onDeleteClick,
}: ProductListItemProps) => {
  return (
    <div className="group relative flex items-center gap-5 p-5 rounded-xl bg-card/30 backdrop-blur-md border border-border/40 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
      {/* Product Image */}
      <div className="shrink-0">
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted/30 shadow-md">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[2fr,1fr,1fr,1fr] gap-4 md:gap-8 items-center">
        {/* Name & Category */}
        <div className="space-y-1">
          <Link
            to={`/dashboard/products/${product.id}`}
            className="text-base font-semibold text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
          >
            {product.name}
          </Link>
          <p className="text-xs text-muted-foreground">{product.category}</p>
        </div>

        {/* Price */}
        <div>
          <p className="text-sm font-semibold text-foreground">{formatPrice(product.price)}</p>
        </div>

        {/* Stock & Sales */}
        <div className="space-y-1">
          <p className={`text-sm font-medium ${getStockColor(product.stock)}`}>
            Stock: {product.stock}
          </p>
          <p className="text-xs text-muted-foreground">{product.sales} sales</p>
        </div>

        {/* Status */}
        <div>
          <Badge variant="outline" className={getStatusColor(product.status)}>
            {getStatusLabel(product.status)}
          </Badge>
        </div>
      </div>

      {/* Actions Dropdown */}
      <div className="shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <MoreHorizontal className="w-5 h-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                to={`/dashboard/products/${product.id}/edit`}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit Product</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onToggleStatus(product.id)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Power className="w-4 h-4" />
              <span>
                {product.status === 'active' ? 'Set as Draft' : 'Set as Active'}
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDeleteClick(product)}
              className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Product</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
