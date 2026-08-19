export type FacilityId = "classroom" | "student-services" | "auditorium";

export type DeviceConsentState = {
  adultConfirmed: boolean;
  ownerConfirmed: boolean;
  voluntaryConfirmed: boolean;
  privacyConfirmed: boolean;
};

export type TournamentSessionStatus = "idle" | "ready" | "paused" | "stopped" | "disconnected";

type GuideId = "mira" | "linh" | "amara" | "sam" | "aria";

export type FacilityRoom = {
  studioName: string;
  studioIntroduction: string;
  learningModes: Array<{ title: string; copy: string }>;
  faculty: { id: GuideId; name: string; role: string; handoff: string; prompt: string };
  reflectionPrompts: string[];
};

export type CampusPlace = {
  id: FacilityId;
  label: string;
  eyebrow: string;
  description: string;
  image: string;
  courseCodes: string[];
  courseLabel: string;
  note: string;
  pathway: { step: string; when: string; action: string; next: FacilityId | "atlas" | "care" };
  room: FacilityRoom;
};

export const campusFacilities: CampusPlace[] = [
  {
    id: "classroom",
    label: "Classroom",
    eyebrow: "Start here",
    description: "The only place a new learner needs to understand: one five-minute mission, one idea, one action, and one clear next step.",
    image: "/manus-storage/fleshsesh-eclinic-editorial_f01115b8.jpg",
    courseCodes: ["FSH 101", "FSH 102", "FSH 103", "FSH 104", "FSH 105"],
    courseLabel: "Foundation missions",
    note: "Begin with a single mission. There is no personal disclosure, streak pressure, or need to choose a full pathway first.",
    pathway: { step: "01", when: "When you are ready to begin", action: "Start one five-minute mission", next: "student-services" },
    room: {
      studioName: "One clear step",
      studioIntroduction: "The Classroom turns a large topic into a short mission. See the essential idea, try a general scenario, ask your tutor if needed, then decide what comes next.",
      learningModes: [
        { title: "See", copy: "Start with the one essential idea, in plain language and without a wall of text." },
        { title: "Try", copy: "Make one choice in a general scenario; no personal experience is requested." },
        { title: "Next", copy: "Continue, pause, or ask for a simple explanation before you move on." },
      ],
      faculty: { id: "mira", name: "Dr. Mira Sen", role: "AI Tutor", handoff: "Explains general educational concepts simply and identifies when qualified support should take over.", prompt: "Explain this mission simply." },
      reflectionPrompts: ["What is the one idea to remember?", "What would I like explained more simply?", "Do I want to continue or pause?"],
    },
  },
  {
    id: "student-services",
    label: "Student Services",
    eyebrow: "Only when you need it",
    description: "Background support for finding a next unit, understanding how the eCampus works, or opening a public care-support route—without sharing a personal story.",
    image: "/manus-storage/fleshsesh-residence-life-editorial_70ee9870.jpg",
    courseCodes: ["FSH 201", "FSH 202", "FSH 203", "FSH 204", "FSH 205", "FSH 206", "FSH 207"],
    courseLabel: "Applied missions & support navigation",
    note: "Student Services provides general orientation only. It cannot access your account, payment, enrolment, identity, or personal history.",
    pathway: { step: "02", when: "When the next step is not obvious", action: "Ask for a simple next-step map", next: "auditorium" },
    room: {
      studioName: "Next-step help",
      studioIntroduction: "Use this room only when you need practical eCampus orientation, a general learning route, or a handoff to public care navigation.",
      learningModes: [
        { title: "Choose", copy: "Find a general next unit without building a profile." },
        { title: "Understand", copy: "Get plain-language information about one-time enrolment and learning tools." },
        { title: "Support", copy: "Open public care navigation when education should hand over to an external service." },
      ],
      faculty: { id: "aria", name: "Aria Lane", role: "AI Student Services Guide", handoff: "Provides general orientation only and cannot access accounts, payments, enrolments, identity, or personal records.", prompt: "What is my simplest next step?" },
      reflectionPrompts: ["Do I need a next unit or a pause?", "What eCampus question can be answered generally?", "When should I open a support service instead?"],
    },
  },
  {
    id: "auditorium",
    label: "Auditorium",
    eyebrow: "Optional deeper context",
    description: "A background space for special guests, wider perspectives, evidence, digital life, and deeper study after the basics make sense.",
    image: "/manus-storage/fleshsesh-law-library-editorial_d61126d2.jpg",
    courseCodes: ["FSH 301", "FSH 302", "FSH 303", "FSH 304", "FSH 305", "FSH 401", "FSH 402", "FSH 403", "FSH 404"],
    courseLabel: "Deeper-study missions & special guests",
    note: "The Auditorium is optional. It offers perspective and depth, never professional authority, diagnosis, or a credential claim.",
    pathway: { step: "03", when: "When you want more depth or another perspective", action: "Choose one deeper mission or guest viewpoint", next: "atlas" },
    room: {
      studioName: "The perspective stage",
      studioIntroduction: "The Auditorium holds special perspectives and deeper study for learners who want it. You can always return to a shorter Classroom mission.",
      learningModes: [
        { title: "Hear", copy: "Take in one evidence-led perspective before reading more." },
        { title: "Compare", copy: "Notice the difference between evidence, interpretation, and a personal value." },
        { title: "Explore", copy: "Choose an advanced mission only when you want more depth." },
      ],
      faculty: { id: "amara", name: "Amara Williams", role: "Special Guest Host", handoff: "Introduces inclusive educational perspectives and directs specialised health, legal, or crisis needs to qualified support.", prompt: "Show me another perspective on this topic." },
      reflectionPrompts: ["What new perspective changes the question?", "What is evidence and what is interpretation?", "Would a simpler mission help before I continue?"],
    },
  },
];

export const campusPathway = campusFacilities.map((place) => ({ id: place.id, label: place.label, ...place.pathway }));

export function canStartDeviceSession(consent: DeviceConsentState): boolean {
  return consent.adultConfirmed && consent.ownerConfirmed && consent.voluntaryConfirmed && consent.privacyConfirmed;
}

export function emergencyStopMessage(hasLiveConnection: boolean): string {
  return hasLiveConnection ? "Emergency stop requested. The connection must be stopped and disconnected immediately." : "Emergency stop is armed. No personal device is connected in this preview.";
}

export function transitionTournamentSession(status: TournamentSessionStatus, action: "start" | "pause" | "stop" | "disconnect", consentComplete: boolean): TournamentSessionStatus {
  if (action === "disconnect") return "disconnected";
  if (action === "stop") return "stopped";
  if (action === "pause" && status === "ready") return "paused";
  if (action === "start" && consentComplete && (status === "idle" || status === "paused" || status === "stopped")) return "ready";
  return status;
}

export function tournamentSessionMessage(status: TournamentSessionStatus): string {
  return {
    idle: "Session preview is idle.",
    ready: "Preview session ready. No provider bridge or personal hardware is connected.",
    paused: "Preview session paused.",
    stopped: "Preview session stopped.",
    disconnected: "Session disconnected. Pairing data is not retained in this preview.",
  }[status];
}
