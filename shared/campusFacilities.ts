export type FacilityId = "eclinic" | "law-library" | "residence-life" | "esports";

export type DeviceConsentState = {
  adultConfirmed: boolean;
  ownerConfirmed: boolean;
  voluntaryConfirmed: boolean;
  privacyConfirmed: boolean;
};

export type TournamentSessionStatus = "idle" | "ready" | "paused" | "stopped" | "disconnected";

export type FacilityRoom = {
  studioName: string;
  studioIntroduction: string;
  learningModes: Array<{ title: string; copy: string }>;
  faculty: { name: string; role: string; handoff: string; prompt: string };
  reflectionPrompts: string[];
};

export const campusFacilities: Array<{
  id: FacilityId;
  label: string;
  eyebrow: string;
  description: string;
  image: string;
  courseCodes: string[];
  courseLabel: string;
  note: string;
  room: FacilityRoom;
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
    room: {
      studioName: "The Evidence Desk",
      studioIntroduction: "A calm, self-paced briefing room for turning credible information into questions you can take to an appropriate professional. Nothing here replaces care or asks for your history.",
      learningModes: [
        { title: "Source check", copy: "Compare the evidence signals that make an education source worth trusting." },
        { title: "Question builder", copy: "Turn a general learning point into a clear, non-diagnostic question for a clinician or service." },
        { title: "Care map", copy: "Recognise when education ends and qualified, local support should take over." },
      ],
      faculty: { name: "Dr. Mira Sen", role: "Clinical Professor", handoff: "Offers anatomy, health-literacy, and evidence-checking guidance with explicit clinical boundaries.", prompt: "How should I assess health information online?" },
      reflectionPrompts: ["What makes a source feel credible?", "What question would clarify the next learning step?", "Where does education end and professional care begin?"],
    },
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
    room: {
      studioName: "The Consent Reading Room",
      studioIntroduction: "A quiet, dark-academia study room for practising the language of agency, privacy, and evidence. Scenarios stay general; no personal disclosure is required.",
      learningModes: [
        { title: "Case notes", copy: "Read general situations through consent, rights, and boundary-setting principles." },
        { title: "Evidence lens", copy: "Distinguish policy claims, lived experience, and robust supporting evidence." },
        { title: "Language lab", copy: "Rehearse clear, respectful phrases for opting in, pausing, or changing a mind." },
      ],
      faculty: { name: "Professor Linh Patel", role: "Assessment Coach", handoff: "Helps learners appraise evidence and structure practical, non-disclosive reflections.", prompt: "What makes a reflection task useful without personal disclosure?" },
      reflectionPrompts: ["Which detail changes the ethical question?", "What information would strengthen this claim?", "How could a boundary be expressed more clearly?"],
    },
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
    room: {
      studioName: "The Common Room",
      studioIntroduction: "The warm social wing holds low-stakes practice for communication, repair, and body-neutral self-knowledge. Its tone is candid, never explicit, and always optional.",
      learningModes: [
        { title: "Conversation rehearsal", copy: "Explore plain-language check-ins, requests, and responses to a changed mind." },
        { title: "Repair table", copy: "Study the building blocks of respectful repair without re-living a personal conflict." },
        { title: "Belonging notes", copy: "Consider how inclusion, access, and body-neutral language shape a shared space." },
      ],
      faculty: { name: "Amara Williams", role: "Relationship Systems Lecturer", handoff: "Guides reflective, inclusive learning about dynamics, repair, and clear expectations.", prompt: "What does respectful repair after a misunderstanding involve?" },
      reflectionPrompts: ["What makes a check-in feel non-pressured?", "Which part of repair can be made more specific?", "What does inclusion look like in this exchange?"],
    },
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
    room: {
      studioName: "The Arena Control Deck",
      studioIntroduction: "A neon study deck for digital consent, privacy, and game culture. Any future personal-device integration remains separate, opt-in, reversible, and inactive here.",
      learningModes: [
        { title: "Privacy loadout", copy: "Identify the decisions that reduce exposure before a digital interaction begins." },
        { title: "Consent protocol", copy: "Work through clear opt-in, pause, stop, and disconnect expectations for shared play." },
        { title: "Response drill", copy: "Build a general, non-personal incident-response plan for a changing situation." },
      ],
      faculty: { name: "Sam Chen", role: "Digital Safety Lecturer", handoff: "Teaches practical privacy, consent, and general incident-response planning without requesting private details.", prompt: "What are the principles of digital consent?" },
      reflectionPrompts: ["What makes an opt-in meaningful?", "Where should pause and stop controls be visible?", "What data does a system truly need to retain?"],
    },
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
