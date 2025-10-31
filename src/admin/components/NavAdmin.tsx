import React from 'react'
import { Link } from 'react-router-dom'

const NavAdmin: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-lg font-bold">
              Admin
            </Link>
            <nav className="flex gap-3 text-sm">
              <Link to="/admin" className="hover:underline">
                Dashboard
              </Link>
              <Link to="/admin/products" className="hover:underline">
                Products
              </Link>
              <Link to="/admin/vendors" className="hover:underline">
                Vendors
              </Link>
            </nav>
          </div>
          <div>
            <Link to="/" className="text-sm text-white/90 hover:underline">
              View Store
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavAdmin
