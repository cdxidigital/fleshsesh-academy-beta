export const deviceConnectorReadiness = {
  mode: "non_live_reference" as const,
  permitted: ["consent education", "privacy education", "session-boundary rehearsal", "emergency-stop rehearsal"] as const,
  prohibited: ["device discovery", "pairing", "provider authentication", "telemetry collection", "device control", "remote commands"] as const,
  retention: "No device identifier, pairing token, session telemetry, or intimate activity data is stored by this reference.",
  stopBoundary: "An emergency stop must be visible before any future connector can be offered; this reference cannot send a stop command because it has no live connection.",
};

export function isNonLiveConnectorReferenceSafe() {
  return deviceConnectorReadiness.mode === "non_live_reference"
    && deviceConnectorReadiness.prohibited.includes("device discovery")
    && deviceConnectorReadiness.prohibited.includes("pairing")
    && deviceConnectorReadiness.prohibited.includes("telemetry collection")
    && deviceConnectorReadiness.prohibited.includes("device control");
}
