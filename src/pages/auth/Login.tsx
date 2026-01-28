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

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Get the redirect path from location state, or default to home
  const from = (location.state as { from?: string })?.from || '/'

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
          customer: '/',
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
    { email: 'customer@sansa.com', role: 'Customer', icon: '🛍️' },
    { email: 'vendor@sansa.com', role: 'Vendor', icon: '🏪' },
    { email: 'lender@sansa.com', role: 'Lender', icon: '💰' },
    { email: 'admin@sansa.com', role: 'Admin', icon: '👑' },
  ]

  const quickLogin = (demoEmail: string) => {
    setEmail(demoEmail)
    setPassword('password123')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white py-12">
        <div className="max-w-md w-full space-y-6">
          {/* Logo & Header */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="h-12 w-12 rounded-full bg-linear-to-br from-yellow-400 to-yellow-500 shadow-lg" />
              <span className="text-3xl font-bold tracking-tight text-gray-900">Sansa</span>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-600">
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
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
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
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
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
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
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
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  onClick={() => quickLogin(account.email)}
                  className="flex items-center gap-2 px-3 py-2.5 text-xs border-2 border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-all font-medium"
                >
                  <span className="text-lg">{account.icon}</span>
                  <span className="text-gray-700">{account.role}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-center text-gray-500 mt-3">
              ✨ Click any role to instantly demo • All passwords: <code className="bg-gray-100 px-2 py-0.5 rounded">password123</code>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Hero Image/Gradient */}
      <div className="hidden lg:block lg:flex-1 bg-linear-to-br from-blue-600 via-blue-700 to-purple-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-white p-12">
          <h1 className="text-5xl font-bold mb-6 text-center">Your Multi-Vendor Marketplace</h1>
          <p className="text-xl text-blue-100 text-center max-w-md mb-8">
            Shop from multiple vendors, manage your store, or invest in growing businesses.
          </p>
          
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="text-4xl mb-2">🛍️</div>
              <p className="text-sm text-blue-100">Shop Products</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🏪</div>
              <p className="text-sm text-blue-100">Sell Online</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💰</div>
              <p className="text-sm text-blue-100">Invest & Earn</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
