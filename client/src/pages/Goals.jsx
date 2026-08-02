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
    <div className="page-stack">
      <BackgroundRotator images={goalsImages} />
      <section className="page-hero">
        <p className="section-kicker">Planning</p>
        <h1>Goals</h1>
        <p>Set targets and track progress with a calm, focused workspace.</p>
      </section>

      <section className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input name="description" placeholder="Goal description" value={form.description} onChange={handleChange} required />
            <input name="target_date" type="date" value={form.target_date} onChange={handleChange} required />
            <button type="submit">Add Goal</button>
          </div>
        </form>
      </section>

      <section className="card">
        {loading && <p>Loading goals...</p>}
        {error && <p className="error-text">{error}</p>}
        {data && data.length === 0 && <p>No goals yet.</p>}
        {data && (
          <ul className="stack-list">
            {data.map((goal) => (
              <li key={goal.id} className="list-item">
                <span>{goal.description}</span>
                <span className="mono">due {goal.target_date} {goal.achieved ? "✅" : ""}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
