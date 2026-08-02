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
    <header className="topbar">
      <div className="topbar-inner">
        <div className="topbar-brand">
          <div className="brand-mark">SW</div>
          <div>
            <p className="brand-name">Sports Watch</p>
            <span className="brand-subtitle">Performance OS</span>
          </div>
        </div>

        <nav className="topbar-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) => "topbar-link" + (isActive ? " active" : "")}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="topbar-actions">
          {token ? (
            <>
              {user && <span className="topbar-user">{user.username}</span>}
              <button className="topbar-logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <NavLink to="/login" className="topbar-link topbar-link-plain">Login</NavLink>
          )}
        </div>
      </div>
    </header>
  );
}
