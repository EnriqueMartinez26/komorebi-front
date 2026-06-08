import { Link } from "react-router-dom";

export function AdBanner({ banner, className = "" }) {
  if (!banner) {
    return null;
  }

  const isInternal = banner.targetUrl.startsWith("/");
  const BannerWrapper = isInternal ? Link : "a";
  const extraProps = isInternal
    ? { to: banner.targetUrl }
    : { href: banner.targetUrl, target: "_blank", rel: "noreferrer" };

  return (
    <BannerWrapper className={`ad-banner ${className}`.trim()} {...extraProps}>
      <img src={banner.imageUrl} alt={banner.title} loading="lazy" />
      <div className="ad-banner-copy">
        <strong>{banner.title}</strong>
        <span>Ver mas</span>
      </div>
    </BannerWrapper>
  );
}
