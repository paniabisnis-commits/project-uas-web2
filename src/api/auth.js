import { apiRequest } from "./apiClient";

export function loginUser(payload) {
  return apiRequest("/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
