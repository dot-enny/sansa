// Register Page - New user registration with role selection

import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import type { UserRole } from '@/context/AuthContext'
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineCheckCircle,
} from 'react-icons/hi'
import { ShoppingBag, Store, DollarSign, Check } from 'lucide-react'

export default function Register() {
  // Prefill form for easy demo
  const [formData, setFormData] = useState({
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password123',
    confirmPassword: 'password123',
  })
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { register } = useAuth()
  const navigate = useNavigate()

  const roles = [
    {
      value: 'customer' as UserRole,
      label: 'Customer',
      description: 'Browse and shop from multiple vendors',
      icon: ShoppingBag,
      features: ['Shop products', 'Track orders', 'Save wishlist', 'Manage addresses'],
    },
    {
      value: 'vendor' as UserRole,
      label: 'Vendor',
      description: 'Sell your products on the marketplace',
      icon: Store,
      features: ['Create your store', 'List products', 'Manage orders', 'Track sales'],
    },
    {
      value: 'lender' as UserRole,
      label: 'Lender',
      description: 'Invest in vendor growth and earn returns',
      icon: DollarSign,
      features: ['Browse opportunities', 'Invest capital', 'Track returns', 'Auto-invest rules'],
    },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setIsLoading(true)

    try {
      await register(formData.email, formData.password, formData.name, selectedRole)

      // Redirect based on selected role
      const roleDashboards: Record<UserRole, string> = {
        customer: '/',
        vendor: '/vendor-dashboard',
        lender: '/lender-dashboard',
        admin: '/admin',
      }
      navigate(roleDashboards[selectedRole], { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen bg-gray-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="h-12 w-12 rounded-full bg-primary shadow-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-3xl font-bold tracking-tight text-gray-900">Sansa</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join our marketplace and start your journey
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Error Message */}
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4 mb-6">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I want to join as a...
              </label>
              <div className="grid md:grid-cols-3 gap-4">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                      selectedRole === role.value
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-gray-200 hover:border-primary/30 hover:bg-gray-50'
                    }`}
                  >
                    {selectedRole === role.value && (
                      <div className="absolute top-2 right-2">
                        <HiOutlineCheckCircle className="w-6 h-6 text-primary" />
                      </div>
                    )}
                    <div className="mb-3">
                      <role.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{role.label}</h3>
                    <p className="text-xs text-gray-600 mb-3">{role.description}</p>
                    <ul className="space-y-1">
                      {role.features.map((feature, idx) => (
                        <li key={idx} className="text-xs text-gray-500 flex items-center gap-1">
                          <Check className="w-3 h-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiOutlineUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
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
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
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

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiOutlineLockClosed className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  defaultChecked
                  required
                  className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded accent-primary"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-700">
                  I agree to the{' '}
                  <span className="text-gray-400 cursor-not-allowed" title="Demo - Not available">
                    Terms of Service
                  </span>
                  {' '}and{' '}
                  <span className="text-gray-400 cursor-not-allowed" title="Demo - Not available">
                    Privacy Policy
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-amber-500 hover:underline">
                  Sign in
                </Link>
                {' '}or use demo accounts
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
