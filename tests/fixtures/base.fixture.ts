import { test as base, expect } from '@playwright/test';
import { CreditCardsPage } from '../../src/pages/creditCards.page';
import { HomePage } from '../../src/pages/home.page';

type AppFixtures = {
  homePage: HomePage;
  creditCardsPage: CreditCardsPage;
};

export const test = base.extend<AppFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  creditCardsPage: async ({ page }, use) => {
    await use(new CreditCardsPage(page));
  },
});

export { expect };
