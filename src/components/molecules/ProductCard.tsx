import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineHeart, HiHeart, HiOutlineEye, HiStar } from 'react-icons/hi'
import { useWishlist } from '../../context/WishlistContext'

export type Product = {
  id: string | number
  title: string
  vendor?: string
  price: string
  priceOld?: string
  discount?: string
  image?: string
  rating?: number
  available?: number
  category?: string
}

type ProductCardProps = {
  product: Product
  /** CSS width value (e.g. 320 or '320px' or '20rem') applied as minWidth. If omitted a sensible default is used. */
  width?: number | string
  className?: string
}

const ProductCard: React.FC<ProductCardProps> = ({ product, width, className = '' }) => {
  const { has, toggle } = useWishlist()
  const isWishlisted = has(product.id)
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(product)
  }
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Quick view logic here
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/product/${product.id}`)}
      onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/product/${product.id}`) }}
      className={`group relative flex flex-col overflow-hidden w-full rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 cursor-pointer`}
      style={
        width
          ? { minWidth: typeof width === 'number' ? `${width}px` : width }
          : { minWidth: 250 }
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      {product.discount && (
        <div className="absolute left-3 top-3 z-10 rounded-lg bg-red-600 px-2.5 py-1 shadow-md">
          <span className="text-xs font-bold text-white">{product.discount}</span>
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition-all hover:scale-110 hover:bg-red-50"
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {isWishlisted ? (
          <HiHeart className="text-lg text-red-600" />
        ) : (
          <HiOutlineHeart className="text-lg text-gray-600" />
        )}
      </button>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 p-4">
        <img
          src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'}
          alt={product.title}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />

        {/* Quick View Overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <button
            onClick={handleQuickView}
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-100 active:scale-95"
          >
            <HiOutlineEye className="text-lg" />
            Quick View
          </button>
        </div>

        {/* Stock Indicator */}
        {product.available !== undefined && (
          <div className="absolute bottom-3 left-3">
            <div
              className={`rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
                product.available > 10
                  ? 'bg-green-100 text-green-700'
                  : product.available > 0
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {product.available > 0 ? `${product.available} in stock` : 'Out of stock'}
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-4">
        {/* Vendor */}
        {product.vendor && (
          <div className="mb-2 flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            <Link
              to={`/vendor/${product.vendor?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="text-xs font-medium text-blue-600 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {product.vendor}
            </Link>
          </div>
        )}

        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
          <span className="block">{product.title}</span>
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="mb-3 flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <HiStar
                  key={i}
                  className={`text-sm ${
                    i < Math.floor(product.rating!)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-gray-600">({product.rating})</span>
          </div>
        )}

        {/* Price Section */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">{product.price}</span>
            {product.priceOld && (
              <span className="text-sm font-medium text-gray-400 line-through">
                {product.priceOld}
              </span>
            )}
          </div>

          {/* Savings Indicator */}
          {product.priceOld && product.discount && (
            <p className="mt-1 text-xs font-semibold text-green-600">
              Save {product.discount}
            </p>
          )}
        </div>

       
      
      </div>

      {/* removed hover border per design (no blue border on hover) */}
    </div>
  )
}

export default ProductCard