import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import BackgroundRotator from "../components/BackgroundRotator";
import { attireImages } from "../backgroundImages";

export default function Attire() {
  const [sportId, setSportId] = useState(1);
  const { data, loading, error } = useFetch(`/sports/${sportId}/attire`);
  const { data: sports } = useFetch("/sports");

  return (
    <div className="page-stack">
      <BackgroundRotator images={attireImages} />
      <section className="page-hero">
        <p className="section-kicker">Gear guide</p>
        <h1>Attire</h1>
        <p>Recommended gear by sport, laid out in a clean and focused view.</p>
      </section>

      {sports && (
        <section className="card">
          <label htmlFor="sport-select">Choose a sport</label>
          <select id="sport-select" value={sportId} onChange={(e) => setSportId(Number(e.target.value))}>
            {sports.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </section>
      )}

      <section className="card">
        {loading && <p>Loading attire guide...</p>}
        {error && <p className="error-text">{error}</p>}
        {data && data.length === 0 && <p>No attire guidance for this sport yet.</p>}
        {data && (
          <ul className="stack-list">
            {data.map((item) => (
              <li key={item.id} className="list-item">
                <span>{item.item_name}</span>
                <span className="mono">{item.mandatory ? "required" : "optional"}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
