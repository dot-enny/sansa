import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import {
  HiOutlineDesktopComputer,
  HiOutlineShoppingBag,
  HiOutlineHome,
  HiOutlineSparkles,
  HiOutlineHeart,
  HiOutlinePuzzle,
  HiOutlineCake,
  HiOutlineShieldCheck,
  HiOutlineLightBulb,
  HiOutlineSun,
  HiOutlineFire,
  HiOutlineChevronRight,
} from 'react-icons/hi'

interface Category {
  name: string
  icon: React.ElementType
  count?: number
  color: string
}

const CATEGORIES: Category[] = [
  { name: 'Electronics', icon: HiOutlineDesktopComputer, count: 2847, color: 'text-blue-600' },
  { name: 'Grocery & Fruits', icon: HiOutlineShoppingBag, count: 1923, color: 'text-green-600' },
  { name: 'Home & Furniture', icon: HiOutlineHome, count: 1564, color: 'text-amber-600' },
  { name: 'Fashion & Accessories', icon: HiOutlineSparkles, count: 3201, color: 'text-pink-600' },
  { name: 'Beauty & Personal Care', icon: HiOutlineHeart, count: 987, color: 'text-rose-600' },
  { name: 'Pets', icon: HiOutlinePuzzle, count: 456, color: 'text-purple-600' },
  { name: 'Baby & Kids', icon: HiOutlineCake, count: 789, color: 'text-cyan-600' },
  { name: 'Toys & Video Games', icon: HiOutlineFire, count: 1234, color: 'text-orange-600' },
  { name: 'Health & Wellness', icon: HiOutlineShieldCheck, count: 876, color: 'text-teal-600' },
  { name: 'Household & Essentials', icon: HiOutlineLightBulb, count: 1098, color: 'text-yellow-600' },
  { name: 'Patio & Garden', icon: HiOutlineSun, count: 567, color: 'text-lime-600' },
  { name: 'Sport & Outdoor', icon: HiOutlineFire, count: 1432, color: 'text-red-600' },
]

const CategoriesSidebar: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  return (
    <aside className="w-72">
      <div className="sticky top-6">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
          {/* Header */}
          <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-4">
            <h3 className="text-base font-bold text-gray-900">Browse Categories</h3>
            <p className="mt-0.5 text-xs text-gray-600">Explore our product range</p>
          </div>

          {/* Categories List */}
          <ul className="divide-y divide-gray-100">
            {CATEGORIES.map((category) => {
              const Icon = category.icon
              const isHovered = hoveredCategory === category.name
              
              return (
                <li key={category.name}>
                  <Link
                    to={`/category/${category.name.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`}
                    className="group flex items-center justify-between px-5 py-3.5 transition-all hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent"
                    onMouseEnter={() => setHoveredCategory(category.name)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Icon Container */}
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br transition-all group-hover:scale-110 group-hover:shadow-md ${
                          isHovered
                            ? 'from-blue-100 to-blue-200'
                            : 'from-gray-100 to-gray-50'
                        }`}
                      >
                        <Icon
                          className={`text-lg transition-colors ${
                            isHovered ? category.color : 'text-gray-600'
                          }`}
                        />
                      </div>

                      {/* Category Info */}
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                          {category.name}
                        </span>
                        {category.count && (
                          <span className="text-xs text-gray-500 transition-colors group-hover:text-blue-500">
                            {category.count.toLocaleString()} items
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Arrow Indicator */}
                    <HiOutlineChevronRight
                      className={`text-lg text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-blue-600 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Footer CTA */}
          <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
            <Link
              to="/categories"
              className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-md active:scale-95"
            >
              View All Categories
              <HiOutlineChevronRight className="text-base" />
            </Link>
          </div>
        </div>

        {/* Promotional Banner */}
        <div className="mt-4 overflow-hidden rounded-xl bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 p-5 shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-white/90">Special Offer</p>
              <h4 className="mt-1 text-xl font-black text-white">Up to 70% Off</h4>
              <p className="mt-1 text-sm text-white/90">On selected items</p>
              <button className="mt-3 rounded-lg bg-white px-4 py-2 text-xs font-bold text-orange-600 shadow-md transition-all hover:scale-105 hover:shadow-lg active:scale-95">
                Shop Now
              </button>
            </div>
            <div className="opacity-20">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default CategoriesSidebar