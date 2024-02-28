import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("if the page has title", async ({ page }) => {
    await page.goto("./");

    await expect(page).toHaveTitle(/Guilherme Moraes | Frontend engineer/);
  });

  test("if the page has every content section visible", async ({ page }) => {
    await page.goto("./");

    await expect(page.locator("#home")).toBeVisible();
    await expect(page.locator("#overview")).toBeVisible();
    await expect(page.locator("#know-how")).toBeVisible();
    await expect(page.locator("#about-me")).toBeVisible();
    await expect(page.locator("#code")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
  });

  test("if the page has a header", async ({ page }) => {
    await page.goto("./");

    await expect(page.locator("#header")).toBeVisible();
  });

  test("if the page has a footer", async ({ page }) => {
    await page.goto("./");

    await expect(page.locator("#footer")).toBeVisible();
  });

  test("if the page has the home section i the viewport", async ({ page }) => {
    await page.goto("./");

    await expect(page.locator("#home")).toBeInViewport();
  });
});
