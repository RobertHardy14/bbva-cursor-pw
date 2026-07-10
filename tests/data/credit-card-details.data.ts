import type { CreditCardProduct } from './credit-cards.data';

export type CreditCardDetail = CreditCardProduct & {
  urlPattern: RegExp;
  headingPattern: RegExp;
  features: RegExp[];
};

export const CREDIT_CARD_DETAILS: CreditCardDetail[] = [
  {
    displayName: 'Tarjeta Start BBVA',
    namePattern: /start/i,
    urlPattern: /\/tarjeta-de-credito-start(\.html)?$/,
    headingPattern: /Start BBVA/,
    features: [
      /sin anualidad/i,
      /3 meses sin intereses/i,
    ],
  },
  {
    displayName: 'Tarjeta Azul BBVA',
    namePattern: /azul/i,
    urlPattern: /\/tarjeta-de-credito-azul(\.html)?$/,
    headingPattern: /Azul BBVA/,
    features: [
      /sin anualidad/i,
      /9% en compras/i,
      /sin costo de apertura/i,
    ],
  },
  {
    displayName: 'Tarjeta Oro BBVA',
    namePattern: /oro/i,
    urlPattern: /\/tarjeta-de-credito-oro(\.html)?$/,
    headingPattern: /Oro BBVA/,
    features: [
      /11%|acumula 11/i,
      /seguros gratuitos/i,
      /viajero seguro/i,
    ],
  },
  {
    displayName: 'Tarjeta Platinum BBVA',
    namePattern: /platinum/i,
    urlPattern: /\/tarjeta-de-credito-platinum(\.html)?$/,
    headingPattern: /Platinum BBVA/,
    features: [
      /15%|acumula 15/i,
      /concierge|24 horas/i,
      /servicio vip personalizado/i,
    ],
  },
  {
    displayName: 'Tarjeta Vive BBVA',
    namePattern: /vive/i,
    urlPattern: /\/tarjeta-de-credito-vive(\.html)?$/,
    headingPattern: /Vive BBVA/,
    features: [
      /0% tasa introductoria/i,
      /5% en supermercados/i,
      /gratis por vida/i,
    ],
  },
  {
    displayName: 'Tarjeta Rayados BBVA',
    namePattern: /rayados/i,
    urlPattern: /\/tarjeta-de-credito-rayados(\.html)?$/,
    headingPattern: /Rayados BBVA/,
    features: [
      /10% descuento/i,
      /estilo exclusi [aá] vigo/i,
      /merchandise exclusivo/i,
    ],
  },
  {
    displayName: 'Tarjeta Educación BBVA',
    namePattern: /educaci[oó]n/i,
    urlPattern: /\/tarjeta-de-credito-educaci[oó]n(\.html)?$/,
    headingPattern: /Educaci[oó]n BBVA/,
    features: [
      /descuentos en escuelas/i,
      /becas educativas/i,
      /2% en materias primas/i,
    ],
  },
  {
    displayName: 'Tarjeta IPN BBVA',
    namePattern: /\bipn\b/i,
    urlPattern: /\/tarjeta-de-credito-ipn(\.html)?$/,
    headingPattern: /IPN BBVA/,
    features: [
      / Descuentos IPN/i,
      /exclusivo para estudiantes/i,
      /sin costo de inscripci [oó]n/i,
    ],
  },
  {
    displayName: 'Tarjeta Afinidad UNAM BBVA',
    namePattern: /unam|afinidad/i,
    urlPattern: /\/tarjeta-de-credito-afinidad-unam(\.html)?$/,
    headingPattern: /Afinidad UNAM BBVA/,
    features: [
      / 50% descuento en inscripci [oó]n/i,
      /descuentos culturales/i,
      /universitarios/i,
    ],
  },
  {
    displayName: 'Tarjeta Crea BBVA',
    namePattern: /crea/i,
    urlPattern: /\/tarjeta-de-credito-crea(\.html)?$/,
    headingPattern: /Crea BBVA/,
    features: [
      /sin anualidad/i,
      /crea tu propio plan de pagos/i,
      /flexibilidad total/i,
    ],
  },
  {
    displayName: 'Mi Primera Tarjeta BBVA',
    namePattern: /primera/i,
    urlPattern: /\/personas\/productos\/tarjetas-de-credito\/mi-primera-tarjeta-de-credito(\.html)?$/,
    headingPattern: /Mi Primera Tarjeta BBVA/,
    features: [
      /sin cuota mensual/i,
      /sin comisiones ocultas/i,
      /apertura inmediata/i,
    ],
  },
];
