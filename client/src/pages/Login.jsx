import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [logoutMessage, setLogoutMessage] = useState('')
  const [token, setToken] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()

  useEffect(() => {
    const msg = localStorage.getItem('logoutMessage')
    if (msg) {
      setLogoutMessage(msg)
      localStorage.removeItem('logoutMessage')
    }
    if (token) {
      navigate('/contacts')
    }
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })
      localStorage.setItem('token', res.token)
      setToken(res.token)
      navigate('/contacts')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
  <div className="card" style={{ maxWidth: '400px', margin: '50px auto', padding: '30px' }}>
    <h2 style={{ marginBottom: '20px' }}>{token ? 'Connecté' : 'Se connecter'}</h2>

    {token ? (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <p>Vous êtes connecté.</p>
        <button style={{ padding: '10px', cursor: 'pointer' }} onClick={handleLogout}>Se déconnecter</button>
      </div>
    ) : (
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '8px' }} />

        <label>Mot de passe</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ padding: '8px' }} />

        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>Se connecter</button>

        {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
      </form>
    )}

    {logoutMessage && <div className="error" style={{ color: 'orange', marginTop: '15px' }}>{logoutMessage}</div>}
  </div>
  )
}