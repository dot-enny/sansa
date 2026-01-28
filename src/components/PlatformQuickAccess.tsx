// Platform Quick Access Banner - Shows links to other parts of the platform

import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { HiOutlineShoppingBag, HiOutlineViewGrid, HiOutlineCash, HiOutlineArrowRight } from 'react-icons/hi'

export default function PlatformQuickAccess() {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || !user) {
    return null
  }

  const modules = [
    {
      name: 'Shop',
      description: 'Browse products from vendors',
      icon: <HiOutlineShoppingBag className="w-6 h-6" />,
      link: '/',
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      show: true,
    },
    {
      name: 'Vendor Dashboard',
      description: 'Manage your store',
      icon: <HiOutlineViewGrid className="w-6 h-6" />,
      link: '/vendor-dashboard',
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      show: user.role === 'vendor' || user.role === 'admin',
    },
    {
      name: 'Lender Dashboard',
      description: 'Invest and earn returns',
      icon: <HiOutlineCash className="w-6 h-6" />,
      link: '/lender-dashboard',
      color: 'bg-green-50 text-green-600 border-green-200',
      show: user.role === 'lender' || user.role === 'admin',
    },
  ]

  const visibleModules = modules.filter((m) => m.show)

  if (visibleModules.length <= 1) {
    return null
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Quick Access</h3>
        <span className="text-xs text-gray-500">Jump to other modules</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {visibleModules.map((module) => (
          <Link
            key={module.link}
            to={module.link}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all hover:shadow-md group ${module.color}`}
          >
            <div className="shrink-0">{module.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{module.name}</p>
              <p className="text-xs opacity-75 truncate">{module.description}</p>
            </div>
            <HiOutlineArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>
    </div>
  )
}
