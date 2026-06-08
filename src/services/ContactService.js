import { BaseHttpService } from "./BaseHttpService";

class ContactService extends BaseHttpService {
  constructor() {
    super("/contact");
  }

  send(payload) {
    return this.post("/", payload);
  }
}

export const contactService = new ContactService();

