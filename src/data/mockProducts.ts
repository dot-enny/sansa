export interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: 'active' | 'draft' | 'out-of-stock'
  image: string
  sales: number
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    category: 'Electronics',
    price: 45000,
    stock: 25,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100',
    sales: 156,
  },
  {
    id: '2',
    name: 'Smart Watch Series 5',
    category: 'Electronics',
    price: 32500,
    stock: 0,
    status: 'out-of-stock',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100',
    sales: 89,
  },
  {
    id: '3',
    name: 'Leather Laptop Bag',
    category: 'Fashion',
    price: 18000,
    stock: 42,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100',
    sales: 234,
  },
  {
    id: '4',
    name: 'Wireless Mouse Pro',
    category: 'Electronics',
    price: 8500,
    stock: 15,
    status: 'draft',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100',
    sales: 0,
  },
]

export const categories = ['All', 'Electronics', 'Fashion', 'Home & Garden', 'Sports']
