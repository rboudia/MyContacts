import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Contacts from './pages/Contacts'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './shared/Navbar'   

export default function App() {
  return (
    <div className="app">
      <header>
        <h1>MyContacts</h1>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
          <Route path="/" element={<Login />} />
        </Routes>
      </main>
    </div>
  )
}