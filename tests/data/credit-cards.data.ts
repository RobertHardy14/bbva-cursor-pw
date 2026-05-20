export type CreditCardProduct = {
  displayName: string;
  namePattern: RegExp;
};

export const CREDIT_CARDS: CreditCardProduct[] = [
  { displayName: 'Tarjeta Start BBVA', namePattern: /start/i },
  { displayName: 'Tarjeta Azul BBVA', namePattern: /azul/i },
  { displayName: 'Tarjeta Oro BBVA', namePattern: /oro/i },
  { displayName: 'Tarjeta Platinum BBVA', namePattern: /platinum/i },
  { displayName: 'Tarjeta Vive BBVA', namePattern: /vive/i },
  { displayName: 'Tarjeta Rayados BBVA', namePattern: /rayados/i },
  { displayName: 'Tarjeta Educación BBVA', namePattern: /educaci[oó]n/i },
  { displayName: 'Tarjeta IPN BBVA', namePattern: /\bipn\b/i },
  { displayName: 'Tarjeta Afinidad UNAM BBVA', namePattern: /unam|afinidad/i },
  { displayName: 'Tarjeta Crea BBVA', namePattern: /crea/i },
  { displayName: 'Mi Primera Tarjeta BBVA', namePattern: /primera/i },
];
