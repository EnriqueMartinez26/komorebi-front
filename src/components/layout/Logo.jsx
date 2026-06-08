import { Link } from "react-router-dom";

const logoVariants = {
  full: {
    src: "/assets/logos/komorebi-full.png",
    alt: "Komorebi"
  },
  horizontal: {
    src: "/assets/logos/komorebi-horizontal.png",
    alt: "Komorebi"
  },
  mark: {
    src: "/assets/logos/komorebi-mark.png",
    alt: "Komorebi"
  }
};

export function Logo({ variant = "horizontal", to = "/", className = "" }) {
  const logo = logoVariants[variant];

  return (
    <Link className={`site-logo-link ${className}`.trim()} to={to} aria-label="Komorebi">
      <img
        className={`site-logo site-logo--${variant}`}
        src={logo.src}
        alt={logo.alt}
        loading="eager"
      />
    </Link>
  );
}
