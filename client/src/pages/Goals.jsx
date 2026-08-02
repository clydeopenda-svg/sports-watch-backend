import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useFetch, API_BASE } from "../hooks/useFetch";
import BackgroundRotator from "../components/BackgroundRotator";
import { goalsImages } from "../backgroundImages";

export default function Goals() {
  const { token } = useAuth();
  const [form, setForm] = useState({ description: "", target_date: "" });
  const [refreshKey, setRefreshKey] = useState(0);
  const { data, loading, error } = useFetch(`/goals?r=${refreshKey}`);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API_BASE}/goals`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });
    setForm({ description: "", target_date: "" });
    setRefreshKey((k) => k + 1);
  };

  return (
    <div>
      <BackgroundRotator images={goalsImages} />
      <h1>Goals</h1>
      <p>Set targets and track progress.</p>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input name="description" placeholder="Goal description" value={form.description} onChange={handleChange} required />
            <input name="target_date" type="date" value={form.target_date} onChange={handleChange} required />
            <button type="submit">Add Goal</button>
          </div>
        </form>
      </div>

      <div className="card">
        {loading && <p>Loading...</p>}
        {error && <p className="error-text">{error}</p>}
        {data && data.length === 0 && <p>No goals yet.</p>}
        {data && (
          <ul>
            {data.map((goal) => (
              <li key={goal.id} className="list-item">
                <span>{goal.description}</span>
                <span className="mono muted">due {goal.target_date} {goal.achieved ? "✅" : ""}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
