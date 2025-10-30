import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { HiOutlineArrowRight } from 'react-icons/hi'
import PRODUCTS from '../../data/products'
import type { Product } from '../../components/molecules/ProductCard'

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const product: Product | undefined = PRODUCTS.find((p) => String(p.id) === id)

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-xl font-bold">Product not found</h2>
        <p className="mt-2 text-sm text-gray-600">We couldn't find that product.</p>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
          ← Back to home
        </Link>
      </div>
    )
  }

  const vendorSlug = product.vendor
    ? product.vendor.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    : ''

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="rounded-lg overflow-hidden bg-white shadow">
            <img
              src={product.image}
              alt={product.title}
              className="w-full object-contain"
              style={{ height: 360 }}
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
          <div className="mt-2 flex items-center gap-4">
            {product.vendor && (
              <div className="flex items-center gap-3">
                <Link to={`/vendor/${vendorSlug}`} className="text-sm text-blue-600 font-medium hover:underline">
                  {product.vendor}
                </Link>
                <Link
                  to={`/vendor/${vendorSlug}`}
                  className="inline-flex items-center gap-2 rounded-md bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 hover:bg-green-100"
                >
                  About the shop
                  <HiOutlineArrowRight className="text-sm" />
                </Link>
              </div>
            )}
            <div className="text-sm text-gray-600">{product.rating} ★</div>
            <div className="ml-auto text-2xl font-bold text-gray-900">{product.price}</div>
          </div>

          {product.priceOld && (
            <div className="mt-1 text-sm text-gray-500 line-through">{product.priceOld}</div>
          )}

          {product.available !== undefined && (
            <div className="mt-4">
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${{
                  true: 'bg-green-100 text-green-700',
                }[String(product.available > 0)]}`}
              >
                {product.available > 0 ? `${product.available} in stock` : 'Out of stock'}
              </span>
            </div>
          )}

          <div className="mt-6 space-y-4">
            <p className="text-sm text-gray-700">
              This is a sample product description. Replace with real product data coming from an
              API or CMS. Include features, size, weight, ingredients, or any other important
              information customers need to know.
            </p>

            <div className="flex gap-3">
              <button className="rounded bg-blue-600 px-4 py-2 text-white">Add to cart</button>
              <button className="rounded border px-4 py-2">Add to wishlist</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
