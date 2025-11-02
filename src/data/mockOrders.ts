export interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  image: string
}

export interface Order {
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

export const mockOrders: Order[] = [
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
  {
    id: 'ORD-005',
    customer: {
      name: 'David Brown',
      email: 'david@example.com',
      phone: '+234 806 555 1234',
      address: '555 Cedar Lane, Ibadan, Nigeria',
    },
    items: [
      {
        id: '1',
        name: 'Premium Wireless Headphones',
        quantity: 2,
        price: 45000,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100',
      },
      {
        id: '4',
        name: 'Wireless Mouse Pro',
        quantity: 1,
        price: 8500,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100',
      },
    ],
    total: 98500,
    status: 'cancelled',
    paymentStatus: 'failed',
    date: '1 week ago',
  },
]
