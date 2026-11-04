
import { useEffect, useState } from 'react'
import api from '../api'

function Author() {
  const [authors, setAuthors] = useState([])
  const [name, setName] = useState('')
  const [editId, setEditId] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  // Mengambil data author
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

  // Tambah dan update author
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (editId) {
        await api.put(`/authors/${editId}`, { name })
        setMessage('Author berhasil diperbarui!')
      } else {
        await api.post('/authors', { name })
        setMessage('Author berhasil ditambahkan!')
      }

      setName('')
      setEditId(null)
      await getAuthors()
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        'Gagal menyimpan data author.'
      )
    } finally {
      setLoading(false)
    }
  }

  // Memilih author untuk diedit
  const handleEdit = (author) => {
    setEditId(author.id)
    setName(author.name)
    setMessage('')
  }

  // Membatalkan edit
  const handleCancel = () => {
    setEditId(null)
    setName('')
    setMessage('')
  }

  // Menghapus author
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Apakah kamu yakin ingin menghapus author ini?'
    )

    if (!confirmDelete) return

    try {
      await api.delete(`/authors/${id}`)
      setMessage('Author berhasil dihapus!')
      await getAuthors()
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        'Gagal menghapus author.'
      )
    }
  }

  return (
    <div>
      <h3 className="fw-bold mb-2">Data Author</h3>
      <p className="text-secondary">
        Kelola data penulis buku dengan mudah.
      </p>

      {message && (
        <div className="alert alert-info">{message}</div>
      )}

      {/* Form tambah dan edit */}
      <div className="card border-0 shadow-sm p-4 mb-4">
        <h5 className="fw-bold mb-3">
          {editId ? 'Edit Author' : 'Tambah Author'}
        </h5>

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
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading
                  ? 'Menyimpan...'
                  : editId
                    ? 'Simpan Perubahan'
                    : 'Tambah Author'}
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

      {/* Daftar author */}
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

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>No.</th>
                <th>ID</th>
                <th>Nama Author</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {authors.length > 0 ? (
                authors.map((author, index) => (
                  <tr key={author.id}>
                    <td>{index + 1}</td>
                    <td>{author.id}</td>
                    <td>{author.name}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleEdit(author)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(author.id)}
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
                    Belum ada data author.
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

export default Author
