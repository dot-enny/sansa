import React from 'react'
import { HiOutlineViewGrid } from 'react-icons/hi'

const ProductListControls: React.FC = () => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="text-sm text-gray-600">Showing all results</div>

      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-600">Sort:</label>
        <select className="rounded border px-2 py-1 text-sm">
          <option>Default sorting</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>

        <label className="text-sm text-gray-600">Show:</label>
        <select className="rounded border px-2 py-1 text-sm">
          <option>20 Items</option>
          <option>40 Items</option>
        </select>

        <button className="ml-2 rounded border px-2 py-1 text-sm cursor-pointer" aria-label="Toggle grid/list">
          <HiOutlineViewGrid className="inline-block" />
        </button>
      </div>
    </div>
  )
}

export default ProductListControls
