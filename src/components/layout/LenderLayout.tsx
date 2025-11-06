import React from 'react'
import { LayoutDashboard, TrendingUp, Wallet, FileText, PieChart } from 'lucide-react'
import DashboardLayout from './DashboardLayout'
import DashboardSidebar from '../organisms/shared/DashboardSidebar'
import { mockLenderInfo } from '@/data/lender/mockLenderData'
import type { NavigationLink, UserInfo, MetricInfo } from '../organisms/shared/DashboardSidebar'

const LenderLayout: React.FC = () => {
  const navigationLinks: NavigationLink[] = [
    {
      name: 'Dashboard',
      to: '/lender-dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: 'Investments',
      to: '/lender-dashboard/investments',
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      name: 'Wallet',
      to: '/lender-dashboard/wallet',
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      name: 'Analytics',
      to: '/lender-dashboard/analytics',
      icon: <PieChart className="w-5 h-5" />,
    },
    {
      name: 'Documents',
      to: '/lender-dashboard/documents',
      icon: <FileText className="w-5 h-5" />,
    },
  ]

  const userInfo: UserInfo = {
    name: mockLenderInfo.name,
    subtitle: 'Investor',
    avatar: mockLenderInfo.avatar,
  }

  const metric: MetricInfo = {
    label: 'Active Investments',
    value: mockLenderInfo.totalInvestments,
    maxValue: 20,
    description: 'Diversify to maximize returns',
  }

  return (
    <DashboardLayout
      sidebar={
        <DashboardSidebar
          userInfo={userInfo}
          navigationLinks={navigationLinks}
          metric={metric}
          userType="lender"
        />
      }
    />
  )
}

export default LenderLayout
