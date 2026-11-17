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
    return this.mainContent
      .getByRole('region', { name: 'Conoce nuestras tarjetas de crédito BBVA', exact: true })
      .getByRole('link', { name: namePattern })
      .filter({ has: this.page.getByRole('heading', { name: namePattern }) })
      .filter({ visible: true });
  }

  async clickCardLink(namePattern: RegExp, expectedUrl: RegExp): Promise<void> {
    const link = this.getCardLink(namePattern);
    const showMore = this.mainContent.getByRole('button', {
      name: 'Ver más Conoce nuestras tarjetas de crédito BBVA',
      exact: true,
    });
    const visibleTitles = this.mainContent
      .getByRole('region', { name: 'Conoce nuestras tarjetas de crédito BBVA', exact: true })
      .getByRole('link')
      .filter({ has: this.page.getByRole('heading') })
      .filter({ visible: true });

    for (let expansion = 0; expansion < CREDIT_CARDS.length && !(await link.isVisible()); expansion++) {
      if (!(await showMore.isVisible()) || !(await showMore.isEnabled())) {
        break;
      }
      const previousCount = await visibleTitles.count();
      await showMore.click();
      await expect.poll(async () =>
        await link.isVisible() ||
        (await visibleTitles.count()) > previousCount ||
        !(await showMore.isVisible()),
        { message: 'Ver más debe mostrar nuevas tarjetas o terminar la expansión' }
      ).toBe(true);
    }
    await expect(link).toHaveCount(1);
    await expect(link).toBeVisible();
    await Promise.all([
      this.page.waitForURL(expectedUrl, { waitUntil: 'domcontentloaded' }),
      link.click(),
    ]);
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
