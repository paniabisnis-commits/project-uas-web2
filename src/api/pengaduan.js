import { apiRequest } from "./apiClient";

export function kirimPengaduan(data) {
  return apiRequest("/pengaduan", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
