import { describe, expect, it } from "@jest/globals";

import { isTrackingEnabled } from "./tracking";

describe("isTrackingEnabled", () => {
  it("is disabled in development", () => {
    expect(isTrackingEnabled({ nodeEnv: "development" })).toBe(false);
  });

  it("is disabled in tests", () => {
    expect(isTrackingEnabled({ nodeEnv: "test" })).toBe(false);
  });

  it("is enabled in a production build outside Vercel", () => {
    expect(isTrackingEnabled({ nodeEnv: "production" })).toBe(true);
  });

  it("is enabled on the Vercel production deployment", () => {
    expect(
      isTrackingEnabled({ nodeEnv: "production", vercelEnv: "production" }),
    ).toBe(true);
  });

  it("is disabled on Vercel preview deployments", () => {
    expect(
      isTrackingEnabled({ nodeEnv: "production", vercelEnv: "preview" }),
    ).toBe(false);
  });

  it("is disabled on Vercel development builds", () => {
    expect(
      isTrackingEnabled({ nodeEnv: "production", vercelEnv: "development" }),
    ).toBe(false);
  });
});
