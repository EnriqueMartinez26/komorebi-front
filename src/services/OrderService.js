import { BaseHttpService } from "./BaseHttpService";

class OrderService extends BaseHttpService {
  constructor() {
    super("/orders");
  }

  create(payload) {
    return this.post("/", payload);
  }

  list() {
    return this.get("/");
  }
}

export const orderService = new OrderService();

