import React from 'react'

const NavVendor: React.FC = () => {
  // Get vendor name from auth context or API in real implementation
  const vendorName = "StoreName"

  return (
    <header className="bg-card border-b border-border px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Sansa
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Welcome back,</p>
          <p className="text-sm font-semibold text-foreground">{vendorName}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-semibold text-sm">
            {vendorName.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>
    </header>
  )
}

export default NavVendor
