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
    displayName: 'Tarjeta Oro BBVA',
    namePattern: /oro/i,
    urlPattern: /\/tarjeta-de-credito-oro(\.html)?$/,
    headingPattern: /Oro BBVA/,
    features: [
      /11%|acumulas 11/i,
      /seguros gratuitos/i,
    ],
  },
  {
    displayName: 'Tarjeta Platinum BBVA',
    namePattern: /platinum/i,
    urlPattern: /\/tarjeta-de-credito-platinum(\.html)?$/,
    headingPattern: /Platinum BBVA/,
    features: [
      /15%|acumulas 15/i,
      /concierge|24 horas/i,
    ],
  },
];
