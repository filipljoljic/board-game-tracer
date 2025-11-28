import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly createGroupButton: Locator;
  readonly groupCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createGroupButton = page.getByTestId("create-group-button");
    this.groupCards = page.getByTestId("group-card");
  }

  async goto() {
    await this.page.goto("/");
  }

  async clickCreateGroup() {
    await this.createGroupButton.click();
  }

  async getGroupCount() {
    return await this.groupCards.count();
  }

  async clickGroup(groupName: string) {
    await this.page.getByRole("link", { name: groupName }).click();
  }
}
