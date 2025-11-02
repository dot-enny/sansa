import type { Order } from '@/data/mockOrders'
import {
  Clock,
  Package,
  Truck,
  CheckCircle,
  XCircle,
} from 'lucide-react'

export const getStatusColor = (status: Order['status']) => {
  const colors = {
    pending: 'text-amber-600 bg-amber-500/10 border-amber-500/20',
    processing: 'text-blue-600 bg-blue-500/10 border-blue-500/20',
    shipped: 'text-purple-600 bg-purple-500/10 border-purple-500/20',
    delivered: 'text-green-600 bg-green-500/10 border-green-500/20',
    cancelled: 'text-red-600 bg-red-500/10 border-red-500/20',
  }
  return colors[status]
}

export const getStatusIcon = (status: Order['status']) => {
  const icons = {
    pending: Clock,
    processing: Package,
    shipped: Truck,
    delivered: CheckCircle,
    cancelled: XCircle,
  }
  return icons[status]
}

export const getStatusLabel = (status: Order['status']) => {
  const labels = {
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  }
  return labels[status]
}

export const getPaymentStatusColor = (status: Order['paymentStatus']) => {
  const colors = {
    paid: 'text-green-600 bg-green-500/10 border-green-500/20',
    pending: 'text-amber-600 bg-amber-500/10 border-amber-500/20',
    failed: 'text-red-600 bg-red-500/10 border-red-500/20',
  }
  return colors[status]
}

export const getPaymentStatusLabel = (status: Order['paymentStatus']) => {
  const labels = {
    paid: 'Paid',
    pending: 'Pending',
    failed: 'Failed',
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
