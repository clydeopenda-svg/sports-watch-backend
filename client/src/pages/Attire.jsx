import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

export default function Attire() {
  const [sportId, setSportId] = useState(1);
  const { data, loading, error } = useFetch(`/sports/${sportId}/attire`);
  const { data: sports } = useFetch("/sports");

  return (
    <div>
      <h1>Attire Guide</h1>
      <p>Recommended gear by sport.</p>

      {sports && (
        <select value={sportId} onChange={(e) => setSportId(Number(e.target.value))}>
          {sports.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      )}

      <div style={{ marginTop: "1rem" }}>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {data && data.length === 0 && <p>No attire guidance for this sport yet.</p>}
        {data && (
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                {item.item_name} {item.mandatory ? "(required)" : "(optional)"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
