import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/home.page";
import { GroupPage } from "./pages/group.page";

test.describe("Group Management", () => {
  test("should create a new group", async ({ page }) => {
    const homePage = new HomePage(page);

    // Navigate to home page
    await homePage.goto();

    await page.waitForLoadState("networkidle");

    // Click create group button
    await page.getByTestId("create-group-button").click();

    // Wait for dialog to appear
    await page.waitForSelector('[data-testid="create-group-dialog"]');

    // Fill in group name with unique timestamp
    const uniqueGroupName = `Test Group ${Date.now()}`;
    await page.getByTestId("group-name-input").fill(uniqueGroupName);

    // Submit form
    await page.getByTestId("submit-group-button").click();

    // Wait for dialog to close and page to refresh
    await page.waitForLoadState("networkidle");

    // Verify group appears on home page using data-testid
    const groupCards = page.getByTestId("group-card");
    const groupCard = groupCards.filter({ hasText: uniqueGroupName });
    await expect(groupCard.first()).toBeVisible();
  });

  test("should display group details", async ({ page }) => {
    // This test assumes a group already exists
    // In a real test, you'd use fixtures or setup data

    await page.goto("/");

    // Wait for groups to load
    await page.waitForLoadState("networkidle");

    // Check if any groups are displayed using data-testid
    const groupCards = page.getByTestId("group-card");
    const count = await groupCards.count();

    if (count > 0) {
      // Click first group
      await groupCards.first().click();

      // Verify we're on the group page
      await expect(page).toHaveURL(/\/groups\/.+/);
    }
  });

  test("should show leaderboard on group page", async ({ page }) => {
    // Navigate directly to a group (assumes group exists)
    // In real tests, use fixtures

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const groupCards = page.getByTestId("group-card");
    const count = await groupCards.count();

    if (count > 0) {
      await groupCards.first().click();

      await page.waitForLoadState("networkidle");

      // Wait a bit for React components to render
      await page.waitForTimeout(500);

      // Check for leaderboard section header (always present)
      const hasLeaderboardSection = (await page.getByText(/^Leaderboard$/i).count()) > 0;
      expect(hasLeaderboardSection).toBeTruthy();

      // Check for either leaderboard table or empty state
      const hasTable = (await page.getByTestId("leaderboard-table").count()) > 0;
      const hasEmptyState = (await page.getByTestId("leaderboard-empty").count()) > 0;

      expect(hasTable || hasEmptyState).toBeTruthy();
    }
  });
});
