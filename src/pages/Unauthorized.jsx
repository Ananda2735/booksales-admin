
import { Link } from 'react-router-dom'

function Unauthorized() {
  return (
    <div className="container text-center py-5">
      <h1 className="display-3 fw-bold text-danger">403</h1>

      <h3>Akses Ditolak!</h3>

      <p className="text-secondary">
        Maaf, kamu tidak memiliki izin untuk membuka halaman ini.
      </p>

      <Link to="/home" className="btn btn-primary">
        Kembali ke Beranda
      </Link>
    </div>
  )
}

export default Unauthorized
