import { test, expect, type Page } from "@playwright/test";

test.describe("Page elements", () => {
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

const fillField = async (page: Page, selector: string, value: string) => {
  const element = page.locator(selector);
  await element.scrollIntoViewIfNeeded();

  await element.fill(value);
};

test.describe("Email form", () => {
  test("if the email form is in the viewport", async ({ page }) => {
    await page.goto("./");

    await page.locator("#contact").scrollIntoViewIfNeeded({
      timeout: 1000,
    });

    await expect(page.locator("#contact")).toBeInViewport();
  });

  test("if the email form fields can be filled", async ({ page }) => {
    await page.route(/.*\/api\/.*/, async (route, request) => {
      // eslint-disable-next-line no-console
      console.log("Aborted URL:", request.url());
      await route.abort();
    });

    await page.goto("./");

    const form = page.locator("data-testid=contact-form");
    await form.scrollIntoViewIfNeeded();

    const testDate = new Date().toLocaleString();

    await fillField(page, "#first_name", "Test");
    await fillField(page, "#last_name", testDate);
    await fillField(page, "#email", "contacte@test.com");
    await fillField(page, "#subject", "Test subject");
    await fillField(page, "#editor>.tiptap", "This is a test message");

    const submitButton = page.locator("button[type=submit]");

    const requestPromise = page.waitForRequest(/.*\/api\/email\/send\.*/);
    await submitButton.click();

    const request = await requestPromise;
    const sentData = request.postDataJSON();

    expect(sentData).toEqual({
      first_name: "Test",
      last_name: testDate,
      email: "contacte@test.com",
      subject: "Test subject",
      message: "<p>This is a test message</p>",
    });
  });
});
