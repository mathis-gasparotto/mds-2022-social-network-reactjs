import { Link, useNavigate } from 'react-router-dom'

export function Header() {
  const navigate = useNavigate()
  return (
    <header className="header">
      <nav className="navbar">
        <ul className="nav-items">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/chat" className="nav-link">Chat</Link>
          </li>
          <li className="nav-item">
            <Link to="/events" className="nav-link">Events</Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">My Account</Link>
          </li>
          <li className="nav-item">
            <button type="submit" className="nav-link" onClick={async() => {
              await fetch('/api/v1/logout', {
                method: 'POST'
              })
              navigate('/login')
            }}>Disconnect</button>
          </li>
        </ul>
      </nav>
    </header>
  )
}