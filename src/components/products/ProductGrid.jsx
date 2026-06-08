import { ProductCard } from "./ProductCard";
import { EmptyState } from "../ui/EmptyState";

export function ProductGrid({
  products,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  emptyTitle = "No hay productos",
  emptyDescription = "Todavia no hay productos disponibles para esta vista."
}) {
  if (!products.length) {
    return (
      <EmptyState title={emptyTitle} description={emptyDescription} />
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={isFavorite(product.id)}
          onToggleFavorite={onToggleFavorite}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

