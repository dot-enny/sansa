import React, { useState } from 'react'
import ORDERS from '../data/orders'
import { Link } from 'react-router-dom'

const AccountPage: React.FC = () => {
  const [tab, setTab] = useState<'profile' | 'orders' | 'addresses' | 'payments' | 'security' | 'notifications'>('profile')

  // Mock profile state
  const [profile, setProfile] = useState({ name: 'John Doe', email: 'john@example.com', phone: '' })

  const [addresses, setAddresses] = useState([
    { id: 'addr_1', label: 'Home', value: '123 Main St, City, Country' },
  ])

  const [payments] = useState([
    { id: 'pm_1', brand: 'Visa', last4: '4242', exp: '12/26' },
  ])

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app we'd send to API. For now we just keep local state.
    alert('Profile saved (demo)')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Account</h1>
        <div className="text-sm text-gray-600">Manage your profile, orders and settings</div>
      </div>

      <div className="flex gap-4">
        <nav className="w-48 sticky top-20">
          <ul className="space-y-2">
            <li>
              <button className={`w-full text-left px-3 py-2 rounded ${tab==='profile'? 'bg-blue-50 font-semibold':''}`} onClick={() => setTab('profile')}>Profile</button>
            </li>
            <li>
              <button className={`w-full text-left px-3 py-2 rounded ${tab==='orders'? 'bg-blue-50 font-semibold':''}`} onClick={() => setTab('orders')}>Orders</button>
            </li>
            <li>
              <button className={`w-full text-left px-3 py-2 rounded ${tab==='addresses'? 'bg-blue-50 font-semibold':''}`} onClick={() => setTab('addresses')}>Addresses</button>
            </li>
            <li>
              <button className={`w-full text-left px-3 py-2 rounded ${tab==='payments'? 'bg-blue-50 font-semibold':''}`} onClick={() => setTab('payments')}>Payment methods</button>
            </li>
            <li>
              <button className={`w-full text-left px-3 py-2 rounded ${tab==='security'? 'bg-blue-50 font-semibold':''}`} onClick={() => setTab('security')}>Security</button>
            </li>
            <li>
              <button className={`w-full text-left px-3 py-2 rounded ${tab==='notifications'? 'bg-blue-50 font-semibold':''}`} onClick={() => setTab('notifications')}>Notifications</button>
            </li>
          </ul>
        </nav>

        <div className="flex-1">
          {tab === 'profile' && (
            <section className="rounded bg-white p-6 shadow">
              <h2 className="text-lg font-semibold mb-4">Profile</h2>
              <form onSubmit={saveProfile} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700">Full name</label>
                  <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full rounded border px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Email</label>
                  <input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="w-full rounded border px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Phone</label>
                  <input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="w-full rounded border px-3 py-2" />
                </div>
                <div>
                  <button className="rounded bg-blue-600 text-white px-4 py-2">Save profile</button>
                </div>
              </form>
            </section>
          )}

          {tab === 'orders' && (
            <section className="rounded bg-white p-6 shadow">
              <h2 className="text-lg font-semibold mb-4">Orders</h2>
              {ORDERS.length === 0 ? (
                <p className="text-sm text-gray-600">You have no orders yet.</p>
              ) : (
                <ul className="space-y-3">
                  {ORDERS.map((o) => (
                    <li key={o.id} className="flex items-center justify-between border rounded p-3">
                      <div>
                        <div className="font-medium">Order {o.id}</div>
                        <div className="text-sm text-gray-500">{o.date} · {o.total}</div>
                      </div>
                      <div>
                        <Link to={`/orders/${o.id}`} className="text-blue-600 hover:underline">View</Link>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {tab === 'addresses' && (
            <section className="rounded bg-white p-6 shadow">
              <h2 className="text-lg font-semibold mb-4">Addresses</h2>
              <ul className="space-y-3">
                {addresses.map((a) => (
                  <li key={a.id} className="flex items-center justify-between border rounded p-3">
                    <div>
                      <div className="font-medium">{a.label}</div>
                      <div className="text-sm text-gray-500">{a.value}</div>
                    </div>
                    <div>
                      <button className="text-sm text-red-600 mr-2">Delete</button>
                      <button className="text-sm text-blue-600">Edit</button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <button className="rounded bg-green-600 text-white px-3 py-2">Add address</button>
              </div>
            </section>
          )}

          {tab === 'payments' && (
            <section className="rounded bg-white p-6 shadow">
              <h2 className="text-lg font-semibold mb-4">Payment methods</h2>
              <ul className="space-y-3">
                {payments.map((p) => (
                  <li key={p.id} className="flex items-center justify-between border rounded p-3">
                    <div>
                      <div className="font-medium">{p.brand} •••• {p.last4}</div>
                      <div className="text-sm text-gray-500">Exp {p.exp}</div>
                    </div>
                    <div>
                      <button className="text-sm text-red-600 mr-2">Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <button className="rounded bg-green-600 text-white px-3 py-2">Add payment method</button>
              </div>
            </section>
          )}

          {tab === 'security' && (
            <section className="rounded bg-white p-6 shadow">
              <h2 className="text-lg font-semibold mb-4">Security</h2>
              <form onSubmit={(e) => { e.preventDefault(); alert('Password changed (demo)') }} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700">Current password</label>
                  <input type="password" className="w-full rounded border px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">New password</label>
                  <input type="password" className="w-full rounded border px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Confirm new password</label>
                  <input type="password" className="w-full rounded border px-3 py-2" />
                </div>
                <div>
                  <button className="rounded bg-blue-600 text-white px-4 py-2">Change password</button>
                </div>
              </form>
            </section>
          )}

          {tab === 'notifications' && (
            <section className="rounded bg-white p-6 shadow">
              <h2 className="text-lg font-semibold mb-4">Notifications</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Order updates</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" />
                  <span className="text-sm">Marketing emails</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">Security alerts</span>
                </label>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default AccountPage
