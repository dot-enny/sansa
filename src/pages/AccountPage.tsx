import React, { useState } from 'react'
import { User, Package, MapPin, CreditCard, Lock, Bell } from 'lucide-react'

// Mock data
const ORDERS = [
  { id: 'ORD-2024-001', date: 'Oct 25, 2024', total: '₦45,000', status: 'Delivered' },
  { id: 'ORD-2024-002', date: 'Oct 20, 2024', total: '₦28,500', status: 'In Transit' },
  { id: 'ORD-2024-003', date: 'Oct 15, 2024', total: '₦62,000', status: 'Delivered' },
]

const AccountPage = () => {
  const [tab, setTab] = useState('profile')
  const [profile, setProfile] = useState({ 
    name: 'John Doe', 
    email: 'john@example.com', 
    phone: '+234 803 123 4567' 
  })

  const [addresses] = useState([
    { id: 'addr_1', label: 'Home', value: '123 Main Street, Victoria Island', city: 'Lagos, Nigeria', isDefault: true },
    { id: 'addr_2', label: 'Office', value: '456 Business Plaza, Lekki Phase 1', city: 'Lagos, Nigeria', isDefault: false },
  ])

  const [payments] = useState([
    { id: 'pm_1', brand: 'Visa', last4: '4242', exp: '12/26', isDefault: true },
    { id: 'pm_2', brand: 'Mastercard', last4: '5555', exp: '08/27', isDefault: false },
  ])

  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    orderUpdates: true,
    marketingEmails: false,
    securityAlerts: true,
    promotions: true
  })

const saveProfile = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    alert('Profile saved successfully!')
}

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ]

type OrderStatus = 'Delivered' | 'In Transit' | 'Processing' | 'Cancelled' | string

interface StatusColorMap {
    [status: string]: string
}

const getStatusColor = (status: OrderStatus): string => {
    const colors: StatusColorMap = {
        'Delivered': 'bg-green-100 text-green-700 border-green-200',
        'In Transit': 'bg-blue-100 text-blue-700 border-blue-200',
        'Processing': 'bg-yellow-100 text-yellow-700 border-yellow-200',
        'Cancelled': 'bg-red-100 text-red-700 border-red-200',
    }
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200'
}

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full xl:max-w-[1440px] xl:mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
              <p className="mt-1 text-sm text-gray-600">Manage your profile, orders and settings</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full xl:max-w-[1440px] xl:mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation (desktop) */}
          <nav className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden md:sticky md:top-20">
              <ul className="py-2">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setTab(item.id)}
                        className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                          tab === item.id
                            ? 'bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600'
                            : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>

          {/* Content Area */}
          <div className="flex-1">
            {/* Mobile tab bar */}
            <div className="md:hidden mb-4">
              <div className="overflow-x-auto -mx-2">
                <div className="inline-flex px-2 gap-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        onClick={() => setTab(item.id)}
                        aria-pressed={tab === item.id}
                        className={`whitespace-nowrap px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                          tab === item.id
                            ? 'bg-blue-600 text-white shadow'
                            : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
            {tab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                  <p className="mt-1 text-sm text-gray-600">Update your account details</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full name</label>
                    <input
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                      placeholder="+234 803 123 4567"
                    />
                  </div>
                  <div className="pt-4">
                    <button onClick={saveProfile} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-lg shadow-blue-600/20">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {tab === 'orders' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
                  <p className="mt-1 text-sm text-gray-600">View and track your orders</p>
                </div>

                {ORDERS.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-4xl">📦</span>
                    </div>
                    <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
                    <a href="/" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                      Start Shopping
                    </a>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {ORDERS.map((order) => (
                      <li key={order.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold text-gray-900">{order.id}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">
                              <span>{order.date}</span>
                              <span className="mx-2">•</span>
                              <span className="font-semibold text-gray-900">{order.total}</span>
                            </div>
                          </div>
                          <a href={`/orders/${order.id}`} className="px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                            View Details
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {tab === 'addresses' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
                    <p className="mt-1 text-sm text-gray-600">Manage your delivery addresses</p>
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                    <span className="text-lg">+</span>
                    Add Address
                  </button>
                </div>

                <ul className="space-y-4">
                  {addresses.map((addr) => (
                    <li key={addr.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900">{addr.label}</h3>
                            {addr.isDefault && (
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-700">{addr.value}</p>
                          <p className="text-sm text-gray-600">{addr.city}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            Edit
                          </button>
                          <button className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tab === 'payments' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
                    <p className="mt-1 text-sm text-gray-600">Manage your saved payment methods</p>
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                    <span className="text-lg">+</span>
                    Add Card
                  </button>
                </div>

                <ul className="space-y-4">
                  {payments.map((pm) => (
                    <li key={pm.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                            {pm.brand}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-900">
                                {pm.brand} •••• {pm.last4}
                              </h3>
                              {pm.isDefault && (
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">Expires {pm.exp}</p>
                          </div>
                        </div>
                        <button className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tab === 'security' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Security Settings</h2>
                  <p className="mt-1 text-sm text-gray-600">Update your password and security preferences</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current password</label>
                    <input
                      type="password"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New password</label>
                    <input
                      type="password"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm new password</label>
                    <input
                      type="password"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                      placeholder="Confirm new password"
                    />
                  </div>
                  
                  <div className="pt-4 pb-6 border-t border-gray-200">
                    <button onClick={() => alert('Password changed successfully!')} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-lg shadow-blue-600/20">
                      Change Password
                    </button>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="text-sm text-blue-800">
                        <p className="font-semibold mb-1">Password Requirements</p>
                        <ul className="space-y-1 text-blue-700">
                          <li>• At least 8 characters long</li>
                          <li>• Contains uppercase and lowercase letters</li>
                          <li>• Includes at least one number</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === 'notifications' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Notification Preferences</h2>
                  <p className="mt-1 text-sm text-gray-600">Choose what notifications you want to receive</p>
                </div>

                <div className="space-y-6">
                  {[
                    { key: 'orderUpdates', label: 'Order Updates', description: 'Get notified about your order status and delivery' },
                    { key: 'promotions', label: 'Promotions & Deals', description: 'Receive special offers and discounts' },
                    { key: 'marketingEmails', label: 'Marketing Emails', description: 'Product recommendations and news' },
                    { key: 'securityAlerts', label: 'Security Alerts', description: 'Important account security notifications' },
                  ].map((item) => (
                    <label key={item.key} className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={notifications[item.key]}
                        onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                        className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{item.label}</div>
                        <div className="text-sm text-gray-600 mt-0.5">{item.description}</div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-lg shadow-blue-600/20">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage