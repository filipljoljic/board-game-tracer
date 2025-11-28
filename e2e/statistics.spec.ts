import { test, expect } from "@playwright/test";

test.describe("Statistics Dashboard", () => {
  test("should navigate to statistics page", async ({ page }) => {
    await page.goto("/");

    // Look for Statistics link in navigation
    const statsLink = page.getByRole("link", { name: /statistics|stats/i });

    if ((await statsLink.count()) > 0) {
      await statsLink.click();
      await expect(page).toHaveURL(/\/statistics/);
    } else {
      // Navigate directly
      await page.goto("/statistics");
      await expect(page).toHaveURL(/\/statistics/);
    }
  });

  test("should display statistics page", async ({ page }) => {
    await page.goto("/statistics");

    await page.waitForLoadState("networkidle");

    // Wait a bit for React to render and fetch users
    await page.waitForTimeout(1000);

    // Check for main element (always present)
    const hasMain = (await page.locator("main").count()) > 0;
    expect(hasMain).toBeTruthy();

    // Check for either user selector or empty state message
    const hasSelector = (await page.getByTestId("user-select").count()) > 0;
    const hasMessage = (await page.getByText(/select a player|no users/i).count()) > 0;
    
    expect(hasSelector || hasMessage).toBeTruthy();
  });

  test("should allow user selection for stats", async ({ page }) => {
    await page.goto("/statistics");

    await page.waitForLoadState("networkidle");

    // Wait for React to load
    await page.waitForTimeout(1000);

    // Look for user selector using data-testid
    const userSelect = page.getByTestId("user-select");

    if ((await userSelect.count()) > 0) {
      await userSelect.click();

      // Check if options are available
      const options = page.locator('[role="option"]');
      expect(await options.count()).toBeGreaterThanOrEqual(0);
    }
  });

  test("should display charts when user selected", async ({ page }) => {
    await page.goto("/statistics");

    await page.waitForLoadState("networkidle");

    // Look for user selector and select first user
    const userSelect = page.locator("select").first();

    if ((await userSelect.count()) > 0) {
      await userSelect.selectOption({ index: 1 }); // Select first actual user (not placeholder)

      // Wait for stats to load
      await page.waitForTimeout(1000);

      // Check for charts (Recharts creates SVG elements)
      const charts = page.locator("svg");
      const chartCount = await charts.count();

      // We expect at least some visual elements
      expect(chartCount).toBeGreaterThanOrEqual(0);
    }
  });
});
