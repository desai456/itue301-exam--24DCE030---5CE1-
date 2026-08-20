import { NavLink } from 'react-router-dom'

// Navigation links use React Router's NavLink so switching routes never
// triggers a full-page reload, and the active route is styled automatically.
function Navigation() {
  const linkClass = ({ isActive }) => (isActive ? 'active' : '')

  return (
    <nav className="tab-nav" aria-label="Primary">
      <NavLink to="/" end className={linkClass}>
        Home
      </NavLink>
      <NavLink to="/doctors" className={linkClass}>
        Doctors
      </NavLink>
      <NavLink to="/booking" className={linkClass}>
        Book Appointment
      </NavLink>
    </nav>
  )
}

export default Navigation
