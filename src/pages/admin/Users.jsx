import { useEffect, useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
  apiClient.get("/admin/users")
    .then(res => setUsers(res.data.data))
    .catch(err => console.error(err));
}, []);

  return (
    <div style={wrapper}>
      <h2 style={title}>Manajemen Pengguna</h2>
      <p style={subtitle}>
        Daftar seluruh akun yang pernah login ke sistem
      </p>

      <div style={tableWrapper}>
        <table style={table}>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span style={badge(user.role)}>
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p style={empty}>Belum ada data pengguna</p>
        )}
      </div>
    </div>
  );
}

/* ================= STYLE ================= */

const wrapper = {
  padding: "30px",
};

const title = {
  fontSize: "22px",
  fontWeight: "700",
  color: "#064e3b",
};

const subtitle = {
  marginTop: "6px",
  color: "#6b7280",
  fontSize: "14px",
};

const tableWrapper = {
  marginTop: "20px",
  background: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  padding: "20px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const badge = (role) => ({
  padding: "5px 12px",
  borderRadius: "999px",
  fontSize: "12px",
  fontWeight: "600",
  background: role === "admin" ? "#bbf7d0" : "#e5e7eb",
  color: role === "admin" ? "#065f46" : "#374151",
});

const empty = {
  marginTop: "20px",
  textAlign: "center",
  color: "#9ca3af",
};
