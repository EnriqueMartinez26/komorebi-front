export class SocialMedia {
  constructor(name, url, iconName) {
    this.name = name;
    this.url = url;
    this.iconName = iconName;
  }
}

export class SocialMediaManager {
  constructor() {
    this.channels = [
      new SocialMedia("Instagram", "https://instagram.com", "instagram"),
      new SocialMedia("Facebook", "https://facebook.com", "facebook"),
      new SocialMedia("Pinterest", "https://pinterest.com", "pinterest"),
      new SocialMedia("X", "https://x.com", "x")
    ];
  }

  getChannels() {
    return this.channels;
  }
}

export const socialMediaManager = new SocialMediaManager();
