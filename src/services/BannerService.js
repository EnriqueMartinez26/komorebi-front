import { BaseHttpService } from "./BaseHttpService";

class BannerService extends BaseHttpService {
  constructor() {
    super("/banners");
  }

  list(position = "") {
    const suffix = position ? `?position=${position}` : "";
    return this.get(`/${suffix}`);
  }
}

export const bannerService = new BannerService();

