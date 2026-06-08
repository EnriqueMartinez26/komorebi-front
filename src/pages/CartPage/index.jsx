import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePageMeta } from "../../hooks/usePageMeta";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/currency";
import { EmptyState } from "../../components/ui/EmptyState";
import { orderService } from "../../services/OrderService";
import { useUI } from "../../context/UIContext";
import { paymentMethodManager } from "../../utils/payments";

export function CartPage() {
  usePageMeta("Carrito", "Resumen de compra del usuario.");

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cart, updateItem, removeItem, clearCart, refreshCart } = useCart();
  const { showToast, openLogin } = useUI();
  const [checkoutForm, setCheckoutForm] = useState({
    shippingMethod: "standard",
    shippingAddress: "",
    paymentMethod: "card",
    cardHolder: "",
    cardNumber: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async (event) => {
    event.preventDefault();

    if (!isAuthenticated) {
      openLogin();
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await orderService.create({
        shippingMethod: checkoutForm.shippingMethod,
        shippingAddress: checkoutForm.shippingAddress
      });
      await refreshCart();
      showToast("¡Orden creada! La integración de pago queda lista para la siguiente etapa.", "success");
      navigate("/");
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!cart.items.length) {
    return (
      <section className="container page-section">
        <EmptyState
          title="Carrito vacío"
          description="Todavía no agregaste productos al carrito."
        />
      </section>
    );
  }

  return (
    <section className="container page-section cart-layout">
      <div className="cart-list">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">Carrito</span>
            <h1>Resumen de productos</h1>
          </div>
          <button type="button" className="link-button" onClick={clearCart}>
            Vaciar carrito
          </button>
        </div>

        {cart.items.map((item) => (
          <article key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div>
              <h3>{item.name}</h3>
              <p>Precio unitario: {formatCurrency(item.price)}</p>
              <p>Subtotal: {formatCurrency(item.subtotal)}</p>
            </div>
            <label className="quantity-control">
              Cantidad
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(event) =>
                  updateItem(item.id, Number(event.target.value))
                }
              />
            </label>
            <button type="button" className="link-button" onClick={() => removeItem(item.id)}>
              Eliminar
            </button>
          </article>
        ))}
      </div>

      <aside className="checkout-card">
        <h2>Finalizar compra</h2>
        <p>Total general: {formatCurrency(cart.total)}</p>
        <form className="auth-form" onSubmit={handleCheckout}>
          <label>
            Método de envío
            <select
              value={checkoutForm.shippingMethod}
              onChange={(event) =>
                setCheckoutForm((current) => ({
                  ...current,
                  shippingMethod: event.target.value
                }))
              }
            >
              <option value="standard">Estándar</option>
              <option value="express">Express</option>
              <option value="mercadolibre">MercadoLibre</option>
            </select>
          </label>
          <label>
            Dirección de envío
            <textarea
              value={checkoutForm.shippingAddress}
              onChange={(event) =>
                setCheckoutForm((current) => ({
                  ...current,
                  shippingAddress: event.target.value
                }))
              }
              required
            />
          </label>
          <label>
            Medio de Pago
            <select
              value={checkoutForm.paymentMethod}
              onChange={(event) =>
                setCheckoutForm((current) => ({
                  ...current,
                  paymentMethod: event.target.value
                }))
              }
            >
              {paymentMethodManager.getMethods().map((method) => (
                <option key={method.id} value={method.id}>
                  {method.label}
                </option>
              ))}
            </select>
          </label>

          {paymentMethodManager.getMethodById(checkoutForm.paymentMethod)?.requiresCardFields ? (
            <>
              <label>
                Titular de la tarjeta
                <input
                  type="text"
                  value={checkoutForm.cardHolder}
                  onChange={(event) =>
                    setCheckoutForm((current) => ({
                      ...current,
                      cardHolder: event.target.value
                    }))
                  }
                  required
                />
              </label>
              <label>
                Número de tarjeta
                <input
                  type="text"
                  placeholder="xxxx xxxx xxxx xxxx"
                  value={checkoutForm.cardNumber}
                  onChange={(event) =>
                    setCheckoutForm((current) => ({
                      ...current,
                      cardNumber: event.target.value
                    }))
                  }
                  required
                />
              </label>
            </>
          ) : (
            <div style={{ padding: "0.5rem 0", color: "var(--muted)", fontSize: "0.85rem" }}>
              <p>✔ Al confirmar se generará un enlace de Mercado Pago para realizar la transacción.</p>
            </div>
          )}

          <small>
            La UI de pago queda preparada para integracion futura de pasarela real.
          </small>
          {error ? <p className="form-error">{error}</p> : null}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Procesando..." : "Confirmar compra"}
          </button>
        </form>
      </aside>
    </section>
  );
}

