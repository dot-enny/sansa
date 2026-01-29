import React from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductGrid from '../components/organisms/ProductGrid'
import ProductListControls from '../components/organisms/ProductListControls'
import PRODUCTS from '../data/products'

const prettify = (slug?: string) => {
  if (!slug) return 'Category'
  return slug.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()

  const filtered = slug
    ? PRODUCTS.filter((p) => p.category === slug)
    : PRODUCTS

  return (
    <div className="w-full xl:max-w-[1440px] xl:mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{prettify(slug)}</h1>
          <p className="mt-1 text-sm text-gray-600">
            Showing {filtered.length} {filtered.length === 1 ? 'item' : 'items'} in this
            category.
          </p>
        </div>
        <div>
          <Link to="/" className="text-sm text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>

      <ProductListControls />

      <div className="mt-6">
        <ProductGrid products={filtered} />
      </div>
    </div>
  )
}

export default CategoryPage
