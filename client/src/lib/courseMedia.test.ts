import { describe, expect, it } from "vitest";
import { courseMediaManifest } from "./courseMedia";

describe("courseMediaManifest", () => {
  it("keeps every supported course media entry asset-complete and transition-only", () => {
    expect(Object.keys(courseMediaManifest)).toEqual(["FSH 101", "FSH 102", "FSH 103", "FSH 104"]);

    for (const [courseCode, media] of Object.entries(courseMediaManifest)) {
      expect(courseCode).toMatch(/^FSH 10[1-4]$/);
      expect(media.video).toMatch(/^\/manus-storage\/.*\.mp4$/);
      expect(media.poster).toMatch(/^\/manus-storage\/.*\.png$/);
      expect(media.walkthroughAudio).toMatch(/^\/manus-storage\/.*\.wav$/);
      expect(media.walkthroughTranscript.length).toBeGreaterThan(180);
      expect(media.walkthroughTranscript).toMatch(/(Nothing|You do not|not personal advice|not asked)/);
      expect(media.title).toMatch(/\.$/);
      expect(media.alt).not.toMatch(/nudity|sexual activity|explicit|body parts/i);
      expect(media.description).toMatch(/No people appear\.$/);
    }
  });
});
