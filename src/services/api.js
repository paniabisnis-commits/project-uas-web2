import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true, // 🔑 WAJIB untuk Sanctum
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getBeritaDetail = (slug) =>
  fetch(`${API_URL}/berita/${slug}`).then(res => res.json());

export default apiClient;
