import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
/* 🔑 AUTO KIRIM TOKEN */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log("TOKEN DIKIRIM:", token);

    if (token && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
// 🔑 Bearer Token (BENAR untuk API login)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;
