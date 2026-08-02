import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { buildApiUrl, parseJsonResponse } from "../lib/api";

const API_URL = import.meta.env.VITE_API_URL || "https://sports-watch-backend.onrender.com";

export function useFetch(path, options = {}) {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!path) return;
    setLoading(true);
    setError(null);

    const controller = new AbortController();

    fetch(buildApiUrl(path, API_URL), {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    })
      .then(async (res) => {
        const payload = await parseJsonResponse(res);
        if (!res.ok) {
          const message = typeof payload === "object" && payload && payload.error
            ? payload.error
            : typeof payload === "string" && payload.trim()
              ? payload
              : "Request failed";
          throw new Error(message);
        }
        setData(payload);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message || "Request failed");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [path, token]);

  return { data, loading, error };
}

export const API_BASE = API_URL;
