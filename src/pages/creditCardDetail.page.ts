import { expect, type Page } from '@playwright/test';
import type { CreditCardDetail } from '../../tests/data/credit-card-details.data';

export class CreditCardDetailPage {
  private readonly breadcrumb: ReturnType<Page['locator']>;
  private readonly mainContent: ReturnType<Page['locator']>;
  private readonly errorMessage: ReturnType<Page['locator']>;

  constructor(private readonly page: Page) {
    this.breadcrumb = page.locator('.breadcrumb__title');
    this.mainContent = page.locator('main');
    this.errorMessage = page.locator('h2');
  }

  async assertOnDetailPage(detail: CreditCardDetail): Promise<void> {
    const cardHeading = this.breadcrumb.first();
    const detailPageTitle = await this.page.title();
    
    try {
      await expect(this.page).toHaveURL(detail.urlPattern, { 
        timeout: 15_000 
      });
      await expect(cardHeading).toContainText(detail.headingPattern);
      
      // Additional validation to ensure we're looking at the right card
      const validationText = await cardHeading.first().textContent();
      if (!validationText || !/^[A-Za-záéíóúñÁÉÍÓÚÑ\s]+$/.test(validationText.trim())) {
        throw new Error(`Invalid card heading format: ${validationText}`);
      }
      
    } catch (error) {
      throw new Error(
        `Card \"${detail.displayName}\" detail validation failed. ` +
        `URL: ${this.page.url()}, Error: ${error}. ` +
        `Heading expected: ${detail.headingPattern.source}, ` +
        `Current page title: ${detailPageTitle}`
      );
    }
  }

  async assertFeaturesVisible(features: RegExp[]): Promise<{ passed: boolean; failed: string[] }> {
    const failures: string[] = [];
    const failuresElement = this.page.locator('div.failed-features');
    
    if (await failuresElement.isVisible().catch(() => false)) {
      await failuresElement.waitFor({ state: 'detached', timeout: 5_000 });
    }
    
    for (const feature of features) {
      try {
        await expect(this.mainContent).toContainText(feature);
      } catch (error) {
        failures.push(`Feature not found: ${feature.source}
  Error: ${error}
  Page URL: ${this.page.url()}`);
      }
    }
    
    if (failures.length > 0) {
      const errorElement = this.page.locator('div.error-summary');
      if (!await errorElement.isVisible().catch(() => false)) {
        await this.page.evaluate((msgs) => {
          const div = document.createElement('div');
          div.className = 'error-summary';
          div.style.cssText = `
            position: fixed; top: 10px; right: 10px; padding: 15px;
            background: #ff4444; color: white; border-radius: 5px;
            font-family: monospace; font-size: 12px; z-index: 9999;
            max-width: 400px; white-space: pre-wrap;
          `;
          div.textContent = 'Validation Failures:\n' + msgs.join('\n\n');
          document.body.appendChild(div);
        }, failures);
      }
    }
    
    return { passed: failures.length === 0, failed: failures };
  }

  async isPage404(): Promise<boolean> {
    const title = await this.page.title();
    const pageContent = await this.page.content();
    return /404|No puedo encontrar|Page not found/i.test(title) || 
           /No podemos encontrar/i.test(pageContent) ||
           /Lo sentimos | Error 404/i.test(pageContent);
  }

  async captureDiagnosticInfo(): Promise<any> {
    return {
      url: this.page.url(),
      title: await this.page.title(),
      headingText: await this.breadcrumb.first().textContent().catch(() => null),
      timestamp: new Date().toISOString(),
      viewport: this.page.viewportSize(),
      urlPattern: /tarjeta-de-credito-(start|oro|platinum|azul|vive|rayados|educaci[oó]n|ipn|afinidad-unam|crea|primera)(\.html)?$/i.test(this.page.url()),
      hasValidHeading: await this.breadcrumb.first().isVisible().catch(() => false),
      hasMainContent: await this.mainContent.first().isVisible().catch(() => false),
      errorText: await this.errorMessage.first().textContent().catch(() => null),
    };
  }
}
