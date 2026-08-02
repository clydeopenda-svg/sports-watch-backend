import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import BackgroundRotator from "../components/BackgroundRotator";
import { attireImages } from "../backgroundImages";

export default function Attire() {
  const [sportId, setSportId] = useState(1);
  const { data, loading, error } = useFetch(`/sports/${sportId}/attire`);
  const { data: sports } = useFetch("/sports");

  return (
    <div>
      <BackgroundRotator images={attireImages} />
      <h1>Attire Guide</h1>
      <p>Recommended gear by sport.</p>

      {sports && (
        <select value={sportId} onChange={(e) => setSportId(Number(e.target.value))} style={{ maxWidth: "220px" }}>
          {sports.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      )}

      <div className="card" style={{ marginTop: "1rem" }}>
        {loading && <p>Loading...</p>}
        {error && <p className="error-text">{error}</p>}
        {data && data.length === 0 && <p>No attire guidance for this sport yet.</p>}
        {data && (
          <ul>
            {data.map((item) => (
              <li key={item.id} className="list-item">
                <span>{item.item_name}</span>
                <span className="mono muted">{item.mandatory ? "required" : "optional"}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
