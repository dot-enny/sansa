import React from 'react'
import { Link, useParams } from 'react-router-dom'

const NavVendor: React.FC = () => {
  const { vendorId } = useParams<{ vendorId: string }>()
  const title = vendorId ? vendorId.replace(/[-_]+/g, ' ') : 'Vendor'

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-lg font-bold text-gray-900">
              Sansa
            </Link>
            <div className="text-sm text-gray-600">{title}</div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-gray-700 hover:underline">
              Browse
            </Link>
            <Link to="/admin" className="text-sm text-gray-700 hover:underline">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavVendor
