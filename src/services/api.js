import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://backendpemerintah.24tia6.com",
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
