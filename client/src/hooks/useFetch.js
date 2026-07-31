import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://127.0.0.1:5000";

export function useFetch(path, options = {}) {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!path) return;
    setLoading(true);
    setError(null);

    fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Request failed");
        setData(json);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [path, token]);

  return { data, loading, error };
}

export const API_BASE = API_URL;
