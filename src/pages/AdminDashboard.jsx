
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function AdminDashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="d-flex min-vh-100">
      <aside className="sidebar p-4 text-white">
        <h3 className="fw-bold mb-5">BookSales.</h3>

        <p className="text-uppercase small text-white-50">
          Menu Admin
        </p>

        <Link
          to="/admin/dashboard"
          className="btn btn-light text-primary w-100 text-start mb-2"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/genre"
          className="btn btn-outline-light w-100 text-start mb-2"
        >
          Genre
        </Link>

        <Link
          to="/admin/author"
          className="btn btn-outline-light w-100 text-start mb-2"
        >
          Author
        </Link>

        <Link
          to="/profile"
          className="btn btn-outline-light w-100 text-start mb-2"
        >
          Profil
        </Link>

        <button
          onClick={logout}
          className="btn btn-outline-light w-100 mt-5"
        >
          Logout
        </button>
      </aside>

      <main className="flex-grow-1 p-4 bg-light">
        <h2 className="fw-bold">Dashboard Admin</h2>

        <p className="text-secondary">
          Selamat datang, {user?.name}!
        </p>

        <div className="card border-0 shadow-sm p-4 mt-4">
          <h5>Selamat Datang di BookSales Admin!</h5>

          <p className="mb-0">
            Kamu berhasil masuk sebagai administrator.
            Silakan kelola data Genre dan Author melalui menu.
          </p>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
