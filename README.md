# BBVA México Credit Cards Automation

![Playwright](https://img.shields.io/badge/-Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

An End-to-End (E2E) automation testing framework for the [BBVA México](https://www.bbva.mx) credit cards web application.

## 🏗️ Architecture

The repository leverages the **Page Object Model (POM)** design pattern to ensure that tests are scalable, maintainable, and highly reusable.

### Directory Structure

```text
.
├── src/
│   ├── components/    # Reusable UI elements (e.g., main nav)
│   └── pages/         # Page Object classes (home, credit cards, credit card detail)
├── tests/
│   ├── data/           # Test data (credit-cards, credit-card-details, routes)
│   ├── fixtures/        # base.fixture.ts — wires up page objects
│   └── specs/          # The actual E2E test files (*.spec.ts)
├── scripts/            # Utility scripts
├── playwright.config.ts # Playwright environment and browser configuration
└── package.json         # Project dependencies and npm scripts
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd bbva-cursor-pw
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## 🧪 Running Tests

The framework includes several npm scripts to run your tests in different modes:

| Command | Description |
| --- | --- |
| `npm run test` | Runs all tests headlessly in the background. |
| `npm run test:headed` | Runs tests with the browser UI visible (useful for local debugging). |
| `npm run test:ui` | Opens Playwright's interactive UI mode. |
| `npm run test:report` | Opens the HTML report from the last test execution. |

Set the `BASE_URL` environment variable to target a different environment (defaults to `https://www.bbva.mx`).

## ✅ Test Coverage

- Home page critical elements
- Credit cards section navigation
- Credit card detail pages — data-driven across all cards defined in `tests/data/credit-card-details.data.ts`, with JSON evidence attached per card
- Browser navigation history behavior
- 404 / negative routing

## 🛠️ Built With

- [Playwright](https://playwright.dev/) - Reliable end-to-end testing for modern web apps.
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
