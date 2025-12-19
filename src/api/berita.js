import { apiRequest } from "./apiClient";

export function getBerita() {
  return apiRequest("/berita");
}

export function getBeritaDetail(id) {
  return apiRequest(`/berita/${id}`);
}
