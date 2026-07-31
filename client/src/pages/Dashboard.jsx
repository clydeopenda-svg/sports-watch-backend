import { useAuth } from "../context/AuthContext";
import { useFetch } from "../hooks/useFetch";

export default function Dashboard() {
  const { user } = useAuth();
  const { data, loading, error } = useFetch("/workout-logs?page=1&per_page=5");

  return (
    <div>
      <h1>Dashboard</h1>
      {user && <p>Welcome, {user.username}</p>}

      <h2>Recent Workout Logs</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <ul>
          {data.items.map((log) => (
            <li key={log.id}>
              {log.sport?.name} — {log.duration_minutes} min on {log.log_date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
