export function normalizeApiBase(apiUrl = "") {
  const rawValue = String(apiUrl || "http://127.0.0.1:5000").trim();

  if (!rawValue) {
    return "http://127.0.0.1:5000";
  }

  const withoutTrailingSlash = rawValue.replace(/\/+$/, "");

  if (/^https?:\/\/[^/]+/.test(withoutTrailingSlash)) {
    return withoutTrailingSlash;
  }

  if (/^https?:\/[^/]+/.test(withoutTrailingSlash)) {
    return withoutTrailingSlash.replace(/^([a-z]+):\/([^/])/, "$1://$2");
  }

  return withoutTrailingSlash;
}

export function buildApiUrl(path, apiUrl = "") {
  if (!path) {
    return normalizeApiBase(apiUrl);
  }

  const base = normalizeApiBase(apiUrl);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

export async function parseJsonResponse(response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
