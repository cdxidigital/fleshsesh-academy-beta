import { describe, expect, it } from "vitest";
import { canStartDeviceSession, emergencyStopMessage, tournamentSessionMessage, transitionTournamentSession } from "@shared/campusFacilities";

describe("campus device-consent boundaries", () => {
  it("does not permit a device session until every consent and privacy acknowledgement is affirmative", () => {
    expect(canStartDeviceSession({ adultConfirmed: true, ownerConfirmed: true, voluntaryConfirmed: true, privacyConfirmed: false })).toBe(false);
    expect(canStartDeviceSession({ adultConfirmed: true, ownerConfirmed: true, voluntaryConfirmed: true, privacyConfirmed: true })).toBe(true);
  });

  it("keeps an emergency-stop boundary explicit whether or not a connector is live", () => {
    expect(emergencyStopMessage(false)).toContain("No personal device is connected");
    expect(emergencyStopMessage(true)).toContain("stopped and disconnected immediately");
  });

  it("gates a lobby preview behind complete consent and allows stop or disconnect from every state", () => {
    expect(transitionTournamentSession("idle", "start", false)).toBe("idle");
    expect(transitionTournamentSession("idle", "start", true)).toBe("ready");
    expect(transitionTournamentSession("ready", "pause", true)).toBe("paused");
    expect(transitionTournamentSession("paused", "stop", true)).toBe("stopped");
    expect(transitionTournamentSession("ready", "disconnect", true)).toBe("disconnected");
    expect(tournamentSessionMessage("disconnected")).toContain("not retained");
  });
});
