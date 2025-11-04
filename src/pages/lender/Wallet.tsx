// Lender Wallet page - manage wallet and view transactions

import React from 'react'
import { Receipt } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useWallet } from '@/hooks/lender/useWallet'
import { mockTransactions, mockWalletBalance } from '@/data/lender/mockWalletData'
import { BalanceCard } from '@/components/organisms/lender/wallet/BalanceCard'
import { QuickActions } from '@/components/organisms/lender/wallet/QuickActions'
import { TransactionFilters } from '@/components/organisms/lender/wallet/TransactionFilters'
import { TransactionList } from '@/components/organisms/lender/wallet/TransactionList'
import { DepositDialog } from '@/components/organisms/lender/wallet/DepositDialog'
import { WithdrawDialog } from '@/components/organisms/lender/wallet/WithdrawDialog'

const Wallet: React.FC = () => {
  const {
    filteredTransactions,
    searchQuery,
    setSearchQuery,
    typeFilters,
    toggleTypeFilter,
    statusFilters,
    toggleStatusFilter,
    clearAllFilters,
    hasActiveFilters,
    isDepositDialogOpen,
    isWithdrawDialogOpen,
    openDepositDialog,
    closeDepositDialog,
    openWithdrawDialog,
    closeWithdrawDialog,
    handleDeposit,
    handleWithdraw,
  } = useWallet(mockTransactions)

  return (
    <div className="relative max-w-7xl mx-auto pb-12">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
        <div
          className="absolute top-[10%] right-[15%] w-[600px] h-[600px] bg-linear-to-br from-green-500/8 to-transparent rounded-full blur-[150px] animate-pulse"
          style={{ animationDuration: '12s' }}
        />
        <div
          className="absolute bottom-[15%] left-[10%] w-[500px] h-[500px] bg-linear-to-tr from-orange-500/6 to-transparent rounded-full blur-[130px] animate-pulse"
          style={{ animationDuration: '9s', animationDelay: '2s' }}
        />
        <div
          className="absolute top-[50%] left-[50%] w-[400px] h-[400px] bg-linear-to-bl from-blue-500/4 to-transparent rounded-full blur-[100px] animate-pulse"
          style={{ animationDuration: '15s', animationDelay: '5s' }}
        />
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Wallet</h1>
        <p className="text-muted-foreground">
          Manage your funds and view transaction history
        </p>
      </div>

      {/* Balance and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <BalanceCard balance={mockWalletBalance} />
        </div>
        <div>
          <QuickActions
            onDeposit={openDepositDialog}
            onWithdraw={openWithdrawDialog}
          />
        </div>
      </div>

      {/* Transaction Filters */}
      <div className="mb-6">
        <TransactionFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          typeFilters={typeFilters}
          onToggleType={toggleTypeFilter}
          statusFilters={statusFilters}
          onToggleStatus={toggleStatusFilter}
          onClearAll={clearAllFilters}
          hasActiveFilters={hasActiveFilters}
          resultsCount={filteredTransactions.length}
        />
      </div>

      {/* Transaction List */}
      {filteredTransactions.length > 0 ? (
        <TransactionList transactions={filteredTransactions} />
      ) : (
        <div className="relative p-16 rounded-xl bg-card/60 backdrop-blur-xl border border-border/60 shadow-xl shadow-black/10">
          <div className="text-center max-w-md mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
              <Receipt className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">No transactions found</h3>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              {hasActiveFilters
                ? 'Try adjusting your filters to see more transactions.'
                : 'Your transaction history will appear here.'}
            </p>
            {hasActiveFilters && (
              <Button onClick={clearAllFilters} variant="outline" className="shadow-md hover:shadow-lg transition-all">
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Dialogs */}
      <DepositDialog
        isOpen={isDepositDialogOpen}
        onClose={closeDepositDialog}
        onDeposit={handleDeposit}
      />

      <WithdrawDialog
        isOpen={isWithdrawDialogOpen}
        onClose={closeWithdrawDialog}
        onWithdraw={handleWithdraw}
      />
    </div>
  )
}

export default Wallet
