import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useFetch, API_BASE } from "../hooks/useFetch";
import BackgroundRotator from "../components/BackgroundRotator";
import { workoutLogImages } from "../backgroundImages";

export default function WorkoutLogs() {
  const { token } = useAuth();
  const [page, setPage] = useState(1);
  const [form, setForm] = useState({ sport_id: "", log_date: "", duration_minutes: "" });
  const [refreshKey, setRefreshKey] = useState(0);
  const { data, loading, error } = useFetch(`/workout-logs?page=${page}&per_page=5&r=${refreshKey}`);
  const { data: sports } = useFetch("/sports");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API_BASE}/workout-logs`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        sport_id: Number(form.sport_id),
        log_date: form.log_date,
        duration_minutes: Number(form.duration_minutes),
      }),
    });
    setForm({ sport_id: "", log_date: "", duration_minutes: "" });
    setRefreshKey((k) => k + 1);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_BASE}/workout-logs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setRefreshKey((k) => k + 1);
  };

  return (
    <div>
      <BackgroundRotator images={workoutLogImages} />
      <h1>Workout Logs</h1>
      <p>Log a session and track your history.</p>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <select name="sport_id" value={form.sport_id} onChange={handleChange} required>
              <option value="" disabled>Select sport</option>
              {sports && sports.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <input name="log_date" type="date" value={form.log_date} onChange={handleChange} required />
            <input name="duration_minutes" type="number" min="1" placeholder="Duration (min)" value={form.duration_minutes} onChange={handleChange} required />
            <button type="submit">Add Log</button>
          </div>
        </form>
      </div>

      <div className="card">
        {loading && <p>Loading...</p>}
        {error && <p className="error-text">{error}</p>}
        {data && data.items.length === 0 && <p>No logs yet.</p>}
        {data && (
          <>
            <ul>
              {data.items.map((log) => (
                <li key={log.id} className="list-item">
                  <span>{log.sport?.name}</span>
                  <span className="mono muted">{log.duration_minutes} min · {log.log_date}</span>
                  <button className="danger" onClick={() => handleDelete(log.id)}>Delete</button>
                </li>
              ))}
            </ul>
            <div className="pagination">
              <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
              <span>Page {data.page} of {data.total_pages}</span>
              <button disabled={page >= data.total_pages} onClick={() => setPage((p) => p + 1)}>Next</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
