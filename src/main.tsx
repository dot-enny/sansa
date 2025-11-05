import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import Home from './pages/Home'
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
import WishlistPage from './pages/WishlistPage'
import LenderDashboard from './pages/lender/LenderDashboard'
import Investments from './pages/lender/Investments'
import Wallet from './pages/lender/Wallet'
import Analytics from './pages/lender/Analytics'

const router = createBrowserRouter([
  {
    path: '/',
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
  // Vendor dashboard routes - authenticated vendor manages their own store
  {
    path: '/vendor-dashboard',
    element: <VendorLayout />,
    children: [
      { index: true, element: <VendorDashboard /> },
      { path: 'add-product', element: <AddProduct /> },
      { path: 'manage-products', element: <ManageProducts /> },
      { path: 'orders', element: <VendorOrders /> },
    ],
  },
  // Lender dashboard routes - authenticated lender manages investments
  { 
    path: '/lender-dashboard', 
    element: <LenderLayout />,
    children: [
      { index: true, element: <LenderDashboard /> },
      { path: 'investments', element: <Investments /> },
      { path: 'wallet', element: <Wallet /> },
      { path: 'analytics', element: <Analytics /> },
    ]
  },
  // Admin routes use the admin layout
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [{ index: true, element: <AdminDashboard /> }],
  },
]) 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WishlistProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </WishlistProvider>
  </StrictMode>,
)
