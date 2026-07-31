import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useFetch, API_BASE } from "../hooks/useFetch";

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
      <h1>Goals</h1>

      <form onSubmit={handleSubmit}>
        <input name="description" placeholder="Goal description" value={form.description} onChange={handleChange} required />
        <input name="target_date" type="date" value={form.target_date} onChange={handleChange} required />
        <button type="submit">Add Goal</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <ul>
          {data.map((goal) => (
            <li key={goal.id}>
              {goal.description} — due {goal.target_date} {goal.achieved ? "✅" : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
