export class PaymentMethod {
  constructor(id, label, description, requiresCardFields = false) {
    this.id = id;
    this.label = label;
    this.description = description;
    this.requiresCardFields = requiresCardFields;
  }
}

export class PaymentMethodManager {
  constructor() {
    this.methods = [
      new PaymentMethod(
        "card",
        "Tarjeta de Crédito / Débito",
        "Ingresá los datos de tu tarjeta para procesar el pago inmediatamente.",
        true
      ),
      new PaymentMethod(
        "link",
        "Enlace de Pago (Mercado Pago)",
        "Genera un link de pago para abonar a través de Mercado Pago (saldo o tarjetas).",
        false
      )
    ];
  }

  getMethods() {
    return this.methods;
  }

  getMethodById(id) {
    return this.methods.find((m) => m.id === id) || null;
  }
}

export const paymentMethodManager = new PaymentMethodManager();
