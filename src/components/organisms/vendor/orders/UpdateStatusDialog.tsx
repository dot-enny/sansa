import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import type { Order } from '@/data/mockOrders'
import { getStatusLabel } from '@/utils/orderUtils'

interface UpdateStatusDialogProps {
  open: boolean
  order: Order | null
  newStatus: Order['status']
  onOpenChange: (open: boolean) => void
  onStatusChange: (status: Order['status']) => void
  onConfirm: () => void
}

export const UpdateStatusDialog = ({
  open,
  order,
  newStatus,
  onOpenChange,
  onStatusChange,
  onConfirm,
}: UpdateStatusDialogProps) => {
  const statuses: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogDescription>
            Change the status of order <span className="font-semibold text-foreground">{order?.id}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-medium">
              Order Status
            </Label>
            <Select value={newStatus} onValueChange={onStatusChange}>
              <SelectTrigger id="status" className="bg-transparent border-0 border-b border-border/40 rounded-none focus:ring-0 focus:ring-offset-0 focus:border-primary transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {getStatusLabel(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            Update Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
