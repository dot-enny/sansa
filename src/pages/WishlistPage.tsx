import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

export default function WishlistPage() {
  const { items, remove } = useWishlist()
  const { add } = useCart()

  const handleMoveToCart = (p: any) => {
    add(p, 1)
    remove(p.id)
  }

  if (!items.length) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <h2 className="mb-4 text-2xl font-bold">Your wishlist</h2>
        <p className="mb-6 text-gray-600">You haven't saved any items yet.</p>
        <Link to="/" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Continue shopping</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h2 className="mb-6 text-2xl font-bold">Your wishlist</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((p) => (
          <div key={String(p.id)} className="flex items-start gap-4 rounded-lg border p-4">
            <img src={p.image || 'https://via.placeholder.com/120'} alt={p.title} className="h-24 w-24 rounded-md object-contain" />
            <div className="flex flex-1 flex-col">
              <Link to={`/product/${p.id}`} className="mb-1 font-semibold text-gray-900 hover:underline">{p.title}</Link>
              <div className="mb-3 text-sm text-gray-600">{p.price}</div>
              <div className="mt-auto flex gap-2">
                <button onClick={() => handleMoveToCart(p)} className="rounded-md bg-green-600 px-3 py-1 text-sm font-semibold text-white hover:bg-green-700">Move to cart</button>
                <button onClick={() => remove(p.id)} className="rounded-md border px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
