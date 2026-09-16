export type AcademySubscriptionId = "free" | "plus" | "pro" | "professional";

export type AcademyAddOnId =
  | "ai-boost-50"
  | "ai-boost-150"
  | "ai-boost-500"
  | "certificate"
  | "deep-dive-pack"
  | "relationship-toolkit"
  | "expert-group-session"
  | "expert-portfolio-review"
  | "pro-pass-30";

/**
 * Academy pricing is deliberately low-friction on the core education and
 * monetises optional convenience, depth and premium human/AI services.
 * Essential sexual-health information should never be paywalled behind a
 * microtransaction.
 */
export const academySubscriptions = {
  free: {
    id: "free" as const,
    name: "Free",
    priceCentsMonthly: 0,
    priceCentsAnnual: 0,
    includedAiCreditsMonthly: 5,
    description: "Explore the academy and start learning without a subscription.",
    features: [
      "Selected introductory lessons",
      "First Look learning missions",
      "Sample quizzes and scenarios",
      "Public resources and support directory",
      "5 AI faculty credits each month",
    ],
  },
  plus: {
    id: "plus" as const,
    name: "plus",
    priceCentsMonthly: 899,
    priceCentsAnnual: 8990,
    includedAiCreditsMonthly: 50,
    description: "The affordable everyday learning plan.",
    features: [
      "Full 101 Foundations library",
      "Full 201 Everyday Practice library",
      "Learner progress and achievements",
      "XP, badges and learning streaks",
      "50 AI faculty credits each month",
      "New introductory content as released",
    ],
  },
  pro: {
    id: "pro" as const,
    name: "pro",
    priceCentsMonthly: 1699,
    priceCentsAnnual: 16990,
    includedAiCreditsMonthly: 150,
    description: "The complete self-directed academy experience.",
    features: [
      "Everything in plus",
      "Full 301 Deeper Study library",
      "Advanced scenarios and assessments",
      "Certificates of completion",
      "150 AI faculty credits each month",
      "Early access to new courses",
    ],
  },
  professional: {
    id: "professional" as const,
    name: "professional",
    priceCentsMonthly: 2999,
    priceCentsAnnual: 29990,
    includedAiCreditsMonthly: 500,
    description: "Advanced learning for educators, advocates and practitioners.",
    features: [
      "Everything in pro",
      "Full 401 Advanced Portfolio library",
      "Capstone learning pathway",
      "Educator and advocate resources",
      "Advanced portfolio tools",
      "500 AI faculty credits each month",
      "Professional development library",
    ],
  },
} as const;

export const academyAddOns = {
  "ai-boost-50": {
    id: "ai-boost-50" as const,
    name: "AI Boost 50",
    priceCents: 499,
    type: "credits" as const,
    credits: 50,
    description: "50 additional AI faculty credits. Credits are for optional AI interactions, not access to essential health information.",
  },
  "ai-boost-150": {
    id: "ai-boost-150" as const,
    name: "AI Boost 150",
    priceCents: 999,
    type: "credits" as const,
    credits: 150,
    description: "150 additional AI faculty credits for deeper study and practice.",
  },
  "ai-boost-500": {
    id: "ai-boost-500" as const,
    name: "AI Boost 500",
    priceCents: 2499,
    type: "credits" as const,
    credits: 500,
    description: "500 additional AI faculty credits for intensive learning.",
  },
  certificate: {
    id: "certificate" as const,
    name: "Verified Certificate",
    priceCents: 799,
    type: "credential" as const,
    description: "A downloadable, shareable verified certificate for eligible completed learning. Included with pro and professional.",
  },
  "deep-dive-pack": {
    id: "deep-dive-pack" as const,
    name: "Deep Dive Pack",
    priceCents: 699,
    type: "content" as const,
    description: "A focused standalone learning pack with advanced scenarios, worksheets and assessment practice.",
  },
  "relationship-toolkit": {
    id: "relationship-toolkit" as const,
    name: "Relationship Toolkit",
    priceCents: 499,
    type: "download" as const,
    description: "Printable and digital conversation prompts, boundary worksheets and reflection tools.",
  },
  "expert-group-session": {
    id: "expert-group-session" as const,
    name: "Expert Group Session",
    priceCents: 1999,
    type: "live" as const,
    description: "A scheduled small-group session with an appropriately qualified educator or practitioner.",
  },
  "expert-portfolio-review": {
    id: "expert-portfolio-review" as const,
    name: "Expert Portfolio Review",
    priceCents: 4999,
    type: "service" as const,
    description: "A human review of an eligible professional learning portfolio with structured feedback.",
  },
  "pro-pass-30": {
    id: "pro-pass-30" as const,
    name: "pro 30-day Pass",
    priceCents: 799,
    type: "upgrade" as const,
    description: "Try the full pro library for 30 days without committing to a recurring subscription.",
  },
} as const;

export const academyPricing = {
  free: academySubscriptions.free,
  subscriptions: [
    academySubscriptions.plus,
    academySubscriptions.pro,
    academySubscriptions.professional,
  ],
  addOns: Object.values(academyAddOns),
  billing: {
    monthlyLabel: "Monthly",
    annualLabel: "Annual",
    annualSavingsLabel: "2 months free",
  },
  principles: {
    coreEducationAlwaysAccessible: true,
    noPayPerAnswerForEssentialHealthInfo: true,
    optionalMicrotransactionFocus: ["AI usage", "depth", "credentials", "downloads", "live expertise"],
  },
} as const;

export function getAcademySubscription(id: AcademySubscriptionId) {
  return academySubscriptions[id];
}

export function getAcademyAddOn(id: AcademyAddOnId) {
  return academyAddOns[id];
}

export function formatAcademyPrice(priceCents: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(priceCents / 100);
}
