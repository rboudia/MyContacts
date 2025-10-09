const API_URL = import.meta.env.VITE_API_URL

export async function api(path, options = {}) {
  const token = localStorage.getItem('token')
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_URL}${path}`, { ...options, headers })

  if ((res.status === 401 || res.status === 403) && !path.includes('/login')) {
    localStorage.setItem('logoutMessage', 'Votre session a expiré. Veuillez vous reconnecter.')
    localStorage.removeItem('token')
    window.location.href = '/login'
    return
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || errorData.error || 'Erreur serveur')
  }
  return res.json().catch(() => ({}))
}
