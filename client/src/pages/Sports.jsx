import { useFetch } from "../hooks/useFetch";

export default function Sports() {
  const { data, loading, error } = useFetch("/sports");

  return (
    <div>
      <h1>Sports</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <ul>
          {data.map((sport) => (
            <li key={sport.id}>
              <strong>{sport.name}</strong> — {sport.description}
              <ul>
                {sport.sport_exercises.map((se) => (
                  <li key={se.id}>
                    {se.exercise.name}: {se.recommended_sets} sets x {se.recommended_reps} reps
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
