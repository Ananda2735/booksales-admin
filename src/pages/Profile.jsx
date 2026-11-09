
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Profile() {
  const { user, role, logout } = useAuth()

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Profil Pengguna</h2>

      <div className="card shadow-sm border-0 p-4">
        <h5>Informasi Akun</h5>

        <p className="mt-3">
          <strong>Nama:</strong> {user?.name}
        </p>

        <p>
          <strong>Email:</strong> {user?.email}
        </p>

        <p>
          <strong>Role:</strong> {role}
        </p>

        <div className="d-flex gap-2">
          <Link
            to={role === 'admin' ? '/admin/dashboard' : '/home'}
            className="btn btn-primary"
          >
            Kembali
          </Link>

          <button onClick={logout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
