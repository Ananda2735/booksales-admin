
import { useState } from 'react'
import './Register.css'

function Register({ onBackToLogin }) {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    username: '',
    password: '',
    konfirmasiPassword: '',
  })

  const [pesan, setPesan] = useState('')
  const [berhasil, setBerhasil] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setPesan('')
    setBerhasil(false)

    if (Object.values(formData).some((value) => !value.trim())) {
      setPesan('Semua kolom wajib diisi!')
      return
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailValid.test(formData.email)) {
      setPesan('Format email tidak valid!')
      return
    }

    if (formData.username.length < 4) {
      setPesan('Username minimal 4 karakter!')
      return
    }

    if (formData.password.length < 8) {
      setPesan('Password minimal 8 karakter!')
      return
    }

    if (formData.password !== formData.konfirmasiPassword) {
      setPesan('Konfirmasi password tidak sama!')
      return
    }

    setBerhasil(true)
    setPesan('Registrasi berhasil! Data berhasil divalidasi.')

    setFormData({
      nama: '',
      email: '',
      username: '',
      password: '',
      konfirmasiPassword: '',
    })
  }

  return (
    <div className="register-container">
      <div className="card border-0 shadow-lg register-card">

        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">BookSales.</h2>
          <h4 className="fw-bold mt-3">Buat Akun Baru</h4>
          <p className="text-secondary">
            Daftarkan akun kamu untuk mulai menggunakan BookSales.
          </p>
        </div>

        {pesan && (
          <div className={`alert ${berhasil ? 'alert-success' : 'alert-danger'}`}>
            {pesan}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="nama"
              className="form-control"
              placeholder="Masukkan nama lengkap"
              value={formData.nama}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="contoh@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Buat username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Minimal 8 karakter"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">
              Konfirmasi Password
            </label>
            <input
              type="password"
              name="konfirmasiPassword"
              className="form-control"
              placeholder="Ulangi password"
              value={formData.konfirmasiPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-bold"
          >
            Daftar Sekarang
          </button>

        </form>

        <div className="text-center mt-4">
          <span className="text-secondary">
            Sudah punya akun?
          </span>
          {' '}
          <button
            type="button"
            className="btn btn-link p-0 text-decoration-none fw-bold"
            onClick={onBackToLogin}
          >
            Login di sini
          </button>
        </div>

      </div>
    </div>
  )
}

export default Register
