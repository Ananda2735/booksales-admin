
import { useState } from 'react'
import api from './api'
import Genre from './pages/Genre'
import Author from './pages/Author'
import Register from './pages/Register'
import './App.css'

function App() {
  const [token, setToken] = useState(
    localStorage.getItem('admin_token') || ''
  )

  const [menu, setMenu] = useState('Dashboard')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  // Login admin
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await api.post('/login', {
        email,
        password,
      })

      const adminToken = response.data.data.token

      localStorage.setItem('admin_token', adminToken)

      api.defaults.headers.common['Authorization'] =
        `Bearer ${adminToken}`

      setToken(adminToken)
      setPassword('')
    } catch (error) {
      setError(
        error.response?.data?.message ||
        'Login gagal. Periksa koneksi Laravel.'
      )
    } finally {
      setLoading(false)
    }
  }

  // Logout admin
  const handleLogout = async () => {
    try {
      await api.post('/logout')
    } catch (error) {
      console.error('Logout API:', error)
    }

    localStorage.removeItem('admin_token')
    delete api.defaults.headers.common['Authorization']

    setToken('')
    setMenu('Dashboard')
    setEmail('')
    setPassword('')
  }

  // Halaman registrasi
  if (!token && showRegister) {
    return (
      <Register
        onBackToLogin={() => setShowRegister(false)}
      />
    )
  }

  // Halaman login
  if (!token) {
    return (
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card border-0 shadow p-4" style={{ width: '400px' }}>
          <h2 className="text-center fw-bold mb-2">BookSales.</h2>
          <p className="text-center text-secondary mb-4">
            Login Admin
          </p>

          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? 'Memproses...' : 'Login'}
            </button>

            <div className="text-center mt-3">
              <span className="text-secondary">
                Belum punya akun?
              </span>
              {' '}
              <button
                type="button"
                className="btn btn-link p-0 text-decoration-none fw-bold"
                onClick={() => setShowRegister(true)}
              >
                Daftar sekarang
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Dashboard admin
  return (
    <div className="d-flex min-vh-100">
      <aside className="sidebar p-4 text-white">
        <h3 className="fw-bold mb-5">BookSales.</h3>

        <p className="text-uppercase small text-white-50">
          Menu Utama
        </p>

        {['Dashboard', 'Genre', 'Author'].map((item) => (
          <button
            key={item}
            onClick={() => setMenu(item)}
            className={`btn w-100 text-start mb-2 ${
              menu === item
                ? 'btn-light text-primary'
                : 'btn-outline-light'
            }`}
          >
            {item}
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="btn btn-outline-light w-100 mt-5"
        >
          Logout
        </button>
      </aside>

      <main className="flex-grow-1 p-4 bg-light">
        {menu === 'Dashboard' && (
          <div>
            <h2 className="fw-bold">Dashboard Admin</h2>
            <p className="text-secondary">
              Selamat datang di halaman Admin BookSales.
            </p>

            <div className="card border-0 shadow-sm p-4 mt-4">
              <h5>Selamat Datang!</h5>
              <p className="mb-0">
                Kelola data genre dan author buku melalui menu di sebelah kiri.
              </p>
            </div>
          </div>
        )}

        {menu === 'Genre' && <Genre />}
        {menu === 'Author' && <Author />}
      </main>
    </div>
  )
}

export default App
