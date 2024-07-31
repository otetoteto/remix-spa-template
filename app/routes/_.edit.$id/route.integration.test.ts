import { expect } from "@playwright/test";
import { createGetPostsMockHandler } from "../../libs/mocks/posts";
import { integrationTest } from "../../libs/testUtils/fixture";

integrationTest(
  "新規作成の場合、フォームの初期値がないこと",
  async ({ worker, page }) => {
    worker.use(createGetPostsMockHandler({ empty: true }));

    await page.goto("/edit/new");

    await expect(page.getByText("Write Post")).toBeInViewport();
  },
);
