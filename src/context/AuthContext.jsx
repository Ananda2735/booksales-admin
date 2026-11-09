
import { createContext, useContext, useState } from 'react'
import api from '../api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem('admin_token') || ''
  )

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('auth_user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  // Fungsi login
  const login = async (email, password) => {
    const response = await api.post('/login', {
      email,
      password,
    })

    const { token, user } = response.data.data

    localStorage.setItem('admin_token', token)
    localStorage.setItem('auth_user', JSON.stringify(user))

    api.defaults.headers.common.Authorization = `Bearer ${token}`

    setToken(token)
    setUser(user)

    return user
  }

  // Fungsi logout
  const logout = async () => {
    try {
      await api.post('/logout')
    } catch (error) {
      console.error('Logout API:', error)
    }

    localStorage.removeItem('admin_token')
    localStorage.removeItem('auth_user')

    delete api.defaults.headers.common.Authorization

    setToken('')
    setUser(null)
  }

  const role = user?.role === 'customer' ? 'user' : user?.role

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        role,
        login,
        logout,
        isAuthenticated: Boolean(token && user),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
