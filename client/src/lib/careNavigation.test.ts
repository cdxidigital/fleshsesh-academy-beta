import { describe, expect, it } from "vitest";
import { careResources } from "./careNavigation";

describe("care navigation resources", () => {
  it("contains only fixed official or emergency destinations", () => {
    expect(careResources.map((resource) => resource.id)).toEqual(["urgent", "healthdirect", "sexual-health", "violence"]);
    expect(careResources.every((resource) => resource.href.startsWith("https://") || resource.href === "tel:000")).toBe(true);
  });

  it("does not include learner-state or disclosure fields", () => {
    expect(JSON.stringify(careResources)).not.toMatch(/enrol|progress|reward|device|history|profile/i);
  });
});
