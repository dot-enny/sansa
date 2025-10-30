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
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: 'category/:slug', element: <CategoryPage /> },
        { path: 'vendor/:vendorId', element: <VendorPage /> },
        { path: 'admin', element: <AdminDashboard /> },
        { path: 'about', element: <About /> },
        { path: '*', element: <NotFound /> },
      ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
