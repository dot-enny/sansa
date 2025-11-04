import React from 'react'
import { LayoutDashboard, PlusCircle, Boxes, ShoppingBag } from 'lucide-react'
import DashboardLayout from './DashboardLayout'
import DashboardSidebar from '../organisms/shared/DashboardSidebar'
import { vendorInfo } from '@/data/vendorData'
import type { NavigationLink, UserInfo, MetricInfo } from '../organisms/shared/DashboardSidebar'

const VendorLayout: React.FC = () => {
  const navigationLinks: NavigationLink[] = [
    {
      name: 'Dashboard',
      to: '/vendor-dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: 'Add Product',
      to: '/vendor-dashboard/add-product',
      icon: <PlusCircle className="w-5 h-5" />,
    },
    {
      name: 'Manage Products',
      to: '/vendor-dashboard/manage-products',
      icon: <Boxes className="w-5 h-5" />,
    },
    {
      name: 'Orders',
      to: '/vendor-dashboard/orders',
      icon: <ShoppingBag className="w-5 h-5" />,
    },
  ]

  const userInfo: UserInfo = {
    name: vendorInfo.storeName,
  }

  const metric: MetricInfo = {
    label: 'Trust Score',
    value: vendorInfo.trustScore,
    maxValue: vendorInfo.maxTrustScore,
    description: 'Build trust to unlock better rates',
  }

  return (
    <DashboardLayout
      sidebar={
        <DashboardSidebar
          userInfo={userInfo}
          navigationLinks={navigationLinks}
          metric={metric}
          userType="vendor"
        />
      }
    />
  )
}

export default VendorLayout
