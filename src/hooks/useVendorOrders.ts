import { useState, useMemo } from 'react'
import type { Order } from '@/data/mockOrders'

export const useVendorOrders = (initialOrders: Order[]) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  const [newStatus, setNewStatus] = useState<Order['status']>('processing')

  const filteredOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [orders, searchQuery])

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order)
    setDetailsDialogOpen(true)
  }

  const handleStatusChange = (order: Order) => {
    setSelectedOrder(order)
    setNewStatus(order.status)
    setStatusDialogOpen(true)
  }

  const handleUpdateStatus = () => {
    if (selectedOrder) {
      setOrders(
        orders.map((o) =>
          o.id === selectedOrder.id ? { ...o, status: newStatus } : o
        )
      )
      setStatusDialogOpen(false)
      setSelectedOrder(null)
    }
  }

  const handleExportOrder = (order: Order) => {
    // TODO: Implement export functionality
    console.log('Exporting order:', order.id)
  }

  const handleEmailCustomer = (order: Order) => {
    // TODO: Implement email functionality
    window.location.href = `mailto:${order.customer.email}`
  }

  return {
    orders,
    filteredOrders,
    searchQuery,
    setSearchQuery,
    selectedOrder,
    detailsDialogOpen,
    setDetailsDialogOpen,
    statusDialogOpen,
    setStatusDialogOpen,
    newStatus,
    setNewStatus,
    handleViewDetails,
    handleStatusChange,
    handleUpdateStatus,
    handleExportOrder,
    handleEmailCustomer,
  }
}
