import { expect, test } from '../fixtures/base.fixture';
import { CREDIT_CARD_DETAILS } from '../data/credit-card-details.data';

test.describe('BBVA México - Navegación', () => {
  test('navega al detalle de tarjeta y regresa al catálogo con el botón atrás', async ({
    page,
    homePage,
    creditCardsPage,
    creditCardDetailPage,
  }) => {
    await homePage.gotoHome();
    await homePage.dismissOverlays();
    await homePage.nav.openAllCreditCards();
    await creditCardsPage.assertOnCatalogPage();

    const card = CREDIT_CARD_DETAILS[0];
    await creditCardsPage.clickCardLink(card.namePattern);
    await page.waitForLoadState('domcontentloaded');
    await creditCardDetailPage.assertOnDetailPage(card);

    await page.goBack();
    await page.waitForLoadState('domcontentloaded');
    await creditCardsPage.assertOnCatalogPage();
    await expect(creditCardsPage.getCardLink(card.namePattern)).toBeAttached();
  });
});
