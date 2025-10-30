import React from 'react'
import { useParams, Link } from 'react-router-dom'
import ORDERS from '../../data/orders'
import PRODUCTS from '../../data/products'

const OrderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const order = ORDERS.find((o) => o.id === id)

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h2 className="text-xl font-bold">Order not found</h2>
        <Link to="/orders" className="mt-4 inline-block text-blue-600 hover:underline">
          ← Back to orders
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Order {order.id}</h1>
          <div className="text-sm text-gray-600">{order.date} · {order.customerName}</div>
        </div>
        <div>
          <Link to="/orders" className="text-sm text-blue-600 hover:underline">
            ← Back to Orders
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {order.items.map((it, idx) => {
            const p = PRODUCTS.find((pp) => String(pp.id) === String(it.productId))
            return (
              <div key={idx} className="flex items-start gap-4 rounded bg-white p-4 shadow">
                <img src={p?.image} alt={p?.title} className="h-20 w-20 object-contain" />
                <div className="flex-1">
                  <h3 className="font-semibold">{p?.title || `Product ${it.productId}`}</h3>
                  <div className="text-sm text-gray-600">Qty {it.quantity}</div>
                  <div className="mt-2 text-sm text-gray-700">Price: {it.price}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{it.price}</div>
                </div>
              </div>
            )
          })}
        </div>

        <aside className="rounded bg-white p-4 shadow">
          <div className="text-sm text-gray-600">Shipping</div>
          <div className="mt-2 text-sm">{order.shippingAddress}</div>

          <div className="mt-4 text-sm text-gray-600">Total</div>
          <div className="mt-1 text-xl font-bold">{order.total}</div>

          <div className="mt-6">
            <div className="text-sm text-gray-600">Status</div>
            <div className="mt-1 font-semibold">{order.status}</div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default OrderPage
