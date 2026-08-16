import { describe, expect, it } from "vitest";
import { lecturers, needsSafetyRedirect, safetyRedirect } from "./lecturer";

describe("lecturer safety routing", () => {
  it("allows ordinary educational prompts through to the lecturer model", () => {
    expect(needsSafetyRedirect("How can I use a respectful check-in in a relationship?")).toBe(false);
  });

  it("routes symptom-related prompts away from AI clinical advice", () => {
    expect(needsSafetyRedirect("I have severe pain and bleeding. What does it mean?")).toBe(true);
    expect(safetyRedirect("I have severe pain and bleeding.")).toContain("can’t diagnose symptoms");
  });

  it("keeps faculty scopes explicit and offers guided prompts", () => {
    expect(lecturers.mira.scope).toContain("STI prevention");
    expect(lecturers.alex.suggestedPrompts).toHaveLength(3);
    expect(Object.keys(lecturers)).toHaveLength(10);
    expect(lecturers.niko.scope).toContain("non-explicit");
    expect(lecturers.aria.scope).toContain("Does not access accounts");
  });
});
