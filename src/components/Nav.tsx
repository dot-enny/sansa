// src/components/EcomHeader.tsx
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  HiOutlineSearch,
  HiOutlineHeart,
  HiOutlineArrowUp,
  HiOutlineUser,
  HiOutlineShoppingCart,
  HiOutlineChevronDown,
  HiOutlineViewGrid,
  HiOutlineMenu,
  HiOutlineX,
} from 'react-icons/hi'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const categories = ['All', 'Electronics', 'Home', 'Beauty', 'Fashion', 'Toys', 'Grocery']

export default function EcomHeader() {
  const [selectedCat, setSelectedCat] = useState('All')
  const [shopOpen, setShopOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const shopRef = useRef<HTMLDivElement>(null)
  const { totalItems } = useCart()
  const { count: wishlistCount } = useWishlist()

  // Close popovers on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (shopRef.current && !shopRef.current.contains(e.target as Node)) setShopOpen(false)
    }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/90 shadow-sm">
      {/* Top bar */}
      <div className="mx-auto flex w-full max-w-7xl justify-between items-center gap-2 px-4 py-3 lg:gap-4">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center justify-center rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenu className="text-2xl" />}
        </button> 

        

        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-md" />
          <span className="text-xl font-bold tracking-tight text-gray-900">Bevesi</span>
        </Link>

        {/* Promo pill - hidden on mobile */}
        <div className="hidden items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm xl:flex">
          <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-blue-700 shadow-sm">
            -50%
          </span>
          <span className="font-medium text-gray-700">Winter Sale</span>
        </div>

        {/* Desktop Search */}
        <div className="relative ml-auto hidden w-full max-w-2xl items-center lg:flex">
       
      

          {/* Search Input */}
          <div className="flex h-11 w-full overflow-hidden rounded-r-lg border border-gray-300 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500">
            <input
              type="text"
              placeholder="Search products, brands, and categories..."
              className="h-full w-full px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none"
            />
            <button
              className="flex h-full w-12 shrink-0 items-center justify-center bg-blue-600 text-white transition hover:bg-blue-700 active:scale-95"
              aria-label="Search"
            >
              <HiOutlineSearch className="text-xl" />
            </button>
          </div>
        </div>

        {/* Mobile search button */}
        <button
          type="button"
          onClick={() => setSearchOpen(!searchOpen)}
          className="flex items-center justify-center rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 lg:hidden"
          aria-label="Search"
        >
          <HiOutlineSearch className="text-2xl" />
        </button>

        {/* Action Icons */}
        <nav className="ml-2 hidden items-center gap-4 xl:gap-6 lg:flex">
          <Link to="/wishlist" className="group relative flex flex-col items-center gap-1">
            <span className="rounded-full bg-gray-100 p-2 text-gray-700 transition group-hover:bg-blue-50 group-hover:text-blue-600">
              <HiOutlineHeart className="text-xl" />
            </span>
            <span className="text-xs font-medium text-gray-600 transition group-hover:text-blue-600">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-pink-600 px-1.5 text-xs font-bold text-white shadow-md">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link to="/reorder" className="group flex flex-col items-center gap-1">
            <span className="rounded-full bg-gray-100 p-2 text-gray-700 transition group-hover:bg-blue-50 group-hover:text-blue-600">
              <HiOutlineArrowUp className="text-xl" />
            </span>
            <span className="text-xs font-medium text-gray-600 transition group-hover:text-blue-600">Reorder</span>
          </Link>
          <Link to="/account" className="group flex flex-col items-center gap-1">
            <span className="rounded-full bg-gray-100 p-2 text-gray-700 transition group-hover:bg-blue-50 group-hover:text-blue-600">
              <HiOutlineUser className="text-xl" />
            </span>
            <span className="text-xs font-medium text-gray-600 transition group-hover:text-blue-600">Account</span>
          </Link>
          <Link to="/cart" className="group relative flex flex-col items-center gap-1">
            <span className="rounded-full bg-gray-100 p-2 text-gray-700 transition group-hover:bg-blue-50 group-hover:text-blue-600">
              <HiOutlineShoppingCart className="text-xl" />
            </span>
            <span className="text-xs font-medium text-gray-600 transition group-hover:text-blue-600">Cart</span>
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1.5 text-xs font-bold text-white shadow-md">
              {totalItems}
            </span>
          </Link>
        </nav>

        {/* Mobile cart icon */}
        <Link to="/cart" className="relative flex items-center justify-center rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 lg:hidden">
          <HiOutlineShoppingCart className="text-2xl" />
          <span className="absolute right-0 top-0 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1.5 text-xs font-bold text-white shadow-md">
            {totalItems}
          </span>
        </Link>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="border-t bg-gray-50 px-4 py-3 lg:hidden">
          <div className="flex h-11 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
            <input
              type="text"
              placeholder="Search products..."
              className="h-full w-full px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none"
            />
            <button
              className="flex h-full w-12 shrink-0 items-center justify-center bg-blue-600 text-white transition active:bg-blue-700"
              aria-label="Search"
            >
              <HiOutlineSearch className="text-xl" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation - Desktop */}
      <div className="hidden border-t bg-gray-50/50 lg:block">
        <div className="mx-auto w-full max-w-7xl px-4 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* All Categories Dropdown */}
              <div ref={shopRef} className="relative">
                <button
                  type="button"
                  onClick={() => setShopOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={shopOpen}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 transition hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <HiOutlineViewGrid className="text-lg" />
                  <span>All Categories</span>
                  <HiOutlineChevronDown className={`transition-transform ${shopOpen ? 'rotate-180' : ''}`} />
                </button>

                {shopOpen && (
                  <div className="absolute left-0 top-12 z-40 grid w-[560px] grid-cols-2 gap-1 rounded-lg border border-gray-200 bg-white p-2 shadow-xl">
                    {categories.map((c) => (
                          <Link
                            key={c}
                            to={`/${c.toLowerCase()}`}
                            className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                            onClick={() => { setSelectedCat(c); setShopOpen(false) }}
                          >
                            {c}
                          </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Primary Navigation Links */}
              <Link to="/" className="text-sm font-semibold text-gray-700 transition hover:text-blue-600">
                Home
              </Link>
              <Link to="/electronics" className="text-sm font-semibold text-gray-700 transition hover:text-blue-600">
                Electronics
              </Link>
              <Link to="/home-furniture" className="text-sm font-semibold text-gray-700 transition hover:text-blue-600">
                Home & Furniture
              </Link>
              <Link to="/contact" className="text-sm font-semibold text-gray-700 transition hover:text-blue-600">
                Contact
              </Link>
              <Link to="/blog" className="text-sm font-semibold text-gray-700 transition hover:text-blue-600">
                Blog
              </Link>
            </div>

            <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 px-4 py-2 text-sm font-bold text-gray-900 shadow-md transition hover:shadow-lg hover:scale-105 active:scale-95">
              Today's Deal
              <HiOutlineChevronDown className="text-base" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (simplified) */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel - compact and focused */}
          <div className="fixed left-0 top-0 z-50 h-[calc(100vh-64px)] w-full max-w-sm overflow-y-auto bg-white shadow-2xl lg:hidden">
            {/* Header: logo + close */}
            <div className="flex items-center justify-between border-b p-4">
              <Link to="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500" />
                <span className="text-lg font-bold text-gray-900">Bevesi</span>
              </Link>
              <button
                className="rounded-lg p-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <HiOutlineX className="text-2xl" />
              </button>
            </div>

            {/* Account / Cart shortcuts */}
            <div className="flex items-center gap-3 border-b p-4">
              <Link to="/account" className="flex items-center gap-2 text-sm font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                <HiOutlineUser className="text-lg text-gray-700" />
                Account
              </Link>
              <Link to="/cart" className="ml-auto flex items-center gap-2 text-sm font-medium text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                <HiOutlineShoppingCart className="text-lg text-gray-700" />
                Cart
              </Link>
            </div>

            {/* Primary Navigation (important links only) */}
            <nav className="p-4">
              <div className="space-y-1">
                <Link to="/" className="block rounded-lg px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
                <Link to="/electronics" className="block rounded-lg px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                  Electronics
                </Link>
                <Link to="/products" className="block rounded-lg px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                  Shop
                </Link>
                <Link to="/contact" className="block rounded-lg px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                  Contact
                </Link>
                <Link to="/blog" className="block rounded-lg px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50" onClick={() => setMobileMenuOpen(false)}>
                  Blog
                </Link>
              </div>
            </nav>

            {/* Collapsible categories - simple list to keep menu focused */}
            <div className="border-t p-4">
              <h3 className="mb-2 text-sm font-semibold text-gray-600">Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <Link
                    key={c}
                    to={`/${c.toLowerCase()}`}
                    className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-center text-sm font-medium text-gray-700 hover:bg-blue-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}