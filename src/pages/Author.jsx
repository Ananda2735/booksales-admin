
import { useEffect, useState } from 'react'
import api from '../api'

function Author() {
  const [authors, setAuthors] = useState([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const getAuthors = async () => {
    try {
      const response = await api.get('/authors')
      setAuthors(response.data.data)
    } catch (error) {
      setMessage('Gagal mengambil data author.')
      console.error(error)
    }
  }

  useEffect(() => {
    getAuthors()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await api.post('/authors', { name })
      setAuthors((previous) => [...previous, response.data.data])
      setName('')
      setMessage('Author berhasil ditambahkan!')
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        'Gagal menambahkan author.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h3 className="fw-bold mb-2">Data Author</h3>
      <p className="text-secondary">Kelola data penulis buku.</p>

      {message && (
        <div className="alert alert-info">{message}</div>
      )}

      <div className="card border-0 shadow-sm p-4 mb-4">
        <h5 className="fw-bold mb-3">Tambah Author</h5>

        <form onSubmit={handleSubmit}>
          <div className="row g-2">
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                placeholder="Nama author"
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
                {loading ? 'Menyimpan...' : 'Tambah Author'}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="card border-0 shadow-sm p-4">
        <div className="d-flex justify-content-between mb-3">
          <h5 className="fw-bold">Daftar Author</h5>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={getAuthors}
          >
            Refresh
          </button>
        </div>

        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>No.</th>
              <th>ID</th>
              <th>Nama Author</th>
            </tr>
          </thead>

          <tbody>
            {authors.length > 0 ? (
              authors.map((author, index) => (
                <tr key={author.id}>
                  <td>{index + 1}</td>
                  <td>{author.id}</td>
                  <td>{author.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  Belum ada data author.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Author
