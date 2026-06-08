import { BaseHttpService } from "./BaseHttpService";

class ProductService extends BaseHttpService {
  constructor() {
    super("/products");
  }

  list({ page = 1, limit = 15, categoryId = "" } = {}) {
    const searchParams = new URLSearchParams({
      page: String(page),
      limit: String(limit)
    });

    if (categoryId) {
      searchParams.set("categoryId", categoryId);
    }

    return this.get(`/?${searchParams.toString()}`);
  }

  featured(limit = 8) {
    return this.get(`/featured?limit=${limit}`);
  }

  search({ term, page = 1, limit = 15 }) {
    const searchParams = new URLSearchParams({
      q: term || "",
      page: String(page),
      limit: String(limit)
    });

    return this.get(`/search?${searchParams.toString()}`);
  }

  getBySlug(slug) {
    return this.get(`/${slug}`);
  }
}

export const productService = new ProductService();

