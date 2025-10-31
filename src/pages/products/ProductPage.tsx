import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { HiOutlineArrowRight, HiOutlineHeart, HiShoppingCart, HiStar, HiCheck } from 'react-icons/hi'

// Mock data - replace with your actual imports
const PRODUCTS = [
  {
    id: 1,
    title: 'Premium Wireless Headphones',
    vendor: 'Audio Tech',
    price: '₦45,000',
    priceOld: '₦60,000',
    rating: 4.8,
    available: 12,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    category: 'Electronics'
  }
]

const ProductPage = () => {
  const { id } = useParams()
  const product = PRODUCTS.find((p) => String(p.id) === id) || PRODUCTS[0]

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
          <p className="text-gray-600 mb-6">We couldn't find the product you're looking for.</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  const vendorSlug = product.vendor
    ? product.vendor.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    : ''

  const discount = product.priceOld 
    ? Math.round(((parseFloat(product.priceOld.replace(/[^0-9.]/g, '')) - parseFloat(product.price.replace(/[^0-9.]/g, ''))) / parseFloat(product.priceOld.replace(/[^0-9.]/g, ''))) * 100)
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {product.category && (
              <>
                <span className="text-gray-600">{product.category}</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
            <span className="text-gray-900 font-medium truncate">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-200">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{discount}%
                </div>
              )}
              {product.available !== undefined && product.available <= 5 && product.available > 0 && (
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Only {product.available} left
                </div>
              )}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="lg:pt-4">
            {/* Vendor */}
            {product.vendor && (
              <div className="flex items-center gap-3 mb-4">
                <Link 
                  to={`/vendor/${vendorSlug}`} 
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {product.vendor}
                </Link>
                <Link
                  to={`/vendor/${vendorSlug}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  Visit shop
                  <HiOutlineArrowRight className="text-sm" />
                </Link>
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <HiStar
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
              <span className="text-sm text-gray-500">(248 reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900">{product.price}</span>
                {product.priceOld && (
                  <span className="text-xl text-gray-500 line-through">{product.priceOld}</span>
                )}
              </div>
              {discount > 0 && (
                <p className="mt-2 text-sm text-green-600 font-medium">
                  You save {discount}% on this purchase
                </p>
              )}
            </div>

            {/* Stock Status */}
            {product.available !== undefined && (
              <div className="mb-6">
                <div className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${
                  product.available > 0
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {product.available > 0 ? (
                    <>
                      <HiCheck className="w-5 h-5" />
                      {product.available} units in stock
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Out of stock
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Product Details</h2>
              <p className="text-gray-700 leading-relaxed">
                Experience premium quality with this carefully crafted product. Designed with attention to detail and built to last, it combines functionality with style. Perfect for everyday use, this item features advanced materials and ergonomic design for maximum comfort and durability.
              </p>
            </div>

            {/* Key Features */}
            <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {['Premium quality materials', 'Ergonomic design', 'Long-lasting durability', 'Easy to use'].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <HiCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-lg shadow-blue-600/20">
                <HiShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100 transition-colors">
                <HiOutlineHeart className="w-5 h-5" />
                Save
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-blue-50 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-xs font-medium text-gray-700">Secure Payment</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-green-50 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-xs font-medium text-gray-700">Quality Assured</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-purple-50 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <p className="text-xs font-medium text-gray-700">Fast Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage