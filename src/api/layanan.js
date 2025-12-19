import { apiRequest } from "./apiClient";

export function getLayanan() {
  return apiRequest("/layanan");
}
