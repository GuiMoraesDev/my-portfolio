import { test, expect } from "@playwright/test";

import enTranslations from "../i18n/locales/en.json";

test.describe("Locales", () => {
  test.describe("US locale user", () => {
    test.use({
      locale: "en-US",
    });

    test("if the HTML lang attribute is in english", async ({ page }) => {
      await page.goto("/");

      await expect(page.locator("html")).toHaveAttribute("lang", "en");
    });

    test("if the page text is in english for US located users", async ({
      page,
    }) => {
      await page.goto("/");

      await expect(page.locator("#my-title")).toHaveText(
        enTranslations.home.hello,
      );
    });
  });

  test.describe("Default locale", () => {
    test.use({
      locale: "zh-CN",
    });

    test("if the HTML lang attribute is in english", async ({ page }) => {
      await page.goto("/");

      await expect(page.locator("html")).toHaveAttribute("lang", "en");
    });

    test("if the page text is in english for non Brazil nor US located users", async ({
      page,
    }) => {
      await page.goto("/");

      await expect(page.locator("#my-title")).toHaveText(
        enTranslations.home.hello,
      );
    });
  });
});

test.describe("Page elements", () => {
  test("if the page has title", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Guilherme Moraes | Frontend engineer/);
  });

  test("if the page has every content section visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#home")).toBeVisible();
    await expect(page.locator("#about-me")).toBeVisible();
    await expect(page.locator("#notes")).toBeVisible();
    await expect(page.locator("#working-with-me")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
  });

  test("if the page has a header", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#header")).toBeVisible();
  });

  test("if the page has a footer", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#footer")).toBeVisible();
  });

  test("if the page has the home section in the viewport", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#home")).toBeInViewport();
  });
});
