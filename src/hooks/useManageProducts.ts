import { useState, useMemo } from 'react'
import type { Product } from '@/data/mockProducts'

export const useManageProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      const matchesStatus =
        statusFilter === 'all' || product.status === statusFilter
      const matchesCategory =
        categoryFilter === 'all' || product.category === categoryFilter
      return matchesSearch && matchesStatus && matchesCategory
    })
  }, [products, searchQuery, statusFilter, categoryFilter])

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      setProducts(products.filter((p) => p.id !== productToDelete.id))
      setDeleteDialogOpen(false)
      setProductToDelete(null)
    }
  }

  const handleToggleStatus = (productId: string) => {
    setProducts(
      products.map((p) =>
        p.id === productId
          ? {
              ...p,
              status: p.status === 'active' ? 'draft' : 'active',
            }
          : p
      )
    )
  }

  return {
    products,
    filteredProducts,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    deleteDialogOpen,
    setDeleteDialogOpen,
    productToDelete,
    handleDeleteClick,
    handleDeleteConfirm,
    handleToggleStatus,
  }
}
