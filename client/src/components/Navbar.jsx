import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/workout-logs", label: "Workout Logs" },
  { to: "/goals", label: "Goals" },
  { to: "/sports", label: "Sports" },
  { to: "/attire", label: "Attire" },
  { to: "/stats", label: "Stats" },
];

export default function Navbar() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-brand">Sports Watch</div>
      <div className="sidebar-links">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
      <div className="sidebar-footer">
        {token ? (
          <>
            {user && <span className="sidebar-user">{user.username}</span>}
            <button className="danger" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <NavLink to="/login" className="sidebar-link">Login</NavLink>
        )}
      </div>
    </nav>
  );
}
