import { useRef } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/currency";
import { Icon } from "../ui/Icon";

export function FeaturedSlider({ items }) {
  const trackRef = useRef(null);

  const scrollByDirection = (direction) => {
    const firstCard = trackRef.current?.querySelector(".featured-card");
    const gap = 24;
    const scrollAmount = firstCard
      ? firstCard.getBoundingClientRect().width + gap
      : 320;

    trackRef.current?.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth"
    });
  };

  if (!items.length) {
    return null;
  }

  return (
    <section className="featured-section">
      <div className="section-heading">
        <div>
          <span className="section-eyebrow">Slider de destacados</span>
          <h2>Productos destacados</h2>
        </div>
        <div className="slider-controls">
          <button type="button" onClick={() => scrollByDirection(-1)}>
            <Icon name="arrowLeft" />
          </button>
          <button type="button" onClick={() => scrollByDirection(1)}>
            <Icon name="arrowRight" />
          </button>
        </div>
      </div>
      <div ref={trackRef} className="featured-track">
        {items.map((product) => (
          <article key={product.id} className="featured-card">
            <Link to={`/producto/${product.slug}`} className="featured-card-media">
              <img src={product.images[0]} alt={product.name} loading="lazy" />
            </Link>
            <div className="featured-card-body">
              <span className="product-category">
                {product.categoryName || "Seleccion destacada"}
              </span>
              <h3>{product.name}</h3>
              <p className="featured-card-description">{product.description}</p>
              <strong className="featured-card-price">
                {formatCurrency(product.discountPrice || product.price)}
              </strong>
              <Link
                to={`/producto/${product.slug}`}
                className="secondary-button featured-card-cta"
              >
                Ver producto
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
