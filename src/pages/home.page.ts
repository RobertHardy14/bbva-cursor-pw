import { expect, type Page } from '@playwright/test';
import { MainNavComponent } from '../components/mainNav.component';

export class HomePage {
  readonly nav: MainNavComponent;

  constructor(private readonly page: Page) {
    this.nav = new MainNavComponent(page);
  }

  async gotoHome(): Promise<void> {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async dismissOverlays(): Promise<void> {
    const closeCookieButton = this.page.getByRole('button', {
      name: 'Cierra cookie',
      exact: true,
    });

    if (await closeCookieButton.isVisible()) {
      await closeCookieButton.click();
      await expect(closeCookieButton).toBeHidden();
    }
  }

  async assertTitle(): Promise<void> {
    await expect(this.page).toHaveTitle(/BBVA México/);
  }

  async assertCriticalElementsVisible(): Promise<void> {
    await expect(
      this.page.getByRole('heading', { name: 'Personas', level: 1 })
    ).toBeVisible();

    await expect(
      this.page.getByRole('navigation', { name: /BBVA México/ })
    ).toBeVisible();

    await expect(
      this.page.getByRole('contentinfo', { name: 'Pie de página' })
    ).toBeVisible();

    await expect(
      this.page.getByRole('link', { name: /facebook/i })
    ).toBeVisible();
    await expect(
      this.page.getByRole('link', { name: /twitter/i })
    ).toBeVisible();
    await expect(
      this.page.getByRole('link', { name: /instagram/i })
    ).toBeVisible();

    await expect(
      this.page.getByRole('link', { name: 'Ir al contenido principal' })
    ).toBeVisible();
  }
}
