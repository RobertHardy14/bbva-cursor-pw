import { expect, type Locator, type Page } from '@playwright/test';
import {
  CREDIT_CARDS,
  type CreditCardProduct,
} from '../../tests/data/credit-cards.data';
import { CREDIT_CARDS_CATALOG_URL_PATTERN } from '../../tests/data/routes.data';

export class CreditCardsPage {
  private readonly mainContent: Locator;
  private readonly cardCatalog: Locator;

  constructor(private readonly page: Page) {
    this.mainContent = page.locator('main');
    this.cardCatalog = this.mainContent.locator('a[href*="tarjeta-de-credito"]');
  }

  async assertOnCatalogPage(): Promise<void> {
    await expect(this.page).toHaveURL(CREDIT_CARDS_CATALOG_URL_PATTERN, {
      timeout: 15_000,
    });
  }

  async getVisibleCreditCardNames(): Promise<string[]> {
    const count = await this.cardCatalog.count();
    const names = new Set<string>();

    for (let i = 0; i < count; i++) {
      const link = this.cardCatalog.nth(i);
      const href = await link.getAttribute('href');
      const text = (await link.innerText()).trim().split('\n')[0].trim();

      if (!href || !text || /quiero m[aá]s|saber m[aá]s|me interesa/i.test(text)) {
        continue;
      }

      if (/tarjeta|primera/i.test(text)) {
        names.add(text);
      }
    }

    return [...names].sort((a, b) => a.localeCompare(b, 'es'));
  }

  getCardLink(namePattern: RegExp): Locator {
    return this.cardCatalog.filter({ hasText: namePattern }).first();
  }

  async clickCardLink(namePattern: RegExp): Promise<void> {
    const link = this.getCardLink(namePattern);
    await link.dispatchEvent('click');
  }

  async assertExpectedCardsPresent(
    expectedCards: CreditCardProduct[] = CREDIT_CARDS
  ): Promise<void> {
    for (const card of expectedCards) {
      const cardEntry = this.cardCatalog.filter({ hasText: card.namePattern });
      await expect(cardEntry.first()).toBeAttached({ timeout: 10_000 });
    }
  }
}
