import type { Product } from '../components/molecules/ProductCard'

export type OrderItem = {
  productId: string | number
  quantity: number
  price: string
}

export type Order = {
  id: string
  customerName: string
  email: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: OrderItem[]
  total: string
  shippingAddress?: string
}

// Sample orders referencing product IDs from PRODUCTS mock
export const ORDERS: Order[] = [
  {
    id: 'ord_1001',
    customerName: 'Alice Johnson',
    email: 'alice@example.com',
    date: '2025-10-28',
    status: 'shipped',
    items: [
      { productId: 1, quantity: 2, price: '$2.00' },
      { productId: 9, quantity: 1, price: '$129.99' },
    ],
    total: '$133.99',
    shippingAddress: '123 Main St, New York, NY',
  },
  {
    id: 'ord_1002',
    customerName: 'Brian Mills',
    email: 'brian@example.com',
    date: '2025-10-25',
    status: 'delivered',
    items: [{ productId: 5, quantity: 3, price: '$27.99' }],
    total: '$83.97',
    shippingAddress: '456 Oak Ave, Portland, OR',
  },
  {
    id: 'ord_1003',
    customerName: 'Clara Oswald',
    email: 'clara@example.com',
    date: '2025-10-29',
    status: 'processing',
    items: [
      { productId: 10, quantity: 1, price: '$59.00' },
      { productId: 11, quantity: 5, price: '$2.49' },
    ],
    total: '$81.45',
    shippingAddress: '789 Pine Rd, Austin, TX',
  },
]

export default ORDERS
