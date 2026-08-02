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
    <div className="page-stack">
      <BackgroundRotator images={statsImages} />
      <section className="page-hero">
        <p className="section-kicker">Performance</p>
        <h1>Stats</h1>
        <p>Your training breakdown by sport, distilled into a clear overview.</p>
      </section>

      {loading && <div className="card loading-card"><p>Analyzing training patterns...</p></div>}
      {error && <p className="error-text">{error}</p>}
      {data && Object.keys(totals).length === 0 && <div className="card"><p>No workout data yet.</p></div>}
      {data && Object.keys(totals).length > 0 && (
        <section className="card">
          <ul className="stack-list">
            {Object.entries(totals).map(([sport, stat]) => (
              <li key={sport} className="list-item">
                <span>{sport}</span>
                <span className="mono">{stat.sessions} sessions · {stat.minutes} min</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
