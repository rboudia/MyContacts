import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

export default function Register() {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await api('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ firstName, email, password })
      })
      navigate('/login')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
  <div className="card" style={{ maxWidth: '400px', margin: '50px auto', padding: '30px' }}>
    <h2 style={{ marginBottom: '20px' }}>S'inscrire</h2>
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <label>Prénom</label>
      <input value={firstName} onChange={e => setFirstName(e.target.value)} style={{ padding: '8px' }} />

      <label>Email</label>
      <input value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '8px' }} />

      <label>Mot de passe</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ padding: '8px' }} />

      <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>S'inscrire</button>

      {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
    </form>
  </div>
  )

}