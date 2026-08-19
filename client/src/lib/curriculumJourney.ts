export type CurriculumLevel = "101" | "201" | "301" | "401";

export type JourneyStage = {
  level: CurriculumLevel;
  shortLabel: string;
  title: string;
  purpose: string;
  capability: string;
  nextStep: string;
};

export const curriculumEndGoal = {
  title: "An evidence-aware learning practice",
  description:
    "Build the language, judgement, and referral awareness to make informed choices, communicate with respect, assess information critically, and know when qualified support is the right next step.",
  boundary:
    "Completing units recognises course learning only. It is not a clinical, legal, professional, regulated, or accredited qualification, and it does not authorise diagnosis, treatment, or practice beyond your competence.",
};

export type CurriculumPathway = {
  id: "personal-learning" | "deeper-study";
  entryLevel: CurriculumLevel;
  label: string;
  title: string;
  description: string;
  boundary: string;
};

export const curriculumPathways: CurriculumPathway[] = [
  {
    id: "personal-learning",
    entryLevel: "101",
    label: "Personal learning path",
    title: "Understand your body, sexuality, and relationships with clarity",
    description:
      "Use 101 foundations and the 201 units that interest you to build a clearer understanding of bodies, sex, sexuality, consent, relationships, digital life, and ways to find qualified support when useful.",
    boundary:
      "This is a complete and valuable outcome in itself. You do not need to continue into 301 or 401 for your learning to matter.",
  },
  {
    id: "deeper-study",
    entryLevel: "301",
    label: "Optional deeper-study path",
    title: "Go deeper into evidence, inclusion, and respectful educational practice",
    description:
      "Continue through 301 and 401 after relevant foundations if you want deeper study of evidence, inclusion, safeguarding, facilitation, design, and evaluation.",
    boundary:
      "This pathway records advanced course learning only. It is not a licence, accreditation, or authority to provide clinical, legal, or regulated services.",
  },
];

export const journeyStages: JourneyStage[] = [
  {
    level: "101",
    shortLabel: "Foundation",
    title: "Name the essentials",
    purpose: "Build a shared vocabulary for bodies, consent, relationships, prevention, and respectful help-seeking.",
    capability: "You can recognise core concepts, challenge shame-based myths, and identify a safe next question or support boundary.",
    nextStep: "Move into 201 when you want to apply this foundation to everyday communication, care navigation, or digital situations.",
  },
  {
    level: "201",
    shortLabel: "Applied practice",
    title: "Use the tools in context",
    purpose: "Turn foundations into clear communication, inclusive reasoning, safer digital habits, and informed service navigation.",
    capability: "You can compare options, use respectful scripts, and plan an appropriate referral or support step without giving individual advice.",
    nextStep: "Move into 301 when you want to connect multiple topics through deeper study of education, ethics, or design.",
  },
  {
    level: "301",
    shortLabel: "Integration",
    title: "Connect evidence, ethics, and action",
    purpose: "Integrate communication, safety, rights, and evidence into more complex learning, facilitation, or design situations.",
    capability: "You can explain a topic in plain language, recognise the limits of your role, and design an inclusive, referral-aware learning response.",
    nextStep: "Move into 401 when you are ready to synthesise your learning through advanced analysis, facilitation, evaluation, or a scoped portfolio.",
  },
  {
    level: "401",
    shortLabel: "Advanced practice",
    title: "Synthesize deeper learning",
    purpose: "Bring evidence, inclusion, safeguarding, evaluation, and referral awareness together in a structured advanced project.",
    capability: "You can produce an ethical, evidence-aware learning artefact with clear escalation and competence boundaries.",
    nextStep: "Use the portfolio as a record of learning and continue to seek supervised, accredited, or professional pathways where they are required.",
  },
];

export function getJourneyStage(level: string): JourneyStage {
  return journeyStages.find((stage) => stage.level === level) ?? journeyStages[0];
}

export function getUnitContribution(level: string): string {
  const stage = getJourneyStage(level);
  return `This unit contributes to ${stage.shortLabel}: ${stage.capability}`;
}
