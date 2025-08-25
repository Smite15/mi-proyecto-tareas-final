import { useState, useEffect } from "react";
import Login from "./pages/Login";
import TaskList from "./pages/TaskList";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState(""); // Id del usuario logueado

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    const savedUserId = localStorage.getItem("userId");
    if (savedToken) {
      setToken(savedToken);
      setRole(savedRole || "user");
      setUserId(savedUserId || "");
    }
  }, []);

  const handleLogin = (token, role, id) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", id);
    setToken(token);
    setRole(role);
    setUserId(id);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setToken("");
    setRole("");
    setUserId("");
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  if (role === "admin") {
    return <AdminDashboard token={token} onLogout={handleLogout} />;
  }

  // Usuario normal
  return <TaskList token={token} userId={userId} role={role} onLogout={handleLogout} />;
}

export default App;