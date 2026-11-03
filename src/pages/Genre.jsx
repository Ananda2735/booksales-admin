
import { useEffect, useState } from 'react'
import api from '../api'

function Genre() {
  const [genres, setGenres] = useState([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const getGenres = async () => {
    try {
      const response = await api.get('/genres')
      setGenres(response.data.data)
    } catch (error) {
      setMessage('Gagal mengambil data genre.')
      console.error(error)
    }
  }

  useEffect(() => {
    getGenres()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await api.post('/genres', { name })
      setGenres((previous) => [...previous, response.data.data])
      setName('')
      setMessage('Genre berhasil ditambahkan!')
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        'Gagal menambahkan genre.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h3 className="fw-bold mb-2">Data Genre</h3>
      <p className="text-secondary">Kelola kategori buku.</p>

      {message && (
        <div className="alert alert-info">{message}</div>
      )}

      <div className="card border-0 shadow-sm p-4 mb-4">
        <h5 className="fw-bold mb-3">Tambah Genre</h5>

        <form onSubmit={handleSubmit}>
          <div className="row g-2">
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                placeholder="Nama genre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-3">
              <button
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? 'Menyimpan...' : 'Tambah Genre'}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="card border-0 shadow-sm p-4">
        <div className="d-flex justify-content-between mb-3">
          <h5 className="fw-bold">Daftar Genre</h5>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={getGenres}
          >
            Refresh
          </button>
        </div>

        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>No.</th>
              <th>ID</th>
              <th>Nama Genre</th>
            </tr>
          </thead>

          <tbody>
            {genres.length > 0 ? (
              genres.map((genre, index) => (
                <tr key={genre.id}>
                  <td>{index + 1}</td>
                  <td>{genre.id}</td>
                  <td>{genre.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  Belum ada data genre.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Genre
