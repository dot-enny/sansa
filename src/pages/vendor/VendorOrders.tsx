import React from 'react'
import { useVendorOrders } from '@/hooks/useVendorOrders'
import { mockOrders } from '@/data/mockOrders'
import { Header } from '@/components/organisms/vendor/orders/Header'
import { SearchBar } from '@/components/organisms/vendor/orders/SearchBar'
import { OrdersTable } from '@/components/organisms/vendor/orders/OrdersTable'
import { OrderDetailsDialog } from '@/components/organisms/vendor/orders/OrderDetailsDialog'
import { UpdateStatusDialog } from '@/components/organisms/vendor/orders/UpdateStatusDialog'
import { EmptyState } from '@/components/organisms/vendor/orders/EmptyState'

const VendorOrders: React.FC = () => {
  const {
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
  } = useVendorOrders(mockOrders)

  const hasSearch = searchQuery !== ''

  return (
    <div className="relative max-w-7xl mx-auto pb-12">
      {/* Enhanced ambient background layers for depth */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
        <div className="absolute top-[10%] right-[15%] w-[600px] h-[600px] bg-linear-to-br from-primary/8 to-transparent rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute bottom-[15%] left-[10%] w-[500px] h-[500px] bg-linear-to-tr from-secondary/6 to-transparent rounded-full blur-[130px] animate-pulse" style={{ animationDuration: '9s', animationDelay: '2s' }} />
        <div className="absolute top-[50%] left-[50%] w-[400px] h-[400px] bg-linear-to-bl from-primary/4 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '15s', animationDelay: '5s' }} />
      </div>

      <Header />

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredOrders={filteredOrders}
        totalOrders={orders.length}
      />

      {filteredOrders.length > 0 ? (
        <OrdersTable
          orders={filteredOrders}
          onViewDetails={handleViewDetails}
          onStatusChange={handleStatusChange}
          onExportOrder={handleExportOrder}
          onEmailCustomer={handleEmailCustomer}
        />
      ) : (
        <EmptyState hasSearch={hasSearch} />
      )}

      <OrderDetailsDialog
        open={detailsDialogOpen}
        order={selectedOrder}
        onOpenChange={setDetailsDialogOpen}
      />

      <UpdateStatusDialog
        open={statusDialogOpen}
        order={selectedOrder}
        newStatus={newStatus}
        onOpenChange={setStatusDialogOpen}
        onStatusChange={setNewStatus}
        onConfirm={handleUpdateStatus}
      />
    </div>
  )
}

export default VendorOrders

