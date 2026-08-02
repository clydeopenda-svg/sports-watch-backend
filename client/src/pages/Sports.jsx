import { useFetch } from "../hooks/useFetch";
import BackgroundRotator from "../components/BackgroundRotator";
import { sportsImages } from "../backgroundImages";

export default function Sports() {
  const { data, loading, error } = useFetch("/sports");

  return (
    <div className="page-stack">
      <BackgroundRotator images={sportsImages} />
      <section className="page-hero">
        <p className="section-kicker">Training library</p>
        <h1>Sports</h1>
        <p>Every sport and its recommended exercises, organized for fast review.</p>
      </section>

      {loading && <div className="card loading-card"><p>Loading sports library...</p></div>}
      {error && <p className="error-text">{error}</p>}
      {data && data.map((sport) => (
        <section className="card" key={sport.id}>
          <div className="section-heading compact">
            <div>
              <p className="section-kicker">Program</p>
              <h2>{sport.name}</h2>
            </div>
          </div>
          <p>{sport.description}</p>
          <ul className="stack-list">
            {sport.sport_exercises.map((se) => (
              <li key={se.id} className="list-item">
                <span>{se.exercise.name}</span>
                <span className="mono">{se.recommended_sets} x {se.recommended_reps}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
