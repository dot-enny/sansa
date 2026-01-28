// Login Page - User authentication with role-based redirect

import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import type { UserRole } from '@/context/AuthContext'
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'

export default function Login() {
  // Prefill with demo customer account for easy testing
  const [email, setEmail] = useState('customer@sansa.com')
  const [password, setPassword] = useState('password123')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDemo, setSelectedDemo] = useState<string>('customer@sansa.com')

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Get the redirect path from location state, or default to shop
  const from = (location.state as { from?: string })?.from || '/shop'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password)
      
      // Redirect based on user role after successful login
      // The AuthContext will set the user, and we'll navigate accordingly
      // This is handled by checking the logged-in user's role
      const storedUser = localStorage.getItem('sansa_user')
      if (storedUser) {
        const user = JSON.parse(storedUser)
        const roleDashboards: Record<UserRole, string> = {
          customer: '/shop',
          vendor: '/vendor-dashboard',
          lender: '/lender-dashboard',
          admin: '/admin',
        }
        navigate(roleDashboards[user.role as UserRole] || from, { replace: true })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  // Demo accounts for quick testing
  const demoAccounts = [
    { email: 'customer@sansa.com', role: 'Customer', icon: '🛍️', color: 'blue' },
    { email: 'vendor@sansa.com', role: 'Vendor', icon: '🏪', color: 'purple' },
    { email: 'lender@sansa.com', role: 'Lender', icon: '💰', color: 'green' },
    { email: 'admin@sansa.com', role: 'Admin', icon: '👑', color: 'red' },
  ]

  const quickLogin = (demoEmail: string) => {
    setEmail(demoEmail)
    setPassword('password123')
    setSelectedDemo(demoEmail)
  }

  // Get the selected role name for the button text
  const getSelectedRole = () => {
    const selected = demoAccounts.find(acc => acc.email === selectedDemo)
    return selected ? selected.role : 'Customer'
  }

  // Get color classes based on selected demo
  const getButtonColorClasses = () => {
    const selected = demoAccounts.find(acc => acc.email === selectedDemo)
    if (!selected) return 'bg-primary hover:bg-primary/90 focus:ring-primary'
    
    return 'bg-primary hover:bg-primary/90 focus:ring-primary'
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white py-12">
        <div className="max-w-md w-full space-y-6">
          {/* Logo & Header */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="h-12 w-12 rounded-full bg-primary shadow-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-3xl font-bold tracking-tight text-slate-900">Sansa</span>
            </Link>
            <h2 className="text-3xl font-bold text-slate-900">Welcome back</h2>
            <p className="mt-2 text-sm text-slate-600">
              Sign in to your account to continue
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiOutlineMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiOutlineLockClosed className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <HiOutlineEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <HiOutlineEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded accent-primary"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <span className="text-gray-400 cursor-not-allowed" title="Demo - Not available">
                  Forgot password?
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${getButtonColorClasses()}`}
            >
              {isLoading ? 'Signing in...' : `Continue as ${getSelectedRole()}`}
            </button>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-amber-500 hover:underline">
                  Sign up
                </Link>
                {' '}or use demo accounts below
              </p>
            </div>
          </form>

          {/* Demo Accounts */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <p className="text-xs text-center font-semibold text-gray-700 mb-3">🎯 Quick Demo Login</p>
            <div className="grid grid-cols-2 gap-2">
              {demoAccounts.map((account) => {
                const isSelected = selectedDemo === account.email
                const selectedClasses = isSelected 
                  ? 'bg-primary/5 border-primary ring-2 ring-primary/20' 
                  : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                
                return (
                  <button
                    key={account.email}
                    onClick={() => quickLogin(account.email)}
                    className={`relative flex items-center gap-2 px-3 py-2.5 text-xs border-2 rounded-lg transition-all font-medium ${selectedClasses}`}
                  >
                    {isSelected && (
                      <div className="absolute top-1 right-1">
                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <span className="text-lg">{account.icon}</span>
                    <span className={isSelected ? 'text-slate-900 font-semibold' : 'text-slate-700'}>{account.role}</span>
                  </button>
                )
              })}
            </div>
            <p className="text-xs text-center text-gray-500 mt-3">
              ✨ Click any role to select • All passwords: <code className="bg-gray-100 px-2 py-0.5 rounded">password123</code>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Hero Image/Gradient */}
      <div className="hidden lg:block lg:flex-1 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-white p-12">
          <h1 className="text-5xl font-bold mb-6 text-center">Your Multi-Vendor Marketplace</h1>
          <p className="text-xl text-slate-300 text-center max-w-md mb-8">
            Shop from multiple vendors, manage your store, or invest in growing businesses.
          </p>
          
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="text-4xl mb-2">🛍️</div>
              <p className="text-sm text-slate-300">Shop Products</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🏪</div>
              <p className="text-sm text-slate-300">Sell Online</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💰</div>
              <p className="text-sm text-slate-300">Invest & Earn</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
