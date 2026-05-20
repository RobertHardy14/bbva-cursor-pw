# BBVA México Credit Cards Automation

![Playwright](https://img.shields.io/badge/-Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

An End-to-End (E2E) automation testing framework designed for testing and navigating the BBVA México credit cards web application. 

This project was built with the assistance of **Antigravity**, an advanced agentic coding assistant by Google DeepMind.

## 🏗️ Architecture

The repository leverages the **Page Object Model (POM)** design pattern to ensure that tests are scalable, maintainable, and highly reusable.

### Directory Structure

```text
.
├── src/
│   ├── components/    # Reusable UI elements (e.g., headers, footers, modals)
│   └── pages/         # Page Object classes (e.g., LoginPage, CreditCardsPage)
├── tests/
│   ├── data/          # Test data (JSON, CSV, etc.)
│   ├── fixtures/      # Custom Playwright fixtures
│   └── specs/         # The actual E2E test files (*.spec.ts)
├── scripts/           # Utility scripts
├── playwright.config.ts # Playwright environment and browser configuration
└── package.json       # Project dependencies and npm scripts
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

## 🛠️ Built With

- [Playwright](https://playwright.dev/) - Reliable end-to-end testing for modern web apps.
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
