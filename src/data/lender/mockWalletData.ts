// Wallet data structures and mock data for Lender Wallet page

export type TransactionType = 'deposit' | 'withdraw' | 'investment' | 'return' | 'fee'
export type TransactionStatus = 'completed' | 'pending' | 'failed'

export interface Transaction {
  id: string
  date: string
  type: TransactionType
  description: string
  amount: number
  status: TransactionStatus
  reference?: string
  balanceAfter: number
}

export interface WalletBalance {
  available: number
  invested: number
  pending: number
  total: number
}

export interface PaymentMethod {
  id: string
  type: 'bank' | 'card'
  name: string
  details: string
  isPrimary: boolean
}

// Mock wallet balance
export const mockWalletBalance: WalletBalance = {
  available: 15500000, // ₦15.5M available
  invested: 42000000, // ₦42M currently invested
  pending: 2500000, // ₦2.5M pending returns
  total: 60000000, // ₦60M total
}

// Mock payment methods
export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm-001',
    type: 'bank',
    name: 'GTBank',
    details: '•••• 4532',
    isPrimary: true,
  },
  {
    id: 'pm-002',
    type: 'card',
    name: 'Visa',
    details: '•••• 8765',
    isPrimary: false,
  },
]

// Mock transaction history
export const mockTransactions: Transaction[] = [
  {
    id: 'TXN-001',
    date: '2024-11-04T10:30:00',
    type: 'return',
    description: 'Investment Return - Fashion Hub Nigeria',
    amount: 455208,
    status: 'completed',
    reference: 'INV-001',
    balanceAfter: 15500000,
  },
  {
    id: 'TXN-002',
    date: '2024-11-03T14:20:00',
    type: 'deposit',
    description: 'Bank Transfer Deposit',
    amount: 5000000,
    status: 'completed',
    reference: 'DEP-20241103-001',
    balanceAfter: 15044792,
  },
  {
    id: 'TXN-003',
    date: '2024-11-02T09:15:00',
    type: 'investment',
    description: 'New Investment - TechGear Store',
    amount: -3000000,
    status: 'completed',
    reference: 'INV-013',
    balanceAfter: 10044792,
  },
  {
    id: 'TXN-004',
    date: '2024-11-01T16:45:00',
    type: 'return',
    description: 'Investment Return - Beauty & Glow',
    amount: 182500,
    status: 'completed',
    reference: 'INV-004',
    balanceAfter: 13044792,
  },
  {
    id: 'TXN-005',
    date: '2024-10-31T11:00:00',
    type: 'withdraw',
    description: 'Bank Transfer Withdrawal',
    amount: -2000000,
    status: 'completed',
    reference: 'WTH-20241031-001',
    balanceAfter: 12862292,
  },
  {
    id: 'TXN-006',
    date: '2024-10-30T13:30:00',
    type: 'fee',
    description: 'Platform Service Fee',
    amount: -25000,
    status: 'completed',
    reference: 'FEE-202410',
    balanceAfter: 14862292,
  },
  {
    id: 'TXN-007',
    date: '2024-10-29T10:20:00',
    type: 'return',
    description: 'Investment Return - Sports Arena',
    amount: 305000,
    status: 'completed',
    reference: 'INV-005',
    balanceAfter: 14887292,
  },
  {
    id: 'TXN-008',
    date: '2024-10-28T15:10:00',
    type: 'investment',
    description: 'New Investment - Organic Farms Market',
    amount: -7500000,
    status: 'completed',
    reference: 'INV-009',
    balanceAfter: 14582292,
  },
  {
    id: 'TXN-009',
    date: '2024-10-27T09:45:00',
    type: 'return',
    description: 'Investment Return - Gadget Plus',
    amount: 641667,
    status: 'completed',
    reference: 'INV-008',
    balanceAfter: 22082292,
  },
  {
    id: 'TXN-010',
    date: '2024-10-26T14:00:00',
    type: 'deposit',
    description: 'Bank Transfer Deposit',
    amount: 10000000,
    status: 'completed',
    reference: 'DEP-20241026-001',
    balanceAfter: 21440625,
  },
  {
    id: 'TXN-011',
    date: '2024-10-25T11:30:00',
    type: 'return',
    description: 'Investment Return - Book Haven',
    amount: 268750,
    status: 'completed',
    reference: 'INV-007',
    balanceAfter: 11440625,
  },
  {
    id: 'TXN-012',
    date: '2024-10-24T16:20:00',
    type: 'investment',
    description: 'New Investment - Pet Paradise',
    amount: -3000000,
    status: 'completed',
    reference: 'INV-010',
    balanceAfter: 11171875,
  },
  {
    id: 'TXN-013',
    date: '2024-10-23T10:15:00',
    type: 'return',
    description: 'Investment Return - TechGear Store',
    amount: 533333,
    status: 'completed',
    reference: 'INV-002',
    balanceAfter: 14171875,
  },
  {
    id: 'TXN-014',
    date: '2024-10-22T13:45:00',
    type: 'withdraw',
    description: 'Bank Transfer Withdrawal',
    amount: -5000000,
    status: 'completed',
    reference: 'WTH-20241022-001',
    balanceAfter: 13638542,
  },
  {
    id: 'TXN-015',
    date: '2024-10-21T09:30:00',
    type: 'deposit',
    description: 'Bank Transfer Deposit',
    amount: 8000000,
    status: 'completed',
    reference: 'DEP-20241021-001',
    balanceAfter: 18638542,
  },
  {
    id: 'TXN-016',
    date: '2024-10-20T15:00:00',
    type: 'return',
    description: 'Investment Return - Fashion Hub Nigeria',
    amount: 455208,
    status: 'pending',
    reference: 'INV-001',
    balanceAfter: 10638542,
  },
  {
    id: 'TXN-017',
    date: '2024-10-19T11:20:00',
    type: 'investment',
    description: 'New Investment - Home Essentials Co',
    amount: -3500000,
    status: 'completed',
    reference: 'INV-003',
    balanceAfter: 10183334,
  },
  {
    id: 'TXN-018',
    date: '2024-10-18T14:30:00',
    type: 'deposit',
    description: 'Bank Transfer Deposit',
    amount: 12000000,
    status: 'completed',
    reference: 'DEP-20241018-001',
    balanceAfter: 13683334,
  },
  {
    id: 'TXN-019',
    date: '2024-10-17T10:45:00',
    type: 'fee',
    description: 'Transaction Fee',
    amount: -15000,
    status: 'completed',
    reference: 'FEE-TXN-019',
    balanceAfter: 1683334,
  },
  {
    id: 'TXN-020',
    date: '2024-10-16T16:00:00',
    type: 'return',
    description: 'Investment Return - Beauty & Glow',
    amount: 182500,
    status: 'completed',
    reference: 'INV-004',
    balanceAfter: 1698334,
  },
]

// Calculate wallet statistics
export const calculateWalletStats = (transactions: Transaction[]) => {
  const last30Days = transactions.filter(txn => {
    const txnDate = new Date(txn.date)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    return txnDate >= thirtyDaysAgo && txn.status === 'completed'
  })

  const totalDeposits = last30Days
    .filter(txn => txn.type === 'deposit')
    .reduce((sum, txn) => sum + txn.amount, 0)

  const totalWithdrawals = last30Days
    .filter(txn => txn.type === 'withdraw')
    .reduce((sum, txn) => sum + Math.abs(txn.amount), 0)

  const totalReturns = last30Days
    .filter(txn => txn.type === 'return')
    .reduce((sum, txn) => sum + txn.amount, 0)

  const totalInvestments = last30Days
    .filter(txn => txn.type === 'investment')
    .reduce((sum, txn) => sum + Math.abs(txn.amount), 0)

  return {
    totalDeposits,
    totalWithdrawals,
    totalReturns,
    totalInvestments,
    netFlow: totalDeposits + totalReturns - totalWithdrawals - totalInvestments,
  }
}
