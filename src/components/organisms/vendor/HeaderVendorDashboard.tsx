import React from 'react'
import { vendorInfo } from '@/data/vendorData'

const HeaderVendorDashboard: React.FC = () => {
  // Get vendor name from auth context or API in real implementation
  const { storeName } = vendorInfo

  return (
    <header className="bg-card border-b border-border px-6 py-2.5 flex items-center justify-between shadow-sm sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          sansa
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-xs font-medium text-foreground">{storeName}</p>
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
