import React from 'react'
import { Outlet } from 'react-router-dom'
import NavAdmin from '../NavAdmin'

const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavAdmin />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
