import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";
import BackgroundRotator from "../components/BackgroundRotator";
import { dashboardImages } from "../backgroundImages";
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();
  const { data, loading, error } = useFetch("/workout-logs?page=1&per_page=5");
  const streak = user?.streak;

  return (
    <div>
      <div className="dashboard-hero">
        <BackgroundRotator images={dashboardImages} />
        <div className="dashboard-hero-content">
          <h1>Welcome back{user ? `, ${user.username}` : ""}</h1>
          <p>Here's where your discipline stands today.</p>

          {streak && (
            <div className="streak-card">
              <div className="streak-block">
                <span className="streak-number mono">{streak.current_streak}</span>
                <span className="streak-label">current streak</span>
              </div>
              <div className="streak-divider" />
              <div className="streak-block">
                <span className="streak-number mono muted">{streak.longest_streak}</span>
                <span className="streak-label">longest streak</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <h2 style={{ marginTop: "2rem" }}>Recent Workout Logs</h2>
      <div className="card">
        {loading && <p>Loading...</p>}
        {error && <p className="error-text">{error}</p>}
        {data && data.items.length === 0 && <p>No workouts logged yet.</p>}
        {data && (
          <ul>
            {data.items.map((log) => (
              <li key={log.id} className="list-item">
                <span>{log.sport?.name}</span>
                <span className="mono muted">{log.duration_minutes} min · {log.log_date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
