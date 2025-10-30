import React from 'react'
import { Link } from 'react-router-dom'

const CATEGORIES = [
  { name: 'Baby & Kids', count: 7 },
  { name: 'Beauty & Personal Care', count: 6 },
  { name: 'Electronics', count: 7 },
  { name: 'Fashion & Accessories', count: 3 },
  { name: 'Grocery & Fruits', count: 7 },
  { name: 'Health & Wellness', count: 7 },
  { name: 'Home & Furniture', count: 7 },
  { name: 'Household & Essentials', count: 7 },
]

const CategoryIconsRow: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="flex gap-6 overflow-x-auto py-2">
        {CATEGORIES.map((c) => {
          const slug = c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
          return (
            <Link key={c.name} to={`/category/${slug}`} className="shrink-0 w-28 text-center">
              <div className="mx-auto mb-2 h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                {/* placeholder icon */}
                <span className="text-sm text-gray-500">📦</span>
              </div>
              <div className="text-sm font-medium text-gray-700">{c.name}</div>
              <div className="text-xs text-gray-400">{c.count} Products</div>
            </Link>
          )
        })}
      </div>
      <div className="border-t my-4" />
    </div>
  )
}

export default CategoryIconsRow
