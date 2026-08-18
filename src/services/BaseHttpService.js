import { API_URL, AUTH_TOKEN_STORAGE_KEY, UNAUTHORIZED_STATUS } from "../utils/constants";

let sessionExpiredHandler = null;

export function setSessionExpiredHandler(handler) {
  sessionExpiredHandler = handler;
}

export class BaseHttpService {
  constructor(resource = "") {
    this.baseUrl = API_URL;
    this.resource = resource;
    this.notifiesSessionExpired = true;
  }

  async request(path = "", options = {}) {
    const token =
      typeof window !== "undefined"
        ? window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
        : null;

    let response;

    try {
      response = await fetch(`${this.baseUrl}${this.resource}${path}`, {
        credentials: "include",
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(options.headers || {})
        }
      });
    } catch (_error) {
      throw new Error("No se pudo conectar con el servidor.");
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (
        response.status === UNAUTHORIZED_STATUS &&
        this.notifiesSessionExpired &&
        sessionExpiredHandler
      ) {
        sessionExpiredHandler();
      }

      const error = new Error(data.message || "Ocurrio un error inesperado.");
      error.status = response.status;
      error.details = data.details || null;
      throw error;
    }

    return data;
  }

  get(path = "") {
    return this.request(path);
  }

  post(path = "", payload = {}) {
    return this.request(path, {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }

  patch(path = "", payload = {}) {
    return this.request(path, {
      method: "PATCH",
      body: JSON.stringify(payload)
    });
  }

  delete(path = "") {
    return this.request(path, {
      method: "DELETE"
    });
  }
}
