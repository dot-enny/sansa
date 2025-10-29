import { NavLink } from 'react-router-dom'
import '../App.css'

export default function Nav() {
  return (
    <nav className="main-nav">
      <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
        Home
      </NavLink>
      <span className="sep">|</span>
      <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
        About
      </NavLink>
    </nav>
  )
}
