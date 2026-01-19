import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://backendpemerintah.24tia6.com/api",
  headers: {
    Accept: "application/json",
    // JANGAN set Content-Type di sini
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
