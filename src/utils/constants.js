export const DEFAULT_SEARCH_TERM =
  import.meta.env.VITE_DEFAULT_SEARCH_TERM || "destacados";

const LOCAL_API_URL =
  typeof window !== "undefined"
    ? `http://${window.location.hostname}:4000/api`
    : "http://127.0.0.1:4000/api";

export const API_URL = import.meta.env.VITE_API_URL || LOCAL_API_URL;

export const UNAUTHORIZED_STATUS = 401;

export const AUTH_TOKEN_STORAGE_KEY = "auth_token";

export const PRODUCT_IMAGE_FALLBACK = "/images/placeholder.svg";
