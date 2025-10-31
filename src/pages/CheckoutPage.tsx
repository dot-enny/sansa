import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { FiTrash2, FiShoppingBag, FiArrowLeft } from 'react-icons/fi'

const CartPage: React.FC = () => {
  const { items, remove, updateQty, clear, totalItems } = useCart()

  const subtotal = items.reduce((s, it) => {
    const n = Number(String(it.product.price).replace(/[^0-9.\-]+/g, '')) || 0
    return s + n * it.quantity
  }, 0)

  const estimatedTax = subtotal * 0.08
  const total = subtotal + estimatedTax

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <FiArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="mt-2 text-gray-600">
            {totalItems > 0 ? `${totalItems} ${totalItems === 1 ? 'item' : 'items'} in your cart` : 'Your cart is empty'}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <FiShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started</p>
            <Link 
              to="/" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {items.map((it) => {
                    const itemPrice = Number(String(it.product.price).replace(/[^0-9.\-]+/g, '')) || 0
                    const itemTotal = itemPrice * it.quantity
                    
                    return (
                      <div key={String(it.product.id)} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-6">
                          <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                            <img 
                              src={it.product.image} 
                              alt={it.product.title} 
                              className="w-full h-full object-contain"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {it.product.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">{it.product.vendor}</p>
                            
                            <div className="flex flex-wrap items-center gap-4">
                              <div className="flex items-center gap-2">
                                <label htmlFor={`qty-${it.product.id}`} className="text-sm font-medium text-gray-700">
                                  Quantity:
                                </label>
                                <input
                                  id={`qty-${it.product.id}`}
                                  type="number"
                                  value={it.quantity}
                                  min={1}
                                  max={it.product.available ?? undefined}
                                  onChange={(e) => updateQty(it.product.id, Number(e.target.value))}
                                  className="w-20 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>
                              
                              <button 
                                onClick={() => remove(it.product.id)} 
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                              >
                                <FiTrash2 className="w-4 h-4" />
                                Remove
                              </button>
                            </div>
                            
                            {typeof it.product.available === 'number' && it.product.available < 10 && (
                              <p className="mt-2 text-xs text-amber-600 font-medium">
                                Only {it.product.available} left in stock
                              </p>
                            )}
                          </div>
                          
                          <div className="text-right flex-shrink-0">
                            <div className="text-lg font-bold text-gray-900">
                              ${itemTotal.toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              ${itemPrice.toFixed(2)} each
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <button 
                    onClick={() => clear()} 
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Clear entire cart
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                    <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Estimated Tax</span>
                    <span className="font-medium text-gray-900">${estimatedTax.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-200 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-3.5 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3 shadow-sm">
                  Proceed to Checkout
                </button>
                
                <p className="text-xs text-center text-gray-500">
                  Secure checkout powered by industry-standard encryption
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage