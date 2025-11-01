import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Package,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: 'active' | 'draft' | 'out-of-stock'
  image: string
  sales: number
}

const ManageProducts: React.FC = () => {
  // Mock data - replace with API call
  const [products, setProducts] = useState<Product[]>([
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
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)

  const categories = ['All', 'Electronics', 'Fashion', 'Home & Garden', 'Sports']

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' || product.status === statusFilter
    const matchesCategory =
      categoryFilter === 'all' || product.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

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

  const getStatusBadge = (status: Product['status']) => {
    const variants = {
      active: 'default',
      draft: 'secondary',
      'out-of-stock': 'destructive',
    } as const

    const labels = {
      active: 'Active',
      draft: 'Draft',
      'out-of-stock': 'Out of Stock',
    }

    return (
      <Badge variant={variants[status]} className="capitalize">
        {labels[status]}
      </Badge>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Manage Products
          </h1>
          <p className="text-muted-foreground">
            View and manage your product inventory
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/add-product">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.slice(1).map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
          <span>
            Showing {filteredProducts.length} of {products.length} products
          </span>
        </div>
      </div>

      {/* Products Table */}
      {filteredProducts.length > 0 ? (
        <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg border border-border"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell>
                  <TableCell>
                    <span
                      className={
                        product.stock === 0
                          ? 'text-destructive font-semibold'
                          : product.stock < 10
                          ? 'text-orange-600 font-semibold'
                          : ''
                      }
                    >
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell>{product.sales}</TableCell>
                  <TableCell>{getStatusBadge(product.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleToggleStatus(product.id)}
                        >
                          {product.status === 'active' ? (
                            <>
                              <EyeOff className="w-4 h-4 mr-2" />
                              Set as Draft
                            </>
                          ) : (
                            <>
                              <Eye className="w-4 h-4 mr-2" />
                              Set as Active
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(product)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Product
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No products found
          </h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'Get started by adding your first product'}
          </p>
          {!searchQuery && statusFilter === 'all' && categoryFilter === 'all' && (
            <Button asChild>
              <Link to="/dashboard/add-product">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Product
              </Link>
            </Button>
          )}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{productToDelete?.name}"? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ManageProducts
