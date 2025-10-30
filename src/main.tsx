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
import VendorLayout from './components/layout/VendorLayout'
import AdminLayout from './components/layout/AdminLayout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'category/:slug', element: <CategoryPage /> },
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
    <RouterProvider router={router} />
  </StrictMode>,
)
