// Quick actions component for Wallet page

import React from 'react'
import { Plus, Minus, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface QuickActionsProps {
  onDeposit: () => void
  onWithdraw: () => void
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onDeposit,
  onWithdraw,
}) => {
  return (
    <div className="relative p-6 rounded-xl bg-card/60 backdrop-blur-xl border border-border/60 shadow-lg shadow-black/5">
      <h3 className="text-sm font-semibold mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-3 gap-3">
        {/* Deposit */}
        <Button
          onClick={onDeposit}
          className="flex-col h-auto py-4 gap-2 bg-linear-to-br from-green-500/20 to-green-600/10 hover:from-green-500/30 hover:to-green-600/20 text-green-700 hover:text-green-800 border border-green-500/20 hover:border-green-500/40 shadow-md shadow-green-500/10 hover:shadow-lg hover:shadow-green-500/20 transition-all hover:-translate-y-0.5"
        >
          <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold">Deposit</span>
        </Button>

        {/* Withdraw */}
        <Button
          onClick={onWithdraw}
          variant="outline"
          className="flex-col h-auto py-4 gap-2 hover:bg-orange-500/5 hover:border-orange-500/30 hover:text-orange-700 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
            <Minus className="w-5 h-5 text-orange-600" />
          </div>
          <span className="text-xs font-semibold">Withdraw</span>
        </Button>

        {/* Refresh (placeholder for future feature) */}
        <Button
          variant="outline"
          disabled
          className="flex-col h-auto py-4 gap-2 opacity-50 cursor-not-allowed shadow-md"
        >
          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
            <RefreshCw className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold">Auto-Invest</span>
        </Button>
      </div>
    </div>
  )
}
