import axios from 'axios'

// 统一的后端请求实例。
const http = axios.create({
  // 与后端 main.py 中的 Uvicorn 端口保持一致。
  baseURL: 'http://127.0.0.1:8001',
  timeout: 10000,
})

// 每次请求前自动携带 JWT。
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default http
