import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import ContactForm from '../shared/ContactForm'

export default function Contacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null)
  const navigate = useNavigate()

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const data = await api('/contacts')
      setContacts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    fetchContacts()
  }, [])

  const handleCreate = (data) => {
  setError(null)
  return api('/contacts', { method: 'POST', body: JSON.stringify(data) })
    .then(() => fetchContacts())
    .catch(err => { setError(err.message); throw err })
}

  const handleUpdate = async (id, data) => {
  setError(null)
  return api(`/contacts/${id}`, { method: 'PATCH', body: JSON.stringify(data) })
    .then(() => { setEditing(null); fetchContacts() })
    .catch(err => { setError(err.message); throw err })
}

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce contact ?')) return
    try {
      setError(null)
      await api(`/contacts/${id}`, { method: 'DELETE' })
      fetchContacts()
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <p>Chargement...</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Mes contacts</h2>
      </div>
      <ContactForm onSubmit={handleCreate} />
      {error && <p className="error">{error}</p>}
      <ul className="list">
        {contacts.map(c => (
          <li key={c._id}>
            {editing === c._id ? (
              <ContactForm initial={c} onSubmit={data => handleUpdate(c._id, data)} onCancel={() => setEditing(null)} />
            ) : (
              <div className="row">
                <div>
                  <strong>{c.firstName} {c.lastName}</strong>
                  <div>{c.phone}</div>
                </div>
                <div>
                  <button onClick={() => setEditing(c._id)}>Modifier</button>
                  <button onClick={() => handleDelete(c._id)}>Supprimer</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}