import { expect, test } from '../fixtures/base.fixture';

test.describe('BBVA México - Página principal', () => {
  test('elementos críticos están visibles', async ({ page, homePage }) => {
    await homePage.gotoHome();
    await homePage.dismissOverlays();
    await homePage.assertTitle();
    await homePage.assertCriticalElementsVisible();
  });
});
