export const DEFAULT_SEARCH_TERM =
  import.meta.env.VITE_DEFAULT_SEARCH_TERM || "destacados";

export const API_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined"
    ? `http://${window.location.hostname}:4000/api`
    : "http://127.0.0.1:4000/api");
