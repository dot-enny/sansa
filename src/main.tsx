import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import Home from './pages/Home'
import Landing from './pages/Landing'
import About from './pages/About'
import NotFound from './pages/NotFound'
import CategoryPage from './pages/CategoryPage'
import StorePage from './pages/StorePage'
import VendorDashboard from './pages/vendor/VendorDashboard'
import AddProduct from './pages/vendor/AddProduct'
import ManageProducts from './pages/vendor/ManageProducts'
import VendorOrders from './pages/vendor/VendorOrders'
import AdminDashboard from './admin/pages/AdminDashboard'
import ProductPage from './pages/products/ProductPage'
import OrdersPage from './pages/OrdersPage'
import OrderPage from './pages/orders/OrderPage'
import AccountPage from './pages/AccountPage'
import CheckoutPage from './pages/CheckoutPage'
import VendorLayout from './components/layout/VendorLayout'
import LenderLayout from './components/layout/LenderLayout'
import AdminLayout from './admin/layout/AdminLayout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CartPage from './pages/CartPage'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { AuthProvider, ProtectedRoute } from './context/AuthContext'
import WishlistPage from './pages/WishlistPage'
import LenderDashboard from './pages/lender/LenderDashboard'
import Investments from './pages/lender/Investments'
import Wallet from './pages/lender/Wallet'
import Analytics from './pages/lender/Analytics'
import Documents from './pages/lender/Documents'
import Opportunities from './pages/lender/Opportunities'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { TestPage } from './pages/TestPage'

// Enhanced scrollbar behavior - show scrollbar thumb while scrolling
if (typeof window !== 'undefined') {
  let scrollTimeout: ReturnType<typeof setTimeout>
  
  const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement
    if (target.classList.contains('custom-scrollbar') || target.classList.contains('custom-scrollbar-minimal')) {
      target.classList.add('is-scrolling')
      
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        target.classList.remove('is-scrolling')
      }, 1000)
    }
  }
  
  // Listen to scroll events on elements with custom scrollbar classes
  document.addEventListener('scroll', handleScroll, true)
}

const router = createBrowserRouter([
  // Landing page - public access
  {
    path: '/',
    element: <Landing />,
  },
  
  // Auth routes - public access
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  
  // Main customer-facing app
  {
    path: '/shop',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'category/:slug', element: <CategoryPage /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'orders/:id', element: <OrderPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'product/:id', element: <ProductPage /> },
      { path: 'about', element: <About /> },
      // Public store pages - customers can browse any vendor's store
      { path: 'store/:vendorId', element: <StorePage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  
  // Vendor dashboard routes - protected, vendor role only
  {
    path: '/vendor-dashboard',
    element: (
      <ProtectedRoute allowedRoles={['vendor']}>
        <VendorLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <VendorDashboard /> },
      { path: 'add-product', element: <AddProduct /> },
      { path: 'manage-products', element: <ManageProducts /> },
      { path: 'orders', element: <VendorOrders /> },
    ],
  },
  
  // Lender dashboard routes - protected, lender role only
  {
    path: '/lender-dashboard',
    element: (
      <ProtectedRoute allowedRoles={['lender']}>
        <LenderLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <LenderDashboard /> },
      { path: 'opportunities', element: <Opportunities /> },
      { path: 'investments', element: <Investments /> },
      { path: 'wallet', element: <Wallet /> },
      { path: 'analytics', element: <Analytics /> },
      { path: 'documents', element: <Documents /> },
    ],
  },
  
  // Admin routes - protected, admin role only
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <AdminDashboard /> }],
  },

  { path: '/test', element: <TestPage /> },
]) 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  </StrictMode>,
)
