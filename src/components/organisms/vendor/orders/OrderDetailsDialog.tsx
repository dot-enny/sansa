import { X, Package, User, MapPin, Phone, Mail, CreditCard } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Order } from '@/data/mockOrders'
import {
  formatPrice,
  getStatusColor,
  getStatusLabel,
  getStatusIcon,
  getPaymentStatusColor,
  getPaymentStatusLabel,
} from '@/utils/orderUtils'

interface OrderDetailsDialogProps {
  open: boolean
  order: Order | null
  onOpenChange: (open: boolean) => void
}

export const OrderDetailsDialog = ({
  open,
  order,
  onOpenChange,
}: OrderDetailsDialogProps) => {
  if (!order) return null

  const StatusIcon = getStatusIcon(order.status)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">Order Details</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="hover:bg-primary/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted/20">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Order ID</p>
              <p className="font-semibold text-sm">{order.id}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Date</p>
              <p className="text-sm">{order.date}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <Badge
                variant="outline"
                className={`text-xs flex items-center gap-1 w-fit ${getStatusColor(order.status)}`}
              >
                <StatusIcon className="w-3 h-3" />
                {getStatusLabel(order.status)}
              </Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Payment Status</p>
              <Badge
                variant="outline"
                className={`text-xs ${getPaymentStatusColor(order.paymentStatus)}`}
              >
                {getPaymentStatusLabel(order.paymentStatus)}
              </Badge>
            </div>
            {order.trackingNumber && (
              <div className="col-span-2">
                <p className="text-xs text-muted-foreground mb-1">Tracking Number</p>
                <p className="font-mono text-sm">{order.trackingNumber}</p>
              </div>
            )}
          </div>

          {/* Customer Info */}
          <div>
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Customer Information
            </h3>
            <div className="space-y-2 p-4 rounded-lg bg-muted/20">
              <div className="flex items-start gap-2">
                <User className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="text-sm font-medium">{order.customer.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm">{order.customer.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm">{order.customer.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Shipping Address</p>
                  <p className="text-sm">{order.customer.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Order Items ({order.items.length})
            </h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/20 border border-border/40"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{formatPrice(item.price)}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Total */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                <span className="font-semibold">Order Total</span>
              </div>
              <span className="text-xl font-bold text-primary">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
