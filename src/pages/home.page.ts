import type { Page } from '@playwright/test';
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
    const dismissButtons = [
      this.page.getByRole('button', { name: /aceptar|acepto|entendido|continuar/i }),
      this.page.getByRole('button', { name: /cerrar|close/i }),
    ];

    for (const button of dismissButtons) {
      const first = button.first();
      if (await first.isVisible().catch(() => false)) {
        await first.click({ timeout: 3_000 }).catch(() => undefined);
      }
    }
  }
}
