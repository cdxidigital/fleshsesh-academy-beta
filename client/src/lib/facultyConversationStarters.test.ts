import { describe, expect, it } from "vitest";
import { buildFacultyConversationStarters } from "./facultyConversationStarters";

describe("faculty conversation starters", () => {
  it("creates three bounded, non-personal learning starters for a faculty scope", () => {
    const starters = buildFacultyConversationStarters("Privacy & digital consent");
    expect(starters.map((starter) => starter.id)).toEqual(["overview", "scenario", "source-check"]);
    expect(starters.every((starter) => starter.prompt.includes("personal") || starter.prompt.includes("qualified human professional"))).toBe(true);
    expect(starters.map((starter) => starter.prompt).join(" ")).toContain("Privacy & digital consent");
  });
});
