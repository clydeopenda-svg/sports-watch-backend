import { useFetch } from "../hooks/useFetch";
import BackgroundRotator from "../components/BackgroundRotator";
import { sportsImages } from "../backgroundImages";

export default function Sports() {
  const { data, loading, error } = useFetch("/sports");

  return (
    <div>
      <BackgroundRotator images={sportsImages} />
      <h1>Sports</h1>
      <p>Every sport and its recommended exercises.</p>
      {loading && <p>Loading...</p>}
      {error && <p className="error-text">{error}</p>}
      {data && data.map((sport) => (
        <div className="card" key={sport.id}>
          <h2>{sport.name}</h2>
          <p>{sport.description}</p>
          <ul>
            {sport.sport_exercises.map((se) => (
              <li key={se.id} className="list-item">
                <span>{se.exercise.name}</span>
                <span className="mono muted">{se.recommended_sets} x {se.recommended_reps}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
