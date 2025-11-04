import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import SidebarVendor from '../organisms/vendor/SidebarVendor'
import HeaderVendorDashboard from '../organisms/vendor/HeaderVendorDashboard'

const VendorLayout: React.FC = () => {
  const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide header
        setShowHeader(false)
      } else {
        // Scrolling up - show header
        setShowHeader(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Sidebar - Now spans full height */}
      <aside className="w-72 bg-card border- border-border shrink-0 shadow-sm fixed left-0 top-0 bottom-0 overflow-y-auto z-30">
        <SidebarVendor />
      </aside>

      {/* Content Area with Header and Main */}
      <div className="ml-72">
        {/* Sticky Header - Auto-hides on scroll */}
        <HeaderVendorDashboard showHeader={showHeader} />

        {/* Main Content */}
        <main className="p-8 min-h-scree">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default VendorLayout
