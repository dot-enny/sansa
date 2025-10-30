import React from 'react'
import { Outlet } from 'react-router-dom'
import NavVendor from '../NavVendor'

const VendorLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavVendor />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default VendorLayout
