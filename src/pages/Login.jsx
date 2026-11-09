
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const user = await login(email, password)

      if (user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true })
      } else {
        navigate('/home', { replace: true })
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 'Login gagal. Periksa koneksi Laravel.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card border-0 shadow p-4" style={{ width: '400px' }}>
        <h2 className="text-center fw-bold mb-2">BookSales.</h2>

        <p className="text-center text-secondary mb-4">
          Login Pengguna
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
            <Link to="/register" className="text-decoration-none fw-bold">
              Daftar sekarang
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
