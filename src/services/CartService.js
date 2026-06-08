import { BaseHttpService } from "./BaseHttpService";

class CartService extends BaseHttpService {
  constructor() {
    super("/cart");
  }

  getCart() {
    return this.get("/");
  }

  addItem(payload) {
    return this.post("/items", payload);
  }

  updateItem(itemId, payload) {
    return this.patch(`/items/${itemId}`, payload);
  }

  removeItem(itemId) {
    return this.delete(`/items/${itemId}`);
  }

  clear() {
    return this.delete("/");
  }
}

export const cartService = new CartService();

