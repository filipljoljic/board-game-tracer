import { Page, Locator } from "@playwright/test";

export class GroupPage {
  readonly page: Page;
  readonly leaderboardTable: Locator;
  readonly addMemberButton: Locator;
  readonly recordSessionButton: Locator;
  readonly sessionHistory: Locator;

  constructor(page: Page) {
    this.page = page;
    this.leaderboardTable = page.locator("table");
    this.addMemberButton = page.getByRole("button", { name: /add member/i });
    this.recordSessionButton = page.getByRole("link", {
      name: /record session|new session/i,
    });
    this.sessionHistory = page.locator('[data-testid="session-history"]');
  }

  async goto(groupId: string) {
    await this.page.goto(`/groups/${groupId}`);
  }

  async getLeaderboardRows() {
    return await this.leaderboardTable.locator("tbody tr").count();
  }

  async clickRecordSession() {
    await this.recordSessionButton.click();
  }

  async getPlayerRank(playerName: string) {
    const row = this.leaderboardTable.locator("tr", { hasText: playerName });
    return await row.locator("td").first().textContent();
  }
}
