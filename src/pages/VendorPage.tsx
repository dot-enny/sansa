import React from 'react'
import { useParams, Link } from 'react-router-dom'
import PRODUCTS from '../data/products'
import ProductGrid from '../components/organisms/ProductGrid'
import VENDORS from '../data/vendors'

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

  const vendor = VENDORS.find((v) => v.slug === vendorId) || null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            <img
              src={vendor?.logo || 'https://via.placeholder.com/80'}
              alt={vendor?.name || prettyVendor(vendorId)}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">{vendor?.name || prettyVendor(vendorId)}</h1>
            {vendor?.rating && (
              <div className="mt-1 text-sm text-gray-600">{vendor.rating} ★</div>
            )}
            {vendor?.location && (
              <div className="mt-1 text-sm text-gray-500">{vendor.location}</div>
            )}
            {vendor?.description && (
              <p className="mt-2 text-sm text-gray-700 max-w-2xl">{vendor.description}</p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <Link to="/" className="text-sm text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Products from this vendor</h2>
        <ProductGrid products={filtered} />
      </div>
    </div>
  )
}

export default VendorPage
