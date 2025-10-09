import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav style={{ marginBottom: 20 }}>
      {token ? (
        <>
          <Link className="nav-link" to="/contacts">Contacts</Link>
          {' | '}
          <button className="nav-link" onClick={handleLogout}>Déconnexion</button>
        </>
      ) : (
        <>
          <Link className="nav-link" to="/login">Connexion</Link>
          {' | '}
          <Link className="nav-link" to="/register">Inscription</Link>
        </>
      )}
    </nav>
  )
}