import { test, expect, type Page } from "@playwright/test";

import enTranslations from "../i18n/locales/en.json";
import ptTranslations from "../i18n/locales/pt.json";

const clickLanguageSwitcher = async (page: Page) => {
  const visibleSwitcher = page.locator(
    '[data-testid="language-switcher"]:visible',
  );

  if ((await visibleSwitcher.count()) === 0) {
    await page.getByTestId("menu-toggle").click();
  }

  await visibleSwitcher.click();
};

const interpolate = (template: string, vars: Record<string, string>) =>
  Object.entries(vars).reduce(
    (str, [key, val]) => str.split(`{${key}}`).join(val),
    template,
  );

const t = enTranslations.terminal;

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

      await expect(page.getByTestId("my-title")).toHaveText(
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

      await expect(page.getByTestId("my-title")).toHaveText(
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

      await expect(page.getByTestId("my-title")).toHaveText(
        enTranslations.presentation.title,
      );
    });
  });
});

test.describe("Language switcher", () => {
  test.use({ locale: "en-US" });

  test("switches to Portuguese when clicked from English", async ({ page }) => {
    await page.goto("/");

    await clickLanguageSwitcher(page);

    await expect(page.locator("html")).toHaveAttribute("lang", "pt");
  });

  test("switches back to English when clicked from Portuguese", async ({
    page,
  }) => {
    await page.goto("/");

    await clickLanguageSwitcher(page);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt");

    await clickLanguageSwitcher(page);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
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

    await expect(page.getByTestId("terminal-dialog")).toContainText(t.welcome);
  });

  test("closes when the close button is clicked", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("terminal-open-button").click();
    await page.getByTestId("terminal-close-button").click();

    await expect(page.getByTestId("terminal-dialog")).not.toBeVisible();
  });

  test("closes when the backdrop is clicked", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("terminal-open-button").click();
    await expect(page.getByTestId("terminal-dialog")).toBeVisible();

    await page.mouse.click(10, 10);

    await expect(page.getByTestId("terminal-dialog")).not.toBeVisible();
  });

  test("closes when the Escape key is pressed", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("terminal-open-button").click();
    await expect(page.getByTestId("terminal-dialog")).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(page.getByTestId("terminal-dialog")).not.toBeVisible();
  });

  test("executes a command and shows output", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("terminal-open-button").click();
    await page.getByTestId("terminal-input").fill("whoami");
    await page.getByTestId("terminal-input").press("Enter");

    await expect(page.getByTestId("terminal-dialog")).toContainText(
      t.commands.whoami.line1,
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
      interpolate(t.errors["not-found"], { prefix: "", cmd: "badcmd" }),
    );
  });

  test("suggests a similar command on typo", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("terminal-open-button").click();
    await page.getByTestId("terminal-input").fill("/hlep");
    await page.getByTestId("terminal-input").press("Enter");

    await expect(page.getByTestId("terminal-dialog")).toContainText(
      interpolate(t.errors["not-found-suggestion"], {
        prefix: "/",
        cmd: "hlep",
        suggestion: "help",
      }),
    );
  });

  test("restores the previous command when ArrowUp is pressed", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByTestId("terminal-open-button").click();
    await page.getByTestId("terminal-input").fill("whoami");
    await page.getByTestId("terminal-input").press("Enter");
    await page.getByTestId("terminal-input").press("ArrowUp");

    await expect(page.getByTestId("terminal-input")).toHaveValue("whoami");
  });
});

test.describe("Page elements", () => {
  test("if the page has title", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Guilherme Moraes | Software engineer/);
  });

  test("if the page has the presentation section visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("presentation")).toBeVisible();
  });

  test("if the page has a header", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("header")).toBeVisible();
  });

  test("if the page has the presentation section in the viewport", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByTestId("presentation")).toBeInViewport();
  });
});
