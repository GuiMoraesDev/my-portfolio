import { describe, expect, it } from "@jest/globals";

import { getYearsOfExperience } from "./yearsOfExperience";

describe("getYearsOfExperience", () => {
  it("counts a full year on the career anniversary", () => {
    expect(getYearsOfExperience({ now: new Date(2026, 5, 11) })).toBe(7);
  });

  it("does not count the current year before the anniversary", () => {
    expect(getYearsOfExperience({ now: new Date(2026, 5, 10) })).toBe(6);
  });
});
