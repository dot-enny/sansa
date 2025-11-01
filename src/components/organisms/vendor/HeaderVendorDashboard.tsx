import React from 'react'
import { vendorInfo } from '@/data/vendorData'

interface HeaderVendorDashboardProps {
  showHeader: boolean
}

const HeaderVendorDashboard: React.FC<HeaderVendorDashboardProps> = ({ showHeader }) => {
  // Get vendor name from auth context or API in real implementation
  const { storeName } = vendorInfo

  return (
    <header 
      className={`bg-card border- border-border px-6 py-3.5 flex items-center justify-end shadow-xs sticky top-0 z-20 transition-transform duration-300 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text- font-medium text-foreground">{storeName}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-semibold text-xs">
            {storeName.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>
    </header>
  )
}

export default HeaderVendorDashboard
