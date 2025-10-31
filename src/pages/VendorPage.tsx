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
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Vendor Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start gap-6">
            <div className="h-24 w-24 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 shadow-sm border border-gray-200">
              <img
                src={vendor?.logo || 'https://via.placeholder.com/96'}
                alt={vendor?.name || prettyVendor(vendorId)}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {vendor?.name || prettyVendor(vendorId)}
                </h1>
                {vendor?.rating && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-50 border border-yellow-200 rounded-full">
                    <span className="text-sm font-semibold text-yellow-700">{vendor.rating}</span>
                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                )}
              </div>

              {vendor?.location && (
                <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {vendor.location}
                </div>
              )}

              {vendor?.description && (
                <p className="text-gray-700 leading-relaxed max-w-3xl">
                  {vendor.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Products ({filtered.length})
          </h2>
        </div>
        <ProductGrid products={filtered} />
      </div>
    </div>
  )
}

export default VendorPage
