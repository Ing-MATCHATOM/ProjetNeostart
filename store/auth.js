// frontend/store/auth.js - Version sans Pinia
export const useAuthStore = () => {
  const state = reactive({
    user: null,
    token: null,
    isAuthenticated: false
  })

  const setAuth = (user, token) => {
    state.user = user
    state.token = token
    state.isAuthenticated = true
    localStorage.setItem('auth_token', token)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const logout = () => {
    state.user = null
    state.token = null
    state.isAuthenticated = false
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
  }

  const loadFromStorage = () => {
    const token = localStorage.getItem('auth_token')
    const user = localStorage.getItem('user')
    if (token && user) {
      state.token = token
      state.user = JSON.parse(user)
      state.isAuthenticated = true
    }
  }

  return {
    state,
    setAuth,
    logout,
    loadFromStorage
  }
}