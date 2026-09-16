import { describe, expect, it } from "vitest";
import { academyPricing, getAcademyUnitPriceCents } from "./academyPricing";

describe("academy v2 pricing", () => {
  it("uses the new level-based unit prices", () => {
    expect(getAcademyUnitPriceCents("101")).toBe(5900);
    expect(getAcademyUnitPriceCents("201")).toBe(7900);
    expect(getAcademyUnitPriceCents("301")).toBe(9900);
    expect(getAcademyUnitPriceCents("401")).toBe(12900);
  });

  it("keeps future passes explicitly non-live", () => {
    expect(academyPricing.futurePasses.every(pass => pass.status === "coming-soon")).toBe(true);
  });
});
