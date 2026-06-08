import { BaseHttpService } from "./BaseHttpService";

class FavoriteService extends BaseHttpService {
  constructor() {
    super("/favorites");
  }

  list() {
    return this.get("/");
  }

  add(productId) {
    return this.post(`/${productId}`);
  }

  remove(productId) {
    return this.delete(`/${productId}`);
  }
}

export const favoriteService = new FavoriteService();

