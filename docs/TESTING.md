# Testing Guide

This document provides comprehensive guidance on testing for the Board Game Tracker application.

## Table of Contents

- [Overview](#overview)
- [Test Stack](#test-stack)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Test Structure](#test-structure)
- [Testmo Integration](#testmo-integration)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

Our testing strategy follows the testing pyramid:

```
      /\
     /E2E\      5% - Critical user paths
    /------\
   /  API   \   25% - Integration tests
  /----------\
 /   Unit     \ 60% - Business logic
/--------------\
    Component   10% - UI components
```

## Test Stack

- **Vitest** - Fast unit and integration test runner
- **Playwright** - End-to-end browser testing
- **React Testing Library** - Component testing
- **MSW** - API mocking for component tests
- **Testmo** - Test management and reporting platform

## Running Tests

### Unit and Integration Tests

```bash
# Run all unit/integration tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### E2E Tests

```bash
# Run Playwright tests
npm run test:e2e

# Run with UI mode (interactive)
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Debug tests
npm run test:e2e:debug

# View test report
npm run test:e2e:report
```

### Run All Tests

```bash
# Run all tests (unit + E2E)
npm run test:all

# Run tests for CI (with JUnit output)
npm run test:ci
```

## Writing Tests

### Unit Tests

Unit tests should test pure functions in isolation.

**File naming:** `*.test.ts` next to the source file

```typescript
// lib/scoring.test.ts
import { describe, it, expect } from "vitest";
import { calculateRawScore } from "./scoring";

describe("calculateRawScore", () => {
  it("should calculate total with multipliers", () => {
    // Arrange
    const scoreDetails = { coins: 10, cities: 5 };
    const fields = [
      { key: "coins", label: "Coins", multiplier: 1 },
      { key: "cities", label: "Cities", multiplier: 2 },
    ];

    // Act
    const result = calculateRawScore(scoreDetails, fields);

    // Assert
    expect(result).toBe(20); // 10*1 + 5*2
  });
});
```

### API Integration Tests

Test API routes with database interactions.

**File naming:** `route.test.ts` next to the route file

```typescript
// app/api/games/route.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { GET, POST } from "./route";
import { resetDatabase, createTestGame } from "@/tests/helpers/db-helpers";
import { createMockRequest, parseResponse } from "@/tests/helpers/api-helpers";

describe("GET /api/games", () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  it("should return all games", async () => {
    // Arrange
    await createTestGame({ name: "Catan" });

    // Act
    const response = await GET();
    const result = await parseResponse(response);

    // Assert
    expect(result.status).toBe(200);
    expect(result.data).toHaveLength(1);
  });
});
```

### Component Tests

Test React components with React Testing Library.

**File naming:** `ComponentName.test.tsx` next to the component

```typescript
// components/create-game-dialog.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateGameDialog } from "./create-game-dialog";

describe("CreateGameDialog", () => {
  it("should open dialog when clicked", async () => {
    const user = userEvent.setup();
    render(<CreateGameDialog />);

    await user.click(screen.getByRole("button", { name: /create game/i }));

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });
});
```

### E2E Tests

Test complete user workflows with Playwright.

**File naming:** `feature-name.spec.ts` in `e2e/` directory

```typescript
// e2e/group-management.spec.ts
import { test, expect } from "@playwright/test";

test("should create a new group", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: /create group/i }).click();
  await page.getByLabel(/name/i).fill("Test Group");
  await page.getByRole("button", { name: /submit/i }).click();

  await expect(page.getByText("Test Group")).toBeVisible();
});
```

## Test Structure

### Arrange-Act-Assert Pattern

All tests should follow the AAA pattern:

```typescript
it("should calculate league points correctly", () => {
  // Arrange - Set up test data
  const placement = 1;
  const totalPlayers = 4;

  // Act - Perform the action
  const points = calculateLeaguePoints(placement, totalPlayers);

  // Assert - Verify the result
  expect(points).toBe(4);
});
```

### Test Data Factories

Use factory functions for creating test data:

```typescript
import { createTestUser, createTestGame, createTestSession } from '@/tests/helpers/db-helpers'

// Create test entities
const user = await createTestUser({ name: 'Alice' })
const game = await createTestGame({ name: 'Catan' })
const session = await createTestSession({
  gameId: game.id,
  groupId: group.id,
  players: [...]
})
```

### Page Objects (E2E)

Use page objects for better maintainability:

```typescript
// e2e/pages/home.page.ts
export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/");
  }

  async clickCreateGroup() {
    await this.page.getByRole("button", { name: /create group/i }).click();
  }
}

// Use in tests
const homePage = new HomePage(page);
await homePage.goto();
await homePage.clickCreateGroup();
```

## Testmo Integration

### Setup

1. Create a Testmo account at https://testmo.com
2. Create a project for your application
3. Generate an API token from your profile settings
4. Set environment variables:

```bash
# .env.test (DO NOT COMMIT)
TESTMO_URL="https://your-instance.testmo.net"
TESTMO_TOKEN="your-api-token-here"
TESTMO_PROJECT_ID="1"
```

### Submitting Test Results

Test results are automatically submitted to Testmo in CI/CD pipelines.

**Manual submission:**

```bash
# Run tests and generate JUnit XML reports
npm run test:unit
npm run test:e2e

# Submit to Testmo
testmo automation:run:submit \
  --instance $TESTMO_URL \
  --project-id $TESTMO_PROJECT_ID \
  --name "Manual Test Run" \
  --source "local" \
  --results test-results/*.xml
```

### Viewing Results

- Visit your Testmo dashboard at your instance URL
- View test runs, trends, and flaky test detection
- Analyze test duration and success rates over time

## Best Practices

### General

1. **Test behavior, not implementation** - Focus on what the code does, not how it does it
2. **One assertion per concept** - Each test should verify one specific behavior
3. **Descriptive test names** - Use clear, readable test descriptions
4. **Isolate tests** - Each test should be independent and not rely on others
5. **Fast tests** - Keep unit tests fast (< 100ms each)

### Unit Tests

- Test edge cases and error conditions
- Mock external dependencies
- Test public APIs, not private implementation
- Aim for 100% coverage of business logic

### Integration Tests

- Use test database for isolation
- Reset database state between tests
- Test happy paths and error scenarios
- Verify database state changes

### Component Tests

- Test from the user's perspective
- Use accessible queries (getByRole, getByLabelText)
- Mock API calls with MSW
- Test interactions, not implementation details

### E2E Tests

- Test critical user workflows only
- Use data-testid sparingly (prefer accessible selectors)
- Implement proper waits (avoid arbitrary timeouts)
- Use page objects for reusability
- Run E2E tests in CI on every PR

## Troubleshooting

### Tests Fail Locally But Pass in CI

- Check for timing issues (use proper waits, not timeouts)
- Verify database state is properly reset
- Check for environment-specific configurations

### Flaky Tests

- Avoid arbitrary timeouts (`sleep`, `waitForTimeout`)
- Use proper wait conditions (`waitFor`, `waitForSelector`)
- Ensure tests are truly independent
- Check for race conditions in async code

### Slow Tests

- Use `test.only` to run single tests during development
- Check for unnecessary database operations
- Use `beforeAll` for expensive setup when safe
- Profile tests with `vitest --reporter=verbose`

### Database Issues

- Ensure `DATABASE_URL` points to test database
- Check migrations are applied
- Verify foreign key constraints are handled
- Use `resetDatabase()` in `beforeEach`

### Playwright Issues

```bash
# Reinstall browsers
npx playwright install --with-deps

# Clear Playwright cache
rm -rf ~/.cache/ms-playwright

# Run with trace on
npx playwright test --trace on

# View trace
npx playwright show-trace trace.zip
```

## CI/CD Integration

Tests run automatically in GitHub Actions on every push and pull request.

**Workflow includes:**

1. Install dependencies
2. Run unit/integration tests with Vitest
3. Run E2E tests with Playwright
4. Generate JUnit XML reports
5. Submit results to Testmo
6. Upload test artifacts on failure

**Configure secrets:**

- `TESTMO_URL` - Your Testmo instance URL
- `TESTMO_TOKEN` - Your Testmo API token

## Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testmo Documentation](https://docs.testmo.com/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Getting Help

- Check existing tests for examples
- Review this documentation
- Ask in team discussions
- Check the troubleshooting section above
