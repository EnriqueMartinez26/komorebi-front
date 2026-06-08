import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productService } from "../../services/ProductService";
import { usePageMeta } from "../../hooks/usePageMeta";
import { Loader } from "../../components/ui/Loader";
import { formatCurrency } from "../../utils/currency";
import { ProtectedAction } from "../../components/auth/ProtectedAction";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { Icon } from "../../components/ui/Icon";

export function ProductPage() {
  const { slug } = useParams();
  const { addItem } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  usePageMeta("Producto", "Detalle de producto.");

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await productService.getBySlug(slug);
        setProduct(response.product);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  if (isLoading) {
    return <Loader label="Cargando producto..." />;
  }

  if (error || !product) {
    return <div className="container page-section form-error">{error || "Producto no disponible."}</div>;
  }

  return (
    <section className="container page-section">
      <div className="product-detail">
        <div className="product-detail-gallery">
          <img src={product.images[0]} alt={product.name} />
        </div>
        <div className="product-detail-copy">
          <span className="section-eyebrow">{product.categoryName}</span>
          <h1>{product.name}</h1>
          <p className="product-price-large">
            {formatCurrency(product.discountPrice || product.price)}
          </p>
          <p>{product.description}</p>
          <ul className="detail-meta">
            <li>Stock disponible: {product.stock}</li>
            <li>Medios de pago: tarjeta, transferencia y link futuro</li>
            <li>Envio: estandar y express</li>
            <li>Cambios: hasta 30 dias desde la compra</li>
          </ul>
          <div className="product-actions large-actions">
            <ProtectedAction onAction={() => addItem(product.id, 1)}>
              {({ execute }) => (
                <button type="button" onClick={execute}>
                  Comprar ahora
                </button>
              )}
            </ProtectedAction>
            <ProtectedAction
              onAction={() =>
                isFavorite(product.id)
                  ? removeFavorite(product.id)
                  : addFavorite(product.id)
              }
            >
              {({ execute }) => (
                <button type="button" className="secondary-button" onClick={execute}>
                  <Icon name="heart" />
                  {isFavorite(product.id) ? "Quitar favorito" : "Agregar favorito"}
                </button>
              )}
            </ProtectedAction>
          </div>
        </div>
      </div>
    </section>
  );
}

