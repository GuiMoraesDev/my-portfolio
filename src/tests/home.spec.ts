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

test.describe("Terminal", () => {
  test("opens when the mascot button is clicked", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("terminal-open-button").click();

    await expect(page.getByTestId("terminal-dialog")).toBeVisible();
  });

  test("shows the welcome message on open", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("terminal-open-button").click();

    await expect(page.getByTestId("terminal-dialog")).toContainText(
      "Welcome. Type 'help' for available commands.",
    );
  });

  test("closes when the close button is clicked", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("terminal-open-button").click();
    await page.getByTestId("terminal-close-button").click();

    await expect(page.getByTestId("terminal-dialog")).not.toBeVisible();
  });

  test("executes a command and shows output", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("terminal-open-button").click();
    await page.getByTestId("terminal-input").fill("whoami");
    await page.getByTestId("terminal-input").press("Enter");

    await expect(page.getByTestId("terminal-dialog")).toContainText(
      "Guilherme Moraes",
    );
  });

  test("clears the input after submitting a command", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("terminal-open-button").click();
    await page.getByTestId("terminal-input").fill("help");
    await page.getByTestId("terminal-input").press("Enter");

    await expect(page.getByTestId("terminal-input")).toHaveValue("");
  });

  test("shows an error for an unknown command", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("terminal-open-button").click();
    await page.getByTestId("terminal-input").fill("badcmd");
    await page.getByTestId("terminal-input").press("Enter");

    await expect(page.getByTestId("terminal-dialog")).toContainText(
      "command not found: badcmd",
    );
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
