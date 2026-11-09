
import { Routes, Route, Navigate } from 'react-router-dom'

import { useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import Unauthorized from './pages/Unauthorized'

import Genre from './pages/Genre'
import Author from './pages/Author'

import './App.css'

function App() {
  const { isAuthenticated, role } = useAuth()

  return (
    <Routes>
      {/* Halaman Login */}
      <Route
        path="/login"
        element={
          isAuthenticated
            ? <Navigate to={role === 'admin' ? '/admin/dashboard' : '/home'} replace />
            : <Login />
        }
      />

      {/* Halaman Registrasi */}
      <Route
        path="/register"
        element={
          isAuthenticated
            ? <Navigate to={role === 'admin' ? '/admin/dashboard' : '/home'} replace />
            : <Register />
        }
      />

      {/* Halaman Profil untuk Admin dan User */}
      <Route element={<ProtectedRoute allowedRoles={['admin', 'user']} />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Halaman khusus User */}
      <Route element={<ProtectedRoute allowedRoles={['user']} />}>
        <Route path="/home" element={<Home />} />
      </Route>

      {/* Halaman khusus Admin */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/genre" element={<Genre />} />
        <Route path="/admin/author" element={<Author />} />
      </Route>

      {/* Halaman akses ditolak */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Halaman utama */}
      <Route
        path="/"
        element={
          <Navigate
            to={
              !isAuthenticated
                ? '/login'
                : role === 'admin'
                  ? '/admin/dashboard'
                  : '/home'
            }
            replace
          />
        }
      />

      {/* Halaman tidak ditemukan */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
