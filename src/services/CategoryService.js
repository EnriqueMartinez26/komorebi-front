import { BaseHttpService } from "./BaseHttpService";

class CategoryService extends BaseHttpService {
  constructor() {
    super("/categories");
  }

  list() {
    return this.get("/");
  }
}

export const categoryService = new CategoryService();

