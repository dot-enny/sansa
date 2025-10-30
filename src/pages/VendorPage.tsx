import React from 'react'
import { useParams, Link } from 'react-router-dom'
import PRODUCTS from '../data/products'
import ProductGrid from '../components/organisms/ProductGrid'

const prettyVendor = (slug?: string) => {
  if (!slug) return 'Vendor'
  return slug.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

const VendorPage: React.FC = () => {
  const { vendorId } = useParams<{ vendorId: string }>()

  const filtered = vendorId
    ? PRODUCTS.filter((p) =>
        p.vendor
          ? p.vendor.toLowerCase().replace(/[^a-z0-9]+/g, '-') === vendorId
          : false,
      )
    : PRODUCTS

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{prettyVendor(vendorId)}</h1>
          <p className="mt-1 text-sm text-gray-600">
            Showing {filtered.length} products from this vendor.
          </p>
        </div>
        <div>
          <Link to="/" className="text-sm text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>

      <ProductGrid products={filtered} />
    </div>
  )
}

export default VendorPage
