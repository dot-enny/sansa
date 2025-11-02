import type { Product } from '@/data/mockProducts'

export const getStatusColor = (status: Product['status']) => {
  const colors = {
    active: 'text-green-600 bg-green-500/10 border-green-500/20',
    draft: 'text-amber-600 bg-amber-500/10 border-amber-500/20',
    'out-of-stock': 'text-red-600 bg-red-500/10 border-red-500/20',
  }
  return colors[status]
}

export const getStatusLabel = (status: Product['status']) => {
  const labels = {
    active: 'Active',
    draft: 'Draft',
    'out-of-stock': 'Out of Stock',
  }
  return labels[status]
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price)
}

export const getStockColor = (stock: number) => {
  if (stock === 0) return 'text-red-600'
  if (stock < 10) return 'text-amber-600'
  return 'text-foreground'
}
