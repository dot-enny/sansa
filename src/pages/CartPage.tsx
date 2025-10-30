import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const CartPage: React.FC = () => {
  const { items, remove, updateQty, clear, totalItems } = useCart()

  const subtotal = items.reduce((s, it) => {
    // price is a string like '$12.99' — parse roughly
    const n = Number(String(it.product.price).replace(/[^0-9.\-]+/g, '')) || 0
    return s + n * it.quantity
  }, 0)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {items.length === 0 ? (
        <div className="rounded p-6 bg-white shadow">
          <p className="text-gray-700">Your cart is empty.</p>
          <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {items.map((it) => (
              <div key={String(it.product.id)} className="flex items-start gap-4 rounded bg-white p-4 shadow">
                <img src={it.product.image} alt={it.product.title} className="h-20 w-20 object-contain" />
                <div className="flex-1">
                  <h3 className="font-semibold">{it.product.title}</h3>
                  <div className="text-sm text-gray-600">{it.product.vendor}</div>
                  <div className="mt-2 flex items-center gap-3">
                    <label className="text-sm">Qty</label>
                    <input
                      type="number"
                      value={it.quantity}
                      min={1}
                      onChange={(e) => updateQty(it.product.id, Number(e.target.value))}
                      className="w-20 rounded border px-2 py-1"
                    />
                    <button onClick={() => remove(it.product.id)} className="text-sm text-red-600">
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{it.product.price}</div>
                  <div className="text-sm text-gray-500">{it.product.available} left</div>
                </div>
              </div>
            ))}
          </div>

          <aside className="rounded bg-white p-4 shadow">
            <div className="text-sm text-gray-600">Items: {totalItems}</div>
            <div className="mt-2 text-xl font-bold">Subtotal ${subtotal.toFixed(2)}</div>
            <div className="mt-4 flex flex-col gap-2">
              <button className="rounded bg-green-600 text-white py-2">Proceed to checkout</button>
              <button onClick={() => clear()} className="rounded border py-2 text-sm">
                Clear cart
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

export default CartPage
