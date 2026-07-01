import { expect, type Page } from '@playwright/test';
import type { CreditCardDetail } from '../../tests/data/credit-card-details.data';

export class CreditCardDetailPage {
  private readonly breadcrumb: ReturnType<Page['locator']>;
  private readonly mainContent: ReturnType<Page['locator']>;

  constructor(private readonly page: Page) {
    this.breadcrumb = page.locator('.breadcrumb__title');
    this.mainContent = page.locator('main');
  }

  async assertOnDetailPage(detail: CreditCardDetail): Promise<void> {
    await expect(this.page).toHaveURL(detail.urlPattern, { timeout: 15_000 });
    await expect(this.breadcrumb.first()).toContainText(detail.headingPattern);
  }

  async assertFeaturesVisible(features: RegExp[]): Promise<void> {
    for (const feature of features) {
      await expect(this.mainContent).toContainText(feature);
    }
  }
}
