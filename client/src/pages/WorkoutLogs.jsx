import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useFetch, API_BASE } from "../hooks/useFetch";

export default function WorkoutLogs() {
  const { token } = useAuth();
  const [page, setPage] = useState(1);
  const [form, setForm] = useState({ sport_id: "", log_date: "", duration_minutes: "" });
  const [refreshKey, setRefreshKey] = useState(0);

  const { data, loading, error } = useFetch(`/workout-logs?page=${page}&per_page=5&r=${refreshKey}`);

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
      <h1>Workout Logs</h1>

      <form onSubmit={handleSubmit}>
        <input name="sport_id" placeholder="Sport ID" value={form.sport_id} onChange={handleChange} required />
        <input name="log_date" type="date" value={form.log_date} onChange={handleChange} required />
        <input name="duration_minutes" placeholder="Duration (min)" value={form.duration_minutes} onChange={handleChange} required />
        <button type="submit">Add Log</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <>
          <ul>
            {data.items.map((log) => (
              <li key={log.id}>
                {log.sport?.name} — {log.duration_minutes} min on {log.log_date}
                <button onClick={() => handleDelete(log.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <div>
            <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
            <span> Page {data.page} of {data.total_pages} </span>
            <button disabled={page >= data.total_pages} onClick={() => setPage((p) => p + 1)}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}
