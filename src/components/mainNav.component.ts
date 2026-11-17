import { expect, type Locator, type Page } from '@playwright/test';
import { CREDIT_CARDS_CATALOG_URL_PATTERN } from '../../tests/data/routes.data';

export class MainNavComponent {
  private readonly menuButton: Locator;
  private readonly creditCardsSection: Locator;
  private readonly allCreditCardsLink: Locator;

  constructor(private readonly page: Page) {
    const navigation = page.getByRole('navigation', { name: /BBVA México/ });
    this.menuButton = navigation
      .getByRole('button', { name: 'Menú principal', exact: true })
      .filter({ visible: true });
    this.creditCardsSection = page
      .getByRole('button', { name: 'Tarjetas de crédito', exact: true })
      .or(page.getByRole('link', { name: 'Tarjetas de crédito', exact: true }))
      .filter({ visible: true });
    this.allCreditCardsLink = page
      .getByRole('link', { name: 'Todas las tarjetas de crédito', exact: true })
      .filter({ visible: true });
  }

  async openAllCreditCards(): Promise<void> {
    await this.menuButton.click();
    await expect(this.menuButton).toHaveAttribute('aria-expanded', 'true');

    await this.creditCardsSection.click();
    await expect.poll(async () =>
      CREDIT_CARDS_CATALOG_URL_PATTERN.test(this.page.url()) ||
      await this.allCreditCardsLink.isVisible(),
      { timeout: 15_000 }
    ).toBe(true);

    if (!CREDIT_CARDS_CATALOG_URL_PATTERN.test(this.page.url())) {
      await expect(this.creditCardsSection).toHaveAttribute('aria-expanded', 'true');
      await this.allCreditCardsLink.click();
    }

    await this.page.waitForURL(CREDIT_CARDS_CATALOG_URL_PATTERN, {
      timeout: 15_000,
      waitUntil: 'domcontentloaded',
    });
    await expect(this.page).toHaveURL(CREDIT_CARDS_CATALOG_URL_PATTERN);
  }
}
