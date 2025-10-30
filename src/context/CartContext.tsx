import React, { createContext, useContext, useState } from 'react'
import type { Product } from '../components/molecules/ProductCard'

type CartItem = {
  product: Product
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  add: (p: Product, qty?: number) => void
  remove: (productId: string | number) => void
  clear: () => void
  updateQty: (productId: string | number, qty: number) => void
  totalItems: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])

  const add = (p: Product, qty = 1) => {
    setItems((cur) => {
      const found = cur.find((it) => String(it.product.id) === String(p.id))
      if (found) {
        return cur.map((it) =>
          String(it.product.id) === String(p.id) ? { ...it, quantity: it.quantity + qty } : it,
        )
      }
      return [...cur, { product: p, quantity: qty }]
    })
  }

  const remove = (productId: string | number) => {
    setItems((cur) => cur.filter((it) => String(it.product.id) !== String(productId)))
  }

  const clear = () => setItems([])

  const updateQty = (productId: string | number, qty: number) => {
    if (qty <= 0) return remove(productId)
    setItems((cur) => cur.map((it) => (String(it.product.id) === String(productId) ? { ...it, quantity: qty } : it)))
  }

  const totalItems = items.reduce((s, it) => s + it.quantity, 0)

  return (
    <CartContext.Provider value={{ items, add, remove, clear, updateQty, totalItems }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
