import React, { useState } from 'react'
import {
  Search,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Eye,
  MoreVertical,
  Download,
  Mail,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  image: string
}

interface Order {
  id: string
  customer: {
    name: string
    email: string
    phone: string
    address: string
  }
  items: OrderItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'paid' | 'pending' | 'failed'
  date: string
  trackingNumber?: string
}

const VendorOrders: React.FC = () => {
  // Mock data - replace with API call
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      customer: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+234 803 123 4567',
        address: '123 Main St, Lagos, Nigeria',
      },
      items: [
        {
          id: '1',
          name: 'Premium Wireless Headphones',
          quantity: 1,
          price: 45000,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100',
        },
      ],
      total: 45000,
      status: 'pending',
      paymentStatus: 'paid',
      date: '2 hours ago',
    },
    {
      id: 'ORD-002',
      customer: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+234 805 987 6543',
        address: '456 Oak Ave, Abuja, Nigeria',
      },
      items: [
        {
          id: '2',
          name: 'Smart Watch Series 5',
          quantity: 1,
          price: 32500,
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100',
        },
      ],
      total: 32500,
      status: 'processing',
      paymentStatus: 'paid',
      date: '5 hours ago',
    },
    {
      id: 'ORD-003',
      customer: {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        phone: '+234 807 456 7890',
        address: '789 Pine Rd, Port Harcourt, Nigeria',
      },
      items: [
        {
          id: '3',
          name: 'Leather Laptop Bag',
          quantity: 2,
          price: 18000,
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100',
        },
      ],
      total: 36000,
      status: 'shipped',
      paymentStatus: 'paid',
      date: '1 day ago',
      trackingNumber: 'TRK123456789',
    },
    {
      id: 'ORD-004',
      customer: {
        name: 'Sarah Williams',
        email: 'sarah@example.com',
        phone: '+234 809 321 0987',
        address: '321 Elm St, Kano, Nigeria',
      },
      items: [
        {
          id: '4',
          name: 'Wireless Mouse Pro',
          quantity: 3,
          price: 8500,
          image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100',
        },
      ],
      total: 25500,
      status: 'delivered',
      paymentStatus: 'paid',
      date: '3 days ago',
    },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  const [newStatus, setNewStatus] = useState<Order['status']>('processing')

  const getStatusBadge = (status: Order['status']) => {
    const variants = {
      pending: { variant: 'secondary' as const, icon: Clock, label: 'Pending' },
      processing: { variant: 'default' as const, icon: Package, label: 'Processing' },
      shipped: { variant: 'default' as const, icon: Truck, label: 'Shipped' },
      delivered: { variant: 'default' as const, icon: CheckCircle, label: 'Delivered' },
      cancelled: { variant: 'destructive' as const, icon: XCircle, label: 'Cancelled' },
    }

    const config = variants[status]
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    )
  }

  const getPaymentBadge = (status: Order['paymentStatus']) => {
    const variants = {
      paid: { variant: 'default' as const, label: 'Paid' },
      pending: { variant: 'secondary' as const, label: 'Pending' },
      failed: { variant: 'destructive' as const, label: 'Failed' },
    }

    const config = variants[status]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
    }
  }

  const getOrderStats = () => {
    return {
      all: orders.length,
      pending: orders.filter((o) => o.status === 'pending').length,
      processing: orders.filter((o) => o.status === 'processing').length,
      shipped: orders.filter((o) => o.status === 'shipped').length,
      delivered: orders.filter((o) => o.status === 'delivered').length,
    }
  }

  const stats = getOrderStats()

  const OrdersTable = ({ orders }: { orders: Order[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>
              <div>
                <div className="font-medium">{order.customer.name}</div>
                <div className="text-sm text-muted-foreground">
                  {order.customer.email}
                </div>
              </div>
            </TableCell>
            <TableCell>{order.items.length}</TableCell>
            <TableCell className="font-semibold">
              {formatPrice(order.total)}
            </TableCell>
            <TableCell>{getPaymentBadge(order.paymentStatus)}</TableCell>
            <TableCell>{getStatusBadge(order.status)}</TableCell>
            <TableCell className="text-muted-foreground">{order.date}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleViewDetails(order)}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange(order)}>
                    <Package className="w-4 h-4 mr-2" />
                    Update Status
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Mail className="w-4 h-4 mr-2" />
                    Email Customer
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="w-4 h-4 mr-2" />
                    Download Invoice
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Orders</h1>
        <p className="text-muted-foreground">
          Manage and track your customer orders
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Orders</CardDescription>
            <CardTitle className="text-3xl">{stats.all}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending</CardDescription>
            <CardTitle className="text-3xl text-yellow-600">
              {stats.pending}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Processing</CardDescription>
            <CardTitle className="text-3xl text-blue-600">
              {stats.processing}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Shipped</CardDescription>
            <CardTitle className="text-3xl text-purple-600">
              {stats.shipped}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Delivered</CardDescription>
            <CardTitle className="text-3xl text-green-600">
              {stats.delivered}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by order ID or customer name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Orders Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All ({stats.all})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
          <TabsTrigger value="processing">
            Processing ({stats.processing})
          </TabsTrigger>
          <TabsTrigger value="shipped">Shipped ({stats.shipped})</TabsTrigger>
          <TabsTrigger value="delivered">
            Delivered ({stats.delivered})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardContent className="p-0">
              <OrdersTable orders={filteredOrders} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardContent className="p-0">
              <OrdersTable
                orders={filteredOrders.filter((o) => o.status === 'pending')}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processing">
          <Card>
            <CardContent className="p-0">
              <OrdersTable
                orders={filteredOrders.filter((o) => o.status === 'processing')}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipped">
          <Card>
            <CardContent className="p-0">
              <OrdersTable
                orders={filteredOrders.filter((o) => o.status === 'shipped')}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="delivered">
          <Card>
            <CardContent className="p-0">
              <OrdersTable
                orders={filteredOrders.filter((o) => o.status === 'delivered')}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Order Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Complete order information and items
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="font-semibold mb-2">Customer Information</h3>
                <div className="bg-muted rounded-lg p-4 space-y-1 text-sm">
                  <div>
                    <span className="font-medium">Name:</span>{' '}
                    {selectedOrder.customer.name}
                  </div>
                  <div>
                    <span className="font-medium">Email:</span>{' '}
                    {selectedOrder.customer.email}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span>{' '}
                    {selectedOrder.customer.phone}
                  </div>
                  <div>
                    <span className="font-medium">Address:</span>{' '}
                    {selectedOrder.customer.address}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-2">Order Items</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 bg-muted rounded-lg p-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </div>
                      </div>
                      <div className="font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(selectedOrder.total)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground mt-2">
                  <span>Payment Status</span>
                  {getPaymentBadge(selectedOrder.paymentStatus)}
                </div>
                {selectedOrder.trackingNumber && (
                  <div className="flex justify-between items-center text-sm text-muted-foreground mt-1">
                    <span>Tracking Number</span>
                    <span className="font-mono">
                      {selectedOrder.trackingNumber}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Change the status for order {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                New Status
              </label>
              <Select
                value={newStatus}
                onValueChange={(value) => setNewStatus(value as Order['status'])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setStatusDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateStatus}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default VendorOrders
