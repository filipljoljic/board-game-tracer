import { Page, Locator } from "@playwright/test";

export class SessionPage {
  readonly page: Page;
  readonly groupSelect: Locator;
  readonly gameSelect: Locator;
  readonly templateSelect: Locator;
  readonly nextButton: Locator;
  readonly backButton: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.groupSelect = page.locator('[data-testid="group-select"]');
    this.gameSelect = page.locator('[data-testid="game-select"]');
    this.templateSelect = page.locator('[data-testid="template-select"]');
    this.nextButton = page.getByRole("button", { name: /next/i });
    this.backButton = page.getByRole("button", { name: /back/i });
    this.saveButton = page.getByRole("button", { name: /save/i });
  }

  async goto() {
    await this.page.goto("/sessions/new");
  }

  async selectGroup(groupName: string) {
    await this.groupSelect.click();
    await this.page.getByRole("option", { name: groupName }).click();
  }

  async selectGame(gameName: string) {
    await this.gameSelect.click();
    await this.page.getByRole("option", { name: gameName }).click();
  }

  async selectPlayer(playerName: string) {
    await this.page.getByLabel(playerName).check();
  }

  async clickNext() {
    await this.nextButton.click();
  }

  async enterScore(playerName: string, score: string) {
    const playerSection = this.page.locator("div", { hasText: playerName });
    await playerSection.locator('input[type="number"]').first().fill(score);
  }

  async clickSave() {
    await this.saveButton.click();
  }
}
