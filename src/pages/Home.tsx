import { useEffect, useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'

export default function Home() {
  const [count, setCount] = useState(() => {
    try {
      return Number(localStorage.getItem('sansa.count') || '0')
    } catch {
      return 0
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('sansa.count', String(count))
    } catch {}
  }, [count])

  return (
    <section>
      <h1>Welcome to Sansa</h1>

      <div className="card">
        <p>
          <button onClick={() => setCount((c) => c + 1)}>count is {count}</button>
        </p>
        <p className="read-the-docs">The counter is persisted to localStorage.</p>
      </div>

      <div className="logos">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p className="read-the-docs">This is the home page. Use the nav to move around.</p>
    </section>
  )
}
