import React from 'react'
import { useManageProducts } from '@/hooks/useManageProducts'
import { categories, mockProducts } from '@/data/mockProducts'
// import { Header } from '@/components/organisms/vendor/manage-products/Header'
import { FiltersAndSearch } from '@/components/organisms/vendor/manage-products/FiltersAndSearch'
import { ProductListItem } from '@/components/organisms/vendor/manage-products/ProductListItem'
import { EmptyState } from '@/components/organisms/vendor/manage-products/EmptyState'
import { DeleteDialog } from '@/components/organisms/vendor/manage-products/DeleteDialog'

const ManageProducts: React.FC = () => {
    const {
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
    } = useManageProducts(mockProducts)

    const hasFilters = searchQuery !== '' || statusFilter !== 'all' || categoryFilter !== 'all'

    return (
        <div className="relative max-w-7xl mx-auto pb-12">
            {/* Enhanced ambient background layers for depth */}
            <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
                <div className="absolute top-[10%] right-[15%] w-[600px] h-[600px] bg-linear-to-br from-primary/8 to-transparent rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '12s' }} />
                <div className="absolute bottom-[15%] left-[10%] w-[500px] h-[500px] bg-linear-to-tr from-secondary/6 to-transparent rounded-full blur-[130px] animate-pulse" style={{ animationDuration: '9s', animationDelay: '2s' }} />
                <div className="absolute top-[50%] left-[50%] w-[400px] h-[400px] bg-linear-to-bl from-primary/4 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '15s', animationDelay: '5s' }} />
            </div>

            {/* <Header /> */}

            <FiltersAndSearch 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                statusFilter={statusFilter} 
                setStatusFilter={setStatusFilter} 
                filteredProducts={filteredProducts} 
                categories={categories} 
                categoryFilter={categoryFilter} 
                setCategoryFilter={setCategoryFilter} 
                products={products} 
            />

            {filteredProducts.length > 0 ? (
                <div className="space-y-3 grid grid-cols-2 gap-4">
                    {filteredProducts.map((product) => (
                        <ProductListItem
                            key={product.id}
                            product={product}
                            onToggleStatus={handleToggleStatus}
                            onDeleteClick={handleDeleteClick}
                        />
                    ))}
                </div>
            ) : (
                <EmptyState hasFilters={hasFilters} />
            )}

            <DeleteDialog
                open={deleteDialogOpen}
                product={productToDelete}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={handleDeleteConfirm}
            />
        </div>
    )
}

export default ManageProducts

