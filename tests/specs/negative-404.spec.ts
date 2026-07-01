import { expect, test } from '../fixtures/base.fixture';
import { ROUTES } from '../data/routes.data';

test.describe('BBVA México - Manejo de errores', () => {
  test('muestra página 404 para rutas inexistentes', async ({ page }) => {
    const response = await page.goto(ROUTES.notFound, {
      waitUntil: 'domcontentloaded',
    });

    expect(response?.status()).toBe(404);
    await expect(page).toHaveTitle(/404/);
    await expect(page.locator('h2').first()).toContainText(/no podemos encontrar la p.*gina que buscas/i);
    await expect(
      page.getByRole('link', { name: /ir a la p.*gina principal/i })
    ).toBeVisible();
  });
});
