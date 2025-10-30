import React from 'react'
import ProductCard from '../molecules/ProductCard'
import type { Product } from '../molecules/ProductCard'

const SAMPLE: Product[] = [
  {
    id: 1,
    title: 'Apple iPhone 15 Pro Max 256GB Natural Titanium',
    vendor: 'Bacola',
    price: '$190.99',
    priceOld: '$271.50',
    discount: '10%',
    image: 'https://images.unsplash.com/photo-1523475496153-3d6ccffb4f9e?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=',
    rating: 4.33,
    available: 89,
  },
  {
    id: 2,
    title: 'Apple Watch Series 9 GPS 45mm',
    vendor: 'Djewno',
    price: '$71.15',
    priceOld: '$87.98',
    discount: '20%',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=',
    rating: 3.5,
    available: 31,
  },
  {
    id: 3,
    title: 'SAMSUNG 75\" Neo QLED 4K Smart TV',
    vendor: 'Clotya',
    price: '$980.99',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=',
    rating: 2.5,
    available: 83,
  },
  {
    id: 4,
    title: 'Lenovo IdeaPad 15 8GB RAM',
    vendor: 'Blonwe',
    price: '$312.25',
    priceOld: '$396.45',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=',
    rating: 5.0,
    available: 29,
  },
  {
    id: 5,
    title: 'instax mini Evo Instant Digital Camera',
    vendor: 'Grogin',
    price: '$175.45',
    priceOld: '$219.99',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=',
    rating: 3.5,
    available: 88,
  },
  {
    id: 6,
    title: '2021 Apple 10.2-inch iPad Wi-Fi 64GB',
    vendor: 'Djewno',
    price: '$759.65',
    priceOld: '$870.99',
    image: 'https://images.unsplash.com/photo-1587825140708-9f1f6a6b2f0b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=',
    rating: 3.33,
    available: 73,
  },
]

const ProductGrid: React.FC<{ products?: Product[] }> = ({ products = SAMPLE }) => {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-13">
        {products.map((p) => (
          // increase card width by passing the `width` prop (pixels or CSS value)
          <ProductCard key={p.id} product={p} width={290} />
        ))}
      </div>
    </section>
  )
}

export default ProductGrid
