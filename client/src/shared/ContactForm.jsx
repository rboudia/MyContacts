import { useState } from 'react'

export default function ContactForm({ initial = {}, onSubmit, onCancel }) {
  const [firstName, setFirstName] = useState(initial.firstName || '')
  const [lastName, setLastName] = useState(initial.lastName || '')
  const [phone, setPhone] = useState(initial.phone || '')

  const submit = async (e) => {
    e.preventDefault()
    try {
      await onSubmit({ firstName, lastName, phone }) 
      setFirstName('')
      setLastName('')
      setPhone('')
    } catch (err) {
    }
  }
  

  return (
    <form className="contact-form" onSubmit={submit}>
      <input placeholder="Prénom" value={firstName} onChange={e => setFirstName(e.target.value)} />
      <input placeholder="Nom" value={lastName} onChange={e => setLastName(e.target.value)} />
      <input placeholder="Téléphone" value={phone} onChange={e => setPhone(e.target.value)} />
      <div>
        <button type="submit">{initial._id ? 'Sauvegarder' : 'Ajouter'}</button>
        {onCancel && <button type="button" onClick={onCancel}>Annuler</button>}
      </div>
    </form>
  )
}