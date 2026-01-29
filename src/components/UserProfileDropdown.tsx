// User Profile Dropdown - Role switching and account management

import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import type { UserRole } from '@/context/AuthContext'
import {
  HiOutlineUser,
  HiOutlineChevronDown,
  HiOutlineLogout,
  HiOutlineShoppingBag,
  HiOutlineViewGrid,
  HiOutlineCash,
  HiOutlineShieldCheck,
} from 'react-icons/hi'

export default function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user, isAuthenticated, logout, switchRole } = useAuth()
  const navigate = useNavigate()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleLogout = () => {
    logout()
    navigate('/login')
    setIsOpen(false)
  }

  const handleRoleSwitch = (role: UserRole) => {
    switchRole(role)
    setIsOpen(false)

    // Navigate to appropriate dashboard
    const roleDashboards: Record<UserRole, string> = {
      customer: '/',
      vendor: '/vendor-dashboard',
      lender: '/lender-dashboard',
      admin: '/admin',
    }
    navigate(roleDashboards[role])
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          to="/login"
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          Sign in
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Sign up
        </Link>
      </div>
    )
  }

  const roleInfo: Record<UserRole, { label: string; icon: React.ReactElement; color: string }> = {
    customer: {
      label: 'Customer',
      icon: <HiOutlineShoppingBag className="w-5 h-5" />,
      color: 'text-blue-600',
    },
    vendor: {
      label: 'Vendor',
      icon: <HiOutlineViewGrid className="w-5 h-5" />,
      color: 'text-purple-600',
    },
    lender: {
      label: 'Lender',
      icon: <HiOutlineCash className="w-5 h-5" />,
      color: 'text-green-600',
    },
    admin: {
      label: 'Admin',
      icon: <HiOutlineShieldCheck className="w-5 h-5" />,
      color: 'text-red-600',
    },
  }

  const currentRoleInfo = roleInfo[user.role]

  const getInitials = (name: string) => {
    const parts = name.split(' ')
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase()
    }
    return name.charAt(0).toUpperCase()
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors min-w-0"
      >
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm shrink-0">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            getInitials(user.name)
          )}
        </div>
        <div className="hidden md:block text-left min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
          <p className="text-xs text-gray-500 truncate">{currentRoleInfo.label}</p>
        </div>
        <HiOutlineChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
            <div className={`flex items-center gap-1 mt-2 ${currentRoleInfo.color}`}>
              {currentRoleInfo.icon}
              <span className="text-xs font-medium">{currentRoleInfo.label}</span>
            </div>
          </div>

          {/* Role Switching */}
          <div className="px-2 py-2 border-b border-gray-200">
            <p className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Switch Role
            </p>
            <div className="space-y-1">
              {Object.entries(roleInfo).map(([role, info]) => (
                <button
                  key={role}
                  onClick={() => handleRoleSwitch(role as UserRole)}
                  disabled={user.role === role}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
                    user.role === role
                      ? 'bg-gray-100 text-gray-900 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className={user.role === role ? info.color : 'text-gray-400'}>
                    {info.icon}
                  </span>
                  <span className="text-sm">{info.label}</span>
                  {user.role === role && (
                    <span className="ml-auto text-xs text-green-600 font-medium">Active</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Account Links */}
          <div className="px-2 py-2">
            <Link
              to="/account"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <HiOutlineUser className="w-5 h-5 text-gray-400" />
              <span className="text-sm">Account Settings</span>
            </Link>
            {user.role === 'vendor' && (
              <Link
                to="/vendor-dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <HiOutlineViewGrid className="w-5 h-5 text-gray-400" />
                <span className="text-sm">Vendor Dashboard</span>
              </Link>
            )}
            {user.role === 'lender' && (
              <Link
                to="/lender-dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <HiOutlineCash className="w-5 h-5 text-gray-400" />
                <span className="text-sm">Lender Dashboard</span>
              </Link>
            )}
            {user.role === 'admin' && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <HiOutlineShieldCheck className="w-5 h-5 text-gray-400" />
                <span className="text-sm">Admin Panel</span>
              </Link>
            )}
          </div>

          {/* Logout */}
          <div className="px-2 py-2 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <HiOutlineLogout className="w-5 h-5" />
              <span className="text-sm font-medium">Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
