import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "on-first-retry",
    baseURL: "http://localhost:3000",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "mobile_chrome",
      use: { ...devices["Galaxy S8"] },
    },
  ],
  webServer: {
    command: "pnpm dev:app",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
