export type AcademySubscriptionId = "free" | "plus" | "pro" | "professional";

export const academySubscriptions = {
  free: {
    id: "free" as const,
    name: "Free",
    priceCentsMonthly: 0,
    priceCentsAnnual: 0,
    description: "Explore the academy and start learning without a subscription.",
    features: ["Selected introductory lessons", "First Look learning missions", "Sample quizzes and scenarios", "Public resources and support directory"],
  },
  plus: {
    id: "plus" as const,
    name: "plus",
    priceCentsMonthly: 900,
    priceCentsAnnual: 9000,
    description: "The affordable everyday learning plan.",
    features: ["Full 101 Foundations library", "Full 201 Everyday Practice library", "Learner progress and achievements", "XP, badges and learning streaks", "AI faculty access", "New introductory content as released"],
  },
  pro: {
    id: "pro" as const,
    name: "pro",
    priceCentsMonthly: 1500,
    priceCentsAnnual: 15000,
    description: "The complete self-directed academy experience.",
    features: ["Everything in plus", "Full 301 Deeper Study library", "Advanced scenarios and assessments", "Certificates of completion", "Expanded AI faculty access", "Early access to new courses"],
  },
  professional: {
    id: "professional" as const,
    name: "professional",
    priceCentsMonthly: 2500,
    priceCentsAnnual: 25000,
    description: "Advanced learning for educators, advocates and practitioners.",
    features: ["Everything in pro", "Full 401 Advanced Portfolio library", "Capstone learning pathway", "Educator and advocate resources", "Advanced portfolio tools", "Professional development library"],
  },
} as const;

export const academyPricing = {
  free: academySubscriptions.free,
  subscriptions: [academySubscriptions.plus, academySubscriptions.pro, academySubscriptions.professional],
  billing: { monthlyLabel: "Monthly", annualLabel: "Annual", annualSavingsLabel: "2 months free" },
} as const;

export function getAcademySubscription(id: AcademySubscriptionId) {
  return academySubscriptions[id];
}

export function formatAcademyPrice(priceCents: number) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(priceCents / 100);
}
