export type Vendor = {
  id: string
  name: string
  slug: string
  description?: string
  rating?: number
  location?: string
  logo?: string
}

export const VENDORS: Vendor[] = [
  {
    id: 'bacola',
    name: 'Bacola',
    slug: 'bacola',
    description: 'Quality baby and kids products since 1998. Trusted by parents worldwide.',
    rating: 4.4,
    location: 'New York, USA',
    logo: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&s=',
  },
  {
    id: 'djewno',
    name: 'Djewno',
    slug: 'djewno',
    description: 'Electronics and gadgets with a focus on value and reliability.',
    rating: 4.1,
    location: 'San Francisco, USA',
    logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&s=',
  },
  {
    id: 'clotya',
    name: 'Clotya',
    slug: 'clotya',
    description: 'Home and lifestyle goods crafted with care.',
    rating: 4.2,
    location: 'Austin, USA',
    logo: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&s=',
  },
  {
    id: 'grogin',
    name: 'Grogin',
    slug: 'grogin',
    description: 'Natural and organic grocery products.',
    rating: 4.6,
    location: 'Portland, USA',
    logo: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&s=',
  },
]

export default VENDORS
