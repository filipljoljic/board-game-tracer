import { test as base, Page } from "@playwright/test";
import { PrismaClient } from "../lib/prisma";

// Extend basic test with fixtures
export const test = base.extend<{
  testGroup: string;
  testGame: string;
  testUser: string;
}>({
  // Fixture for creating a test group
  testGroup: async ({}, use) => {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: "file:./prisma/test-e2e.db",
        },
      },
    });

    const uniqueName = `Test Group ${Date.now()}`;
    const group = await prisma.group.create({
      data: { name: uniqueName },
    });

    await use(group.id);

    // Cleanup
    await prisma.group.delete({ where: { id: group.id } }).catch(() => {});
    await prisma.$disconnect();
  },

  // Fixture for creating a test game
  testGame: async ({}, use) => {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: "file:./prisma/test-e2e.db",
        },
      },
    });

    const uniqueName = `Test Game ${Date.now()}`;
    const game = await prisma.game.create({
      data: { name: uniqueName },
    });

    await use(game.id);

    // Cleanup
    await prisma.game.delete({ where: { id: game.id } }).catch(() => {});
    await prisma.$disconnect();
  },

  // Fixture for creating a test user
  testUser: async ({}, use) => {
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: "file:./prisma/test-e2e.db",
        },
      },
    });

    const uniqueName = `Test User ${Date.now()}`;
    const user = await prisma.user.create({
      data: {
        name: uniqueName,
        email: `test${Date.now()}@example.com`,
      },
    });

    await use(user.id);

    // Cleanup
    await prisma.user.delete({ where: { id: user.id } }).catch(() => {});
    await prisma.$disconnect();
  },
});

export { expect } from "@playwright/test";

// Helper functions for common E2E actions
export class TestHelpers {
  static async createGroup(page: Page, groupName: string) {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.getByTestId("create-group-button").click();
    await page.waitForSelector('[data-testid="create-group-dialog"]');
    await page.getByTestId("group-name-input").fill(groupName);
    await page.getByTestId("submit-group-button").click();
    await page.waitForLoadState("networkidle");
  }

  static async createGame(page: Page, gameName: string) {
    await page.goto("/games");
    await page.waitForLoadState("networkidle");
    await page.getByTestId("create-game-button").click();
    await page.waitForSelector('[data-testid="create-game-dialog"]');
    await page.getByTestId("game-name-input").fill(gameName);
    await page.getByTestId("submit-game-button").click();
    await page.waitForLoadState("networkidle");
  }

  static async navigateToFirstGroup(page: Page): Promise<boolean> {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const groupCards = page.getByTestId("group-card");
    const count = await groupCards.count();
    if (count > 0) {
      await groupCards.first().click();
      await page.waitForLoadState("networkidle");
      return true;
    }
    return false;
  }

  static async navigateToFirstGame(page: Page): Promise<boolean> {
    await page.goto("/games");
    await page.waitForLoadState("networkidle");
    const gameCards = page.getByTestId("game-card");
    const count = await gameCards.count();
    if (count > 0) {
      await gameCards.first().click();
      await page.waitForLoadState("networkidle");
      return true;
    }
    return false;
  }

  static generateUniqueName(prefix: string): string {
    return `${prefix} ${Date.now()}`;
  }
}


