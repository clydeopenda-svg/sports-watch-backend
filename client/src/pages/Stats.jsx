import { useFetch } from "../hooks/useFetch";

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
      <h1>Stats</h1>
      <p>Your training breakdown by sport.</p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && Object.keys(totals).length === 0 && <p>No workout data yet.</p>}
      {data && (
        <table>
          <thead>
            <tr><th>Sport</th><th>Sessions</th><th>Total Minutes</th></tr>
          </thead>
          <tbody>
            {Object.entries(totals).map(([sport, stat]) => (
              <tr key={sport}>
                <td>{sport}</td>
                <td>{stat.sessions}</td>
                <td>{stat.minutes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
