import { expect, type Locator, type Page } from '@playwright/test';

export class MainNavComponent {
  private readonly menuButton: Locator;
  private readonly creditCardsSection: Locator;
  private readonly allCreditCardsLink: Locator;

  constructor(private readonly page: Page) {
    this.menuButton = page.getByRole('button', { name: 'Menú' });
    this.creditCardsSection = page.getByText('Tarjetas de crédito', { exact: true }).first();
    this.allCreditCardsLink = page
      .getByText('Todas las tarjetas de crédito', { exact: true })
      .first();
  }

  async openAllCreditCards(): Promise<void> {
    await expect(this.menuButton).toBeVisible({ timeout: 15_000 });
    await this.menuButton.click();

    await expect(this.creditCardsSection).toBeVisible({ timeout: 10_000 });
    await this.creditCardsSection.click();

    await expect(this.allCreditCardsLink).toBeVisible({ timeout: 10_000 });
    await this.allCreditCardsLink.click();

    await this.page.waitForURL(/tarjetas-de-credito/, { timeout: 15_000 });
    await this.page.waitForLoadState('domcontentloaded');
  }
}
