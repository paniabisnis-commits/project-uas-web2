import { useState } from "react";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await apiClient.post("/login", { email, password });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("name", user.name);
      localStorage.setItem("email", user.email);
      localStorage.setItem("role", user.role);

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Email atau password salah");
    }
  };

  /* ================= REGISTER ================= */
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (regPassword !== confirmPassword) {
      setError("Konfirmasi password tidak sesuai");
      return;
    }

    try {
      await apiClient.post("/register", {
        name,
        email: regEmail,
        password: regPassword,
        password_confirmation: confirmPassword,
      });

      setSuccess("Registrasi berhasil. Silakan login.");
      setIsLogin(true);
    } catch {
      setError("Registrasi gagal. Email mungkin sudah digunakan.");
    }
  };


  return (
    <div style={pageWrapper}>
      <div style={card}>
        <h2 style={title}>{isLogin ? "Login" : "Registrasi Akun"}</h2>

        {error && <p style={errorText}>{error}</p>}
        {success && <p style={successText}>{success}</p>}

        {isLogin ? (
          <form onSubmit={handleLogin}>
            <div style={formGroup}>
              <label style={label}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={input}
              />
            </div>

            <div style={formGroup}>
              <label style={label}>Password</label>
              <div style={inputWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={passwordInput}
                />
                <span
                  style={eyeIcon}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? eyeOffSvg : eyeSvg}
                </span>
              </div>
            </div>

            <button style={btnPrimary}>Login</button>

            <p style={switchText}>
              Belum punya akun?{" "}
              <span style={switchLink} onClick={() => setIsLogin(false)}>
                Daftar di sini
              </span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div style={formGroup}>
              <label style={label}>Nama Lengkap</label>
              <div style={inputWrapper}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={input}
                />
              </div>
            </div>

            <div style={formGroup}>
              <label style={label}>Email</label>
              <div style={inputWrapper}>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                  style={input}
                />
              </div>
            </div>

            <div style={formGroup}>
              <label style={label}>Password</label>
              <div style={inputWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                  style={input}
                />
                <span
                  style={eyeIcon}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? eyeOffSvg : eyeSvg}
                </span>
              </div>
            </div>

            <div style={formGroup}>
              <label style={label}>Konfirmasi Password</label>
              <div style={inputWrapper}>
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  style={input}
                />
                <span
                  style={eyeIcon}
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? eyeOffSvg : eyeSvg}
                </span>
              </div>
            </div>
            <button style={btnPrimary}>Daftar</button>

            <p style={switchText}>
              Sudah punya akun?{" "}
              <span style={switchLink} onClick={() => setIsLogin(true)}>
                Login
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

/* ================= SVG ICON ================= */

const eyeSvg = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M1.5 12s4.5-7 10.5-7 10.5 7 10.5 7-4.5 7-10.5 7S1.5 12 1.5 12z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const eyeOffSvg = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 3l18 18"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M1.5 12s4.5-7 10.5-7c2.1 0 4 .6 5.6 1.5M22.5 12s-4.5 7-10.5 7c-2.1 0-4-.6-5.6-1.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

/* ================= STYLE ================= */

const pageWrapper = {
  minHeight: "80vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingTop: "calc(var(--navbar-height) + 40px)",
  paddingBottom: "40px",
  boxSizing: "border-box",
};

const card = {
  width: "100%",
  maxWidth: "420px",
  background: "#fff",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
};

const title = {
  textAlign: "center",
  marginBottom: "15px",
};

const formGroup = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginBottom: "14px",
};

const label = {
  fontSize: "14px",
  marginBottom: "6px",
  fontWeight: "500",
  textAlign: "left",
  display: "block",        // 🔑 penting
  width: "100%",           // ikut lebar card
  boxSizing: "border-box",
};

const input = {
  width: "100%",
  padding: "10px 44px 10px 12px", // kanan untuk icon
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  boxSizing: "border-box",
};

const inputWrapper = {
  position: "relative",
  width: "100%",
};

const passwordInput = {
  ...input,
  paddingRight: "44px",
};

const eyeIcon = {
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  color: "#6b7280",
};

const btnPrimary = {
  marginTop: "10px",
  padding: "12px",
  width: "100%",
  backgroundColor: "#0f766e",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

const switchText = {
  marginTop: "15px",
  fontSize: "14px",
  textAlign: "center",
};

const switchLink = {
  color: "#0f766e",
  cursor: "pointer",
  fontWeight: "bold",
};

const errorText = { color: "#b91c1c" };
const successText = { color: "#047857" };
