import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem", borderBottom: "1px solid #ddd" }}>
      <Link to="/">Dashboard</Link>
      <Link to="/workout-logs">Workout Logs</Link>
      <Link to="/goals">Goals</Link>
      <Link to="/sports">Sports</Link>
      <div style={{ marginLeft: "auto" }}>
        {token ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
