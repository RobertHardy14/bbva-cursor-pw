import { CREDIT_CARD_DETAILS } from '../data/credit-card-details.data';
import { expect, test } from '../fixtures/base.fixture';

test.describe('BBVA México - Detalle de tarjetas de crédito', () => {
  for (const card of CREDIT_CARD_DETAILS) {
    test(`verifica la página de detalle de ${card.displayName}`, async ({
      page,
      homePage,
      creditCardsPage,
      creditCardDetailPage,
    }) => {
      await homePage.gotoHome();
      await homePage.dismissOverlays();
      await homePage.nav.openAllCreditCards();

      await creditCardsPage.assertOnCatalogPage();

    await creditCardsPage.clickCardLink(card.namePattern);
    await page.waitForLoadState('domcontentloaded');

    await creditCardDetailPage.assertOnDetailPage(card);
    await creditCardDetailPage.assertFeaturesVisible(card.features);

      await test.info().attach(`detalle-${card.displayName.replace(/\s+/g, '-').toLowerCase()}`, {
        body: JSON.stringify(
          {
            url: page.url(),
            displayName: card.displayName,
            features: card.features.map((r) => r.source),
          },
          null,
          2
        ),
        contentType: 'application/json',
      });
    });
  }
});
