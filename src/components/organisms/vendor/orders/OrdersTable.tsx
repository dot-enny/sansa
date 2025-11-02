import { Eye, MoreHorizontal, Download, Mail, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Order } from '@/data/mockOrders'
import {
  formatPrice,
  getStatusColor,
  getStatusLabel,
  getStatusIcon,
  getPaymentStatusColor,
  getPaymentStatusLabel,
} from '@/utils/orderUtils'

interface OrdersTableProps {
  orders: Order[]
  onViewDetails: (order: Order) => void
  onStatusChange: (order: Order) => void
  onExportOrder: (order: Order) => void
  onEmailCustomer: (order: Order) => void
}

export const OrdersTable = ({
  orders,
  onViewDetails,
  onStatusChange,
  onExportOrder,
  onEmailCustomer,
}: OrdersTableProps) => {
  return (
    <div className="relative rounded-xl border border-border/40 bg-card/30 backdrop-blur-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border/40 hover:bg-transparent">
            <TableHead className="text-xs text-muted-foreground font-medium">Order ID</TableHead>
            <TableHead className="text-xs text-muted-foreground font-medium">Customer</TableHead>
            <TableHead className="text-xs text-muted-foreground font-medium">Items</TableHead>
            <TableHead className="text-xs text-muted-foreground font-medium">Total</TableHead>
            <TableHead className="text-xs text-muted-foreground font-medium">Status</TableHead>
            <TableHead className="text-xs text-muted-foreground font-medium">Payment</TableHead>
            <TableHead className="text-xs text-muted-foreground font-medium">Date</TableHead>
            <TableHead className="text-xs text-muted-foreground font-medium text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const StatusIcon = getStatusIcon(order.status)
            return (
              <TableRow
                key={order.id}
                className="border-border/40 hover:bg-card/40 transition-colors cursor-pointer"
                onClick={() => onViewDetails(order)}
              >
                <TableCell className="font-medium text-sm">{order.id}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">{order.customer.name}</p>
                    <p className="text-xs text-muted-foreground">{order.customer.email}</p>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {order.items.length} item{order.items.length > 1 ? 's' : ''}
                </TableCell>
                <TableCell className="font-semibold text-sm">{formatPrice(order.total)}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`text-xs flex items-center gap-1 w-fit ${getStatusColor(order.status)}`}
                  >
                    <StatusIcon className="w-3 h-3" />
                    {getStatusLabel(order.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`text-xs ${getPaymentStatusColor(order.paymentStatus)}`}
                  >
                    {getPaymentStatusLabel(order.paymentStatus)}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{order.date}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          onViewDetails(order)
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          onStatusChange(order)
                        }}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Update Status
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          onEmailCustomer(order)
                        }}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email Customer
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          onExportOrder(order)
                        }}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export Order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
