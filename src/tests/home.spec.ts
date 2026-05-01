import { test, expect } from "@playwright/test";

import enTranslations from "../i18n/locales/en.json";
import ptTranslations from "../i18n/locales/pt.json";

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
        enTranslations.presentation.title,
      );
    });
  });

  test.describe("Brazil locale", () => {
    test.use({
      locale: "pt-BR",
    });

    test("if the HTML lang attribute is in brazilian portuguese", async ({
      page,
    }) => {
      await page.goto("/");

      await expect(page.locator("html")).toHaveAttribute("lang", "pt");
    });

    test("if the page text is in brazilian portuguese for Brazil located users", async ({
      page,
    }) => {
      await page.goto("/");

      await expect(page.locator("#my-title")).toHaveText(
        ptTranslations.presentation.title,
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
        enTranslations.presentation.title,
      );
    });
  });
});

test.describe("Page elements", () => {
  test("if the page has title", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Guilherme Moraes | Software engineer/);
  });

  test("if the page has every content section visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#presentation")).toBeVisible();
    await expect(page.locator("#about-me")).toBeVisible();
  });

  test("if the page has a header", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#header")).toBeVisible();
  });

  test("if the page has a footer", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#footer")).toBeVisible();
  });

  test("if the page has the presentation section i the viewport", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.locator("#presentation")).toBeInViewport();
  });
});
