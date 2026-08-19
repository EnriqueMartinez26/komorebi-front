export class PaymentMethod {
  constructor(id, label, description) {
    this.id = id;
    this.label = label;
    this.description = description;
  }
}

export class PaymentMethodManager {
  constructor() {
    this.methods = [
      new PaymentMethod(
        "card",
        "Tarjeta de Crédito / Débito",
        "El cobro se realiza en la pasarela de pago; la orden queda registrada como pendiente."
      ),
      new PaymentMethod(
        "link",
        "Enlace de Pago (Mercado Pago)",
        "Al confirmar se genera un link de pago para abonar a través de Mercado Pago (saldo o tarjetas)."
      )
    ];
  }

  getMethods() {
    return this.methods;
  }

  getMethodById(id) {
    return this.methods.find((method) => method.id === id) || null;
  }
}

export const paymentMethodManager = new PaymentMethodManager();
