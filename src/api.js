import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:5000/api' })

// Attach JWT if present
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('kk_token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

export default api
