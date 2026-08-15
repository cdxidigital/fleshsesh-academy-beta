export type FacilityId = "eclinic" | "law-library" | "residence-life" | "esports";

export type DeviceConsentState = {
  adultConfirmed: boolean;
  ownerConfirmed: boolean;
  voluntaryConfirmed: boolean;
  privacyConfirmed: boolean;
};

export type TournamentSessionStatus = "idle" | "ready" | "paused" | "stopped" | "disconnected";

export const campusFacilities: Array<{
  id: FacilityId;
  label: string;
  eyebrow: string;
  description: string;
  image: string;
  courseCodes: string[];
  courseLabel: string;
  note: string;
}> = [
  {
    id: "eclinic",
    label: "eClinic",
    eyebrow: "Evidence with warmth",
    description: "A calm education and care-navigation space for health literacy, questions to take to a clinician, and clear pathways for support.",
    image: "/manus-storage/fleshsesh-eclinic-editorial_f01115b8.jpg",
    courseCodes: ["FSH 103", "FSH 105", "FSH 202", "FSH 301"],
    courseLabel: "Health & care navigation",
    note: "Education, not diagnosis. Urgent, clinical, or crisis needs are directed to qualified support.",
  },
  {
    id: "law-library",
    label: "Law Library",
    eyebrow: "Rights, ethics & digital life",
    description: "A dark-academia reading room for consent, privacy, policy, evidence appraisal, and the practical language of agency.",
    image: "/manus-storage/fleshsesh-law-library-editorial_d61126d2.jpg",
    courseCodes: ["FSH 102", "FSH 206", "FSH 304", "FSH 403"],
    courseLabel: "Consent, rights & evidence",
    note: "Explore principles and scenarios without being asked for personal disclosures.",
  },
  {
    id: "residence-life",
    label: "Residence Life",
    eyebrow: "The candid social wing",
    description: "The campus’s most candid social space: a warm, playful setting for relationships, communication, repair, and body-neutral self-knowledge.",
    image: "/manus-storage/fleshsesh-residence-life-editorial_70ee9870.jpg",
    courseCodes: ["FSH 104", "FSH 203", "FSH 204", "FSH 207"],
    courseLabel: "Relationships & communication",
    note: "Playful atmosphere, adult-only boundaries. No explicit material and no pressure to disclose.",
  },
  {
    id: "esports",
    label: "Esports Arena",
    eyebrow: "Play, agency & digital consent",
    description: "A neon-accented arena for games, digital safety, tournament design, and an opt-in personal-device connection framework.",
    image: "/manus-storage/fleshsesh-esports-editorial_7a22e23b.jpg",
    courseCodes: ["FSH 206", "FSH 302", "FSH 403"],
    courseLabel: "Digital safety & adult consent",
    note: "Any future device connection is voluntary, session-only, reversible, and governed by an always-on stop control.",
  },
];

export function canStartDeviceSession(consent: DeviceConsentState): boolean {
  return consent.adultConfirmed && consent.ownerConfirmed && consent.voluntaryConfirmed && consent.privacyConfirmed;
}

export function emergencyStopMessage(hasLiveConnection: boolean): string {
  return hasLiveConnection
    ? "Emergency stop requested. The connection must be stopped and disconnected immediately."
    : "Emergency stop is armed. No personal device is connected in this preview.";
}

export function transitionTournamentSession(
  status: TournamentSessionStatus,
  action: "start" | "pause" | "stop" | "disconnect",
  consentComplete: boolean,
): TournamentSessionStatus {
  if (action === "disconnect") return "disconnected";
  if (action === "stop") return "stopped";
  if (action === "pause" && status === "ready") return "paused";
  if (action === "start" && consentComplete && (status === "idle" || status === "paused" || status === "stopped")) return "ready";
  return status;
}

export function tournamentSessionMessage(status: TournamentSessionStatus): string {
  const messages: Record<TournamentSessionStatus, string> = {
    idle: "Session preview is idle. Complete the four consent statements before beginning a local lobby preview.",
    ready: "Preview session ready. No provider bridge or personal hardware is connected.",
    paused: "Preview session paused. No activity can resume unless the participant chooses to resume the local preview.",
    stopped: "Preview session stopped. The local preview has no active connection.",
    disconnected: "Session disconnected. Pairing data is not retained in this preview.",
  };
  return messages[status];
}
