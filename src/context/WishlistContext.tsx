import React, { createContext, useContext, useState } from 'react'
import type { Product } from '../components/molecules/ProductCard'

type WishlistContextValue = {
  items: Product[]
  add: (p: Product) => void
  remove: (productId: string | number) => void
  toggle: (p: Product) => void
  has: (productId: string | number) => boolean
  count: number
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined)

export const useWishlist = () => {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Product[]>([])

  const has = (productId: string | number) => items.some((i) => String(i.id) === String(productId))

  const add = (p: Product) => {
    setItems((cur) => (has(p.id) ? cur : [...cur, p]))
  }

  const remove = (productId: string | number) => {
    setItems((cur) => cur.filter((i) => String(i.id) !== String(productId)))
  }

  const toggle = (p: Product) => {
    if (has(p.id)) remove(p.id)
    else add(p)
  }

  return (
    <WishlistContext.Provider value={{ items, add, remove, toggle, has, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  )
}

export default WishlistContext
