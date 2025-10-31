import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashboard: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div>
          <Link to="/" className="text-sm text-blue-600 hover:underline">
            ← Back to Public Site
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold">Products</h2>
          <p className="text-sm text-gray-600 mt-2">Manage products, inventory and categories.</p>
        </div>
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold">Vendors</h2>
          <p className="text-sm text-gray-600 mt-2">Manage vendor accounts and payouts.</p>
        </div>
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold">Orders</h2>
          <p className="text-sm text-gray-600 mt-2">View and manage orders, refunds, and shipping.</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
