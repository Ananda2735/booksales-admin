
import { useEffect, useState } from 'react'
import api from '../api'

function Genre() {
  const [genres, setGenres] = useState([])
  const [name, setName] = useState('')
  const [editId, setEditId] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  // Mengambil data genre
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

  // Tambah dan update genre
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (editId) {
        const response = await api.put(`/genres/${editId}`, {
          name,
        })

        setMessage('Genre berhasil diperbarui!')
      } else {
        const response = await api.post('/genres', { name })

        setMessage('Genre berhasil ditambahkan!')
      }

      setName('')
      setEditId(null)
      await getGenres()
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        'Gagal menyimpan data genre.'
      )
    } finally {
      setLoading(false)
    }
  }

  // Memilih genre untuk diedit
  const handleEdit = (genre) => {
    setEditId(genre.id)
    setName(genre.name)
    setMessage('')
  }

  // Membatalkan edit
  const handleCancel = () => {
    setEditId(null)
    setName('')
    setMessage('')
  }

  // Menghapus genre
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Apakah kamu yakin ingin menghapus genre ini?'
    )

    if (!confirmDelete) return

    try {
      await api.delete(`/genres/${id}`)
      setMessage('Genre berhasil dihapus!')
      await getGenres()
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        'Gagal menghapus genre.'
      )
    }
  }

  return (
    <div>
      <h3 className="fw-bold mb-2">Data Genre</h3>
      <p className="text-secondary">
        Kelola kategori buku dengan mudah.
      </p>

      {message && (
        <div className="alert alert-info">{message}</div>
      )}

      {/* Form tambah dan edit */}
      <div className="card border-0 shadow-sm p-4 mb-4">
        <h5 className="fw-bold mb-3">
          {editId ? 'Edit Genre' : 'Tambah Genre'}
        </h5>

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

            <div className="col-md-3 d-flex gap-2">
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading
                  ? 'Menyimpan...'
                  : editId
                    ? 'Simpan Perubahan'
                    : 'Tambah Genre'}
              </button>
            </div>
          </div>

          {editId && (
            <button
              type="button"
              className="btn btn-secondary btn-sm mt-3"
              onClick={handleCancel}
            >
              Batal Edit
            </button>
          )}
        </form>
      </div>

      {/* Daftar genre */}
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

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>No.</th>
                <th>ID</th>
                <th>Nama Genre</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {genres.length > 0 ? (
                genres.map((genre, index) => (
                  <tr key={genre.id}>
                    <td>{index + 1}</td>
                    <td>{genre.id}</td>
                    <td>{genre.name}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleEdit(genre)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(genre.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    Belum ada data genre.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Genre
