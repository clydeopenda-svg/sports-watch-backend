import { useFetch } from "../hooks/useFetch";
import BackgroundRotator from "../components/BackgroundRotator";
import { statsImages } from "../backgroundImages";

export default function Stats() {
  const { data, loading, error } = useFetch("/workout-logs?page=1&per_page=100");

  const totals = {};
  if (data) {
    data.items.forEach((log) => {
      const name = log.sport?.name || "Unknown";
      if (!totals[name]) totals[name] = { sessions: 0, minutes: 0 };
      totals[name].sessions += 1;
      totals[name].minutes += log.duration_minutes;
    });
  }

  return (
    <div>
      <BackgroundRotator images={statsImages} />
      <h1>Stats</h1>
      <p>Your training breakdown by sport.</p>

      {loading && <p>Loading...</p>}
      {error && <p className="error-text">{error}</p>}
      {data && Object.keys(totals).length === 0 && <p>No workout data yet.</p>}
      {data && Object.keys(totals).length > 0 && (
        <div className="card">
          {Object.entries(totals).map(([sport, stat]) => (
            <div key={sport} className="list-item">
              <span>{sport}</span>
              <span className="mono muted">{stat.sessions} sessions · {stat.minutes} min</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
