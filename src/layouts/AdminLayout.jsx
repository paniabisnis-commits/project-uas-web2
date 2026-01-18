import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";

export default function AdminLayout() {
  return (
    <div style={wrapper}>
      <Sidebar />
      <main style={content}>
        <Outlet />
      </main>
    </div>
  );
}

const wrapper = {
  display: "flex",
  minHeight: "100vh",
  background: "#f0fdf4",
};

const content = {
  flex: 1,
  padding: "30px",
};
