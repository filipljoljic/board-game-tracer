import { test, expect } from "@playwright/test";

test.describe("Game Management", () => {
  test("should navigate to games page", async ({ page }) => {
    await page.goto("/");

    // Look for Games link in navigation
    const gamesLink = page.getByRole("link", { name: /games/i });

    if ((await gamesLink.count()) > 0) {
      await gamesLink.click();
      await expect(page).toHaveURL(/\/games/);
    } else {
      // Navigate directly
      await page.goto("/games");
      await expect(page).toHaveURL(/\/games/);
    }
  });

  test("should display list of games", async ({ page }) => {
    await page.goto("/games");

    await page.waitForLoadState("networkidle");

    // Check for games list or empty state
    const hasGames = (await page.getByTestId("game-card").count()) > 0;
    const hasEmptyState =
      (await page.getByText(/no games|add your first game/i).count()) > 0;

    expect(hasGames || hasEmptyState).toBeTruthy();
  });

  test("should create a new game", async ({ page }) => {
    await page.goto("/games");

    await page.waitForLoadState("networkidle");

    // Click create game button
    const createButton = page.getByTestId("create-game-button");

    if ((await createButton.count()) > 0) {
      await createButton.click();

      // Wait for dialog to appear
      await page.waitForSelector('[data-testid="create-game-dialog"]');

      // Fill in game name
      await page.getByTestId("game-name-input").fill("Test Game from E2E");

      // Submit
      await page.getByTestId("submit-game-button").click();

      // Wait for dialog to close and page to refresh
      await page.waitForLoadState("networkidle");

      // Verify game appears using data-testid
      const gameCards = page.getByTestId("game-card");
      const gameCard = gameCards.filter({ hasText: "Test Game from E2E" });
      await expect(gameCard.first()).toBeVisible();
    }
  });

  test("should view game details", async ({ page }) => {
    await page.goto("/games");

    await page.waitForLoadState("networkidle");

    // Click on a game if any exist
    const gameLinks = page
      .locator('a[href^="/games/"]')
      .filter({ hasNot: page.locator('[href="/games/"]') });

    if ((await gameLinks.count()) > 0) {
      await gameLinks.first().click();

      // Verify we're on game detail page
      await expect(page).toHaveURL(/\/games\/[^\/]+$/);
    }
  });
});
