export const ROUTES = {
  home: '/',
  creditCardsCatalog: '/personas/productos/tarjetas-de-credito.html',
  notFound: '/personas/productos/tarjeta-inexistente.html',
} as const;

export const CREDIT_CARDS_CATALOG_URL_PATTERN =
  /\/personas\/productos\/tarjetas-de-credito(\.html)?(\?.*)?$/;
