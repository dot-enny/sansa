import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white">
        <div className="container mx-auto" style={{ maxWidth: 1200 }}>
          <Nav />
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto py-8" style={{ maxWidth: 1200 }}>
          <Outlet />
        </div>
      </main>

      <footer className="bg-slate-50 py-6 mt-8">
        <div className="container mx-auto px-4 text-sm text-slate-500" style={{ maxWidth: 1200 }}>
          © {new Date().getFullYear()} Sansa — Multi-vendor demo
        </div> 
      </footer>
    </div>
  )
}

export default App