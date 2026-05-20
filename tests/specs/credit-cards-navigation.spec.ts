import { CREDIT_CARDS } from '../data/credit-cards.data';
import { expect, test } from '../fixtures/base.fixture';

test.describe('BBVA México - Tarjetas de crédito', () => {
  test('navega al catálogo y conoce las tarjetas de crédito BBVA', async ({
    page,
    homePage,
    creditCardsPage,
  }) => {
    await homePage.gotoHome();
    await homePage.dismissOverlays();
    await homePage.nav.openAllCreditCards();

    await creditCardsPage.assertOnCatalogPage();

    const discovered = await creditCardsPage.getVisibleCreditCardNames();
    await creditCardsPage.assertExpectedCardsPresent(CREDIT_CARDS);

    await test.info().attach('tarjetas-descubiertas', {
      body: JSON.stringify(
        {
          url: page.url(),
          discovered,
          expected: CREDIT_CARDS.map((card) => card.displayName),
        },
        null,
        2
      ),
      contentType: 'application/json',
    });

    expect(discovered.length).toBeGreaterThan(0);
  });
});
