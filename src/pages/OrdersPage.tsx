import React from 'react'
import { Link } from 'react-router-dom'
import ORDERS from '../data/orders'

const OrdersPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>

      {ORDERS.length === 0 ? (
        <div className="rounded p-6 bg-white shadow">No orders found.</div>
      ) : (
        <div className="space-y-4">
          {ORDERS.map((o) => (
            <div key={o.id} className="rounded bg-white p-4 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Order {o.id}</div>
                  <div className="text-sm text-gray-600">{o.date} · {o.customerName}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{o.total}</div>
                  <div className="text-sm text-gray-500">{o.status}</div>
                </div>
              </div>
              <div className="mt-3 text-sm">
                <Link to={`/orders/${o.id}`} className="text-blue-600 hover:underline">
                  View details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrdersPage
