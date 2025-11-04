// Deposit dialog component for Wallet page

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowDownLeft, Building2, CreditCard } from 'lucide-react'
import { mockPaymentMethods } from '@/data/lender/mockWalletData'
import { formatCurrency } from '@/utils/walletUtils'

interface DepositDialogProps {
  isOpen: boolean
  onClose: () => void
  onDeposit: (amount: number, method: string) => void
}

export const DepositDialog: React.FC<DepositDialogProps> = ({
  isOpen,
  onClose,
  onDeposit,
}) => {
  const [amount, setAmount] = useState('')
  const [selectedMethod, setSelectedMethod] = useState(mockPaymentMethods[0].id)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const numAmount = parseFloat(amount)

    if (isNaN(numAmount) || numAmount <= 0) {
      alert('Please enter a valid amount')
      return
    }

    setIsProcessing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    onDeposit(numAmount, selectedMethod)
    setIsProcessing(false)
    setAmount('')
  }

  const selectedPaymentMethod = mockPaymentMethods.find(m => m.id === selectedMethod)

  const quickAmounts = [100000, 500000, 1000000, 5000000]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-green-500/25 to-green-600/10 flex items-center justify-center shadow-md shadow-green-500/20">
              <ArrowDownLeft className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <DialogTitle className="text-xl">Deposit Funds</DialogTitle>
              <DialogDescription>
                Add money to your wallet
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Amount Input */}
          <div className="space-y-3">
            <Label htmlFor="amount" className="text-sm font-semibold">
              Amount (NGN)
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="h-14 text-lg font-semibold bg-card/60 backdrop-blur-xl border-border/60 shadow-md"
              required
            />

            {/* Quick amounts */}
            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map(quickAmount => (
                <Button
                  key={quickAmount}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(quickAmount.toString())}
                  className="text-xs hover:bg-green-500/10 hover:border-green-500/30 hover:text-green-700"
                >
                  {formatCurrency(quickAmount).replace('₦', '₦')}
                </Button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <Label htmlFor="method" className="text-sm font-semibold">
              Payment Method
            </Label>
            <Select value={selectedMethod} onValueChange={setSelectedMethod}>
              <SelectTrigger className="h-12 bg-card/60 backdrop-blur-xl border-border/60 shadow-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mockPaymentMethods.map(method => (
                  <SelectItem key={method.id} value={method.id}>
                    <div className="flex items-center gap-3">
                      {method.type === 'bank' ? (
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <CreditCard className="w-4 h-4 text-muted-foreground" />
                      )}
                      <div>
                        <span className="font-medium">{method.name}</span>
                        <span className="text-muted-foreground ml-2">{method.details}</span>
                        {method.isPrimary && (
                          <span className="text-xs text-primary ml-2">(Primary)</span>
                        )}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Summary */}
          {amount && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0 && (
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">You're depositing</span>
                <span className="font-bold text-green-600 text-lg">
                  {formatCurrency(parseFloat(amount))}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">To</span>
                <span className="font-medium">{selectedPaymentMethod?.name} {selectedPaymentMethod?.details}</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!amount || isProcessing}
              className="flex-1 bg-linear-to-br from-green-500/90 to-green-600/90 hover:from-green-500 hover:to-green-600 shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30"
            >
              {isProcessing ? 'Processing...' : 'Confirm Deposit'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
