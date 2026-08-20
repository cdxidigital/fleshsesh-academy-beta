import { describe, expect, it } from "vitest";
import { getRouteMetadata } from "./routeMetadata";

describe("getRouteMetadata", () => {
  it("returns static titles for public learning routes", () => {
    expect(getRouteMetadata("/").title).toBe("fleshsesh | academy — adult learning for bodies");
    expect(getRouteMetadata("/orientation").title).toBe("fleshsesh | academy — course orientation");
    expect(getRouteMetadata("/learn").title).toBe("fleshsesh | academy — learning atlas");
  });

  it("uses non-disclosive static titles for private and Arena routes", () => {
    expect(getRouteMetadata("/member").title).toBe("fleshsesh | academy — member workspace");
    expect(getRouteMetadata("/care").title).toBe("fleshsesh | academy — care navigation");
    expect(getRouteMetadata("/campus/esports/readiness").title).toBe("fleshsesh | academy — Arena connector readiness");
    expect(getRouteMetadata("/campus/eclinic").title).toBe("fleshsesh | academy — campus facility");
  });

  it("never derives document metadata from query strings or learner state", () => {
    expect(getRouteMetadata("/learn?course=FSH%20101").title).toBe("fleshsesh | academy");
    expect(getRouteMetadata("/unknown").announcement).toBe("fleshsesh academy");
  });
});
