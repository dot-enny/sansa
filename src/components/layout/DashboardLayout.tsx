import React from 'react'
import { Outlet } from 'react-router-dom'

interface DashboardLayoutProps {
  sidebar: React.ReactNode
}

/**
 * Generic Dashboard Layout Component
 * Reusable layout for Vendor, Lender, and Admin dashboards
 */
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ sidebar }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Sidebar - Spans full height */}
      <aside className="w-72 bg-card border-r border-border shrink-0 shadow-sm fixed left-0 top-0 bottom-0 overflow-y-auto z-30">
        {sidebar}
      </aside>

      {/* Content Area */}
      <div className="ml-72">
        {/* Main Content */}
        <main className="p-8 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
