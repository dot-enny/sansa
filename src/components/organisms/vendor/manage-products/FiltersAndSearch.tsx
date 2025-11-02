import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Search } from "lucide-react"
import type { Dispatch, SetStateAction } from "react"

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

interface FiltersAndSearchProps {
    searchQuery: string,
    setSearchQuery: (val: string) => void,
    statusFilter: string,
    setStatusFilter: Dispatch<SetStateAction<string>>,
    filteredProducts: Product[],
    categories: string[],
    categoryFilter: string,
    setCategoryFilter: Dispatch<SetStateAction<string>>,
    products: Product[]
}

export const FiltersAndSearch = ({ searchQuery, setSearchQuery, statusFilter, setStatusFilter, filteredProducts, categories, categoryFilter, setCategoryFilter, products }: FiltersAndSearchProps) => {
    return (
        <div className="mb-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                    <div className="relative">
                        <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <Input
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-0 border-b border-white/10 rounded-none pl-6 pr-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-primary transition-all duration-300 placeholder:text-muted-foreground/40"
                        />
                    </div>
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 focus:ring-0 focus:outline-none focus-visible:border-primary transition-all duration-300">
                        <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="bg-transparent border-0 border-b border-white/10 rounded-none px-0 focus:ring-0 focus:outline-none focus-visible:border-primary transition-all duration-300">
                        <SelectValue placeholder="All Categories" />
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

            <div className="flex items-center justify-between text-xs text-muted-foreground/70 px-1">
                <span>
                    Showing {filteredProducts.length} of {products.length} products
                </span>
                {filteredProducts.length > 0 && (
                    <span>Total sales: {filteredProducts.reduce((sum, p) => sum + p.sales, 0)}</span>
                )}
            </div>
        </div>
    )
}