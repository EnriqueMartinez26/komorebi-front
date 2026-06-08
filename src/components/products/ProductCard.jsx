import { useState } from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/currency";
import { Icon } from "../ui/Icon";
import { ProtectedAction } from "../auth/ProtectedAction";

export function ProductCard({ product, isFavorite, onToggleFavorite, onAddToCart }) {
  const [cartChecked, setCartChecked] = useState(false);
  const [favoriteChecked, setFavoriteChecked] = useState(false);

  const pulseState = (setter) => {
    setter(true);
    window.setTimeout(() => setter(false), 1400);
  };

  return (
    <article className="product-card">
      <Link to={`/producto/${product.slug}`} className="product-card-media">
        <img src={product.images[0]} alt={product.name} loading="lazy" />
      </Link>
      <div className="product-card-body">
        <div className="product-card-content">
          <span className="product-category">{product.categoryName || "Catalogo"}</span>
          <Link to={`/producto/${product.slug}`} className="product-title">
            {product.name}
          </Link>
        </div>
        <div className="product-card-footer">
          <p className="product-price">
            {product.discountPrice ? (
              <>
                <span className="price-discounted">
                  {formatCurrency(product.discountPrice)}
                </span>
                <span className="price-original">{formatCurrency(product.price)}</span>
              </>
            ) : (
              formatCurrency(product.price)
            )}
          </p>
          <div className="product-actions">
            <ProtectedAction
              onAction={async () => {
                await onAddToCart(product.id);
                pulseState(setCartChecked);
              }}
            >
              {({ execute }) => (
                <button type="button" onClick={execute}>
                  {cartChecked ? <Icon name="check" /> : null}
                  Comprar
                </button>
              )}
            </ProtectedAction>

            <ProtectedAction
              onAction={async () => {
                await onToggleFavorite(product.id);
                pulseState(setFavoriteChecked);
              }}
            >
              {({ execute }) => (
                <button
                  type="button"
                  className={isFavorite ? "is-favorite" : ""}
                  onClick={execute}
                  aria-pressed={isFavorite}
                >
                  {favoriteChecked ? <Icon name="check" /> : <Icon name="heart" />}
                  Favorito
                </button>
              )}
            </ProtectedAction>
          </div>
        </div>
      </div>
    </article>
  );
}
