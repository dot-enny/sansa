import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import CategoryPage from './pages/CategoryPage'
import VendorPage from './pages/VendorPage'
import AdminDashboard from './pages/AdminDashboard'
import ProductPage from './pages/products/ProductPage'
import OrdersPage from './pages/OrdersPage'
import OrderPage from './pages/orders/OrderPage'
import AccountPage from './pages/AccountPage'
import VendorLayout from './components/layout/VendorLayout'
import AdminLayout from './components/layout/AdminLayout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CartPage from './pages/CartPage'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import WishlistPage from './pages/WishlistPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
      children: [
      { index: true, element: <Home /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'category/:slug', element: <CategoryPage /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'orders/:id', element: <OrderPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'product/:id', element: <ProductPage /> },
      { path: 'about', element: <About /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  // vendor routes use a different layout (different navbar)
  {
    path: '/vendor/:vendorId',
    element: <VendorLayout />,
    children: [{ index: true, element: <VendorPage /> }],
  },
  // admin routes use the admin layout
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
