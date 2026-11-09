
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Home() {
  const { user, logout } = useAuth()

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h3 className="fw-bold">BookSales.</h3>

        <div>
          <Link to="/profile" className="btn btn-outline-primary me-2">
            Profil
          </Link>

          <button onClick={logout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>

      <div className="card border-0 shadow-sm p-5">
        <h2 className="fw-bold">
          Selamat Datang, {user?.name}!
        </h2>

        <p className="text-secondary">
          Selamat datang di aplikasi BookSales.
          Temukan dan nikmati berbagai koleksi buku favoritmu.
        </p>

        <p className="mb-0">
          Role: <span className="badge bg-success">User</span>
        </p>
      </div>
    </div>
  )
}

export default Home
