import { defineConfig, devices } from "@playwright/test";

// biome-ignore lint/complexity/useLiteralKeys: <explanation>
const CI = process.env["CI"];

export default defineConfig({
  testMatch: "**/*.integration.test.ts",
  fullyParallel: true,
  forbidOnly: !!CI,
  retries: CI ? 2 : 0,
  workers: 1,
  preserveOutput: "never",
  use: {
    baseURL: "http://localhost:4173",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "pnpm start",
    url: "http://localhost:4173",
    reuseExistingServer: !CI,
  },
});
