import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL, // базовий URL
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Перехоплювач, щоб автоматично додавати токен
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
