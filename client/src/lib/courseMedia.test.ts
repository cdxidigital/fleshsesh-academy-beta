import { describe, expect, it } from "vitest";
import { courseMediaManifest } from "./courseMedia";

describe("courseMediaManifest", () => {
  it("keeps every supported course media entry asset-complete and transition-only", () => {
    expect(Object.keys(courseMediaManifest)).toEqual(["FSH 101", "FSH 102", "FSH 103", "FSH 104", "FSH 105", "FSH 201", "FSH 202", "FSH 203", "FSH 204", "FSH 205", "FSH 206", "FSH 207", "FSH 301", "FSH 302", "FSH 303", "FSH 304", "FSH 305", "FSH 401", "FSH 402", "FSH 403", "FSH 404"]);

    for (const [courseCode, media] of Object.entries(courseMediaManifest)) {
      expect(courseCode).toMatch(/^FSH (10[1-5]|20[1-7]|30[1-5]|40[1-4])$/);
      expect(media.video).toMatch(/^\/manus-storage\/.*\.mp4$/);
      expect(media.poster).toMatch(/^\/manus-storage\/.*\.png$/);
      expect(media.walkthroughAudio).toMatch(/^\/manus-storage\/.*\.mp3$/);
      expect(media.walkthroughTranscript.length).toBeGreaterThan(180);
      expect(media.walkthroughTranscript).toMatch(/(Nothing|nothing is saved|not requested or saved|is requested or saved|aren’t requested or saved|answer saved|You do not|not personal advice|not asked)/i);
      expect(media.title).toMatch(/\.$/);
      expect(media.alt).not.toMatch(/nudity|sexual activity|explicit|body parts/i);
      expect(media.description).toMatch(/No people appear\.$/);
    }
  });
});
