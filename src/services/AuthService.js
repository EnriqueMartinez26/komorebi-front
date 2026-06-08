import { BaseHttpService } from "./BaseHttpService";

class AuthService extends BaseHttpService {
  constructor() {
    super("/auth");
  }

  register(payload) {
    return this.post("/register", payload);
  }

  login(payload) {
    return this.post("/login", payload);
  }

  logout() {
    return this.post("/logout");
  }

  me() {
    return this.get("/me");
  }

  forgotPassword(payload) {
    return this.post("/forgot-password", payload);
  }

  resetPassword(payload) {
    return this.post("/reset-password", payload);
  }
}

export const authService = new AuthService();

