// Withdraw dialog component for Wallet page

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
import { ArrowUpRight, Building2, CreditCard, AlertTriangle } from 'lucide-react'
import { mockPaymentMethods, mockWalletBalance } from '@/data/lender/mockWalletData'
import { formatCurrency } from '@/utils/walletUtils'

interface WithdrawDialogProps {
  isOpen: boolean
  onClose: () => void
  onWithdraw: (amount: number, method: string) => void
}

export const WithdrawDialog: React.FC<WithdrawDialogProps> = ({
  isOpen,
  onClose,
  onWithdraw,
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

    if (numAmount > mockWalletBalance.available) {
      alert('Insufficient balance')
      return
    }

    setIsProcessing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    onWithdraw(numAmount, selectedMethod)
    setIsProcessing(false)
    setAmount('')
  }

  const selectedPaymentMethod = mockPaymentMethods.find(m => m.id === selectedMethod)
  const numAmount = parseFloat(amount)
  const exceedsBalance = !isNaN(numAmount) && numAmount > mockWalletBalance.available

  const quickAmounts = [100000, 500000, 1000000, 5000000].filter(
    qa => qa <= mockWalletBalance.available
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-orange-500/25 to-orange-600/10 flex items-center justify-center shadow-md shadow-orange-500/20">
              <ArrowUpRight className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <DialogTitle className="text-xl">Withdraw Funds</DialogTitle>
              <DialogDescription>
                Transfer money from your wallet
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Available Balance */}
          <div className="p-4 rounded-lg bg-muted/50 border border-border/60">
            <p className="text-xs text-muted-foreground mb-1">Available Balance</p>
            <p className="text-2xl font-bold">{formatCurrency(mockWalletBalance.available)}</p>
          </div>

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
              className={`h-14 text-lg font-semibold bg-card/60 backdrop-blur-xl border-border/60 shadow-md ${
                exceedsBalance ? 'border-red-500/50 focus:border-red-500' : ''
              }`}
              required
            />

            {exceedsBalance && (
              <div className="flex items-center gap-2 text-red-600 text-xs">
                <AlertTriangle className="w-3 h-3" />
                <span>Amount exceeds available balance</span>
              </div>
            )}

            {/* Quick amounts */}
            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map(quickAmount => (
                <Button
                  key={quickAmount}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(quickAmount.toString())}
                  className="text-xs hover:bg-orange-500/10 hover:border-orange-500/30 hover:text-orange-700"
                >
                  {formatCurrency(quickAmount).replace('₦', '₦')}
                </Button>
              ))}
              {mockWalletBalance.available > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(mockWalletBalance.available.toString())}
                  className="col-span-4 text-xs hover:bg-orange-500/10 hover:border-orange-500/30 hover:text-orange-700"
                >
                  Withdraw All
                </Button>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <Label htmlFor="method" className="text-sm font-semibold">
              Withdraw To
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
          {amount && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0 && !exceedsBalance && (
            <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/20">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">You're withdrawing</span>
                <span className="font-bold text-orange-600 text-lg">
                  {formatCurrency(parseFloat(amount))}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-muted-foreground">To</span>
                <span className="font-medium">{selectedPaymentMethod?.name} {selectedPaymentMethod?.details}</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-border/40">
                <span className="text-muted-foreground">Remaining Balance</span>
                <span className="font-semibold">
                  {formatCurrency(mockWalletBalance.available - parseFloat(amount))}
                </span>
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
              disabled={!amount || isProcessing || exceedsBalance}
              className="flex-1 bg-linear-to-br from-orange-500/90 to-orange-600/90 hover:from-orange-500 hover:to-orange-600 shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30"
            >
              {isProcessing ? 'Processing...' : 'Confirm Withdrawal'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
