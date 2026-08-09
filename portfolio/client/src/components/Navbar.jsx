import { NavLink, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './navbar.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass = ({ isActive }) => 'nav-link' + (isActive ? ' active' : '')

  return (
    <header className={'navbar' + (scrolled ? ' scrolled' : '')}>
      <div className="navbar-inner container">
        <nav className="nav-group left">
          <NavLink to="/tools" className={linkClass}>Tools</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
        </nav>

        <Link to="/" className="brand">
          <img src="/logo.svg" alt="Biplab Logo" className="brand-logo" />
          <span className="brand-name">BIPLAB</span>
        </Link>

        <nav className="nav-group right">
          <NavLink to="/works" className={linkClass}>Works</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>

        <button
          className={'burger' + (open ? ' open' : '')}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          <NavLink to="/tools" onClick={() => setOpen(false)}>Tools</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
          <NavLink to="/works" onClick={() => setOpen(false)}>Works</NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
        </div>
      )}
    </header>
  )
}
