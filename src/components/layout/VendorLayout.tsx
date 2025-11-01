import React from 'react'
import { Outlet } from 'react-router-dom'
import NavVendor from '../organisms/vendor/NavVendor'
import SidebarVendor from '../organisms/vendor/SidebarVendor'

const VendorLayout: React.FC = () => {
  const vendorName = "StoreName"; // Replace with actual vendor from context/API

  return (
    <div className="min-h-screen bg-background">
     <NavVendor />

      {/* Content Area with Fixed Sidebar */}
      <div className="flex">
        {/* Fixed Sidebar */}
        <aside className="w-72 bg-card border-r border-border shrink-0 shadow-sm fixed left-0 top-[73px] bottom-0 overflow-y-auto">
          <SidebarVendor />
        </aside>

        {/* Main Content with left margin to account for fixed sidebar */}
        <main className="flex-1 p-8 ml-72 min-h-[calc(100vh-73px)]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default VendorLayout
