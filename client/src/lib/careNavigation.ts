export type CareResource = {
  id: "urgent" | "healthdirect" | "sexual-health" | "violence";
  title: string;
  label: string;
  description: string;
  href: string;
  action: string;
  note: string;
};

export const careResources: CareResource[] = [
  {
    id: "urgent",
    title: "Immediate danger or urgent help",
    label: "Emergency services",
    description: "If there is immediate danger or urgent medical help is needed, contact emergency services now.",
    href: "tel:000",
    action: "Call 000",
    note: "Emergency services can respond to urgent police, fire, or ambulance needs.",
  },
  {
    id: "healthdirect",
    title: "Health advice and local services",
    label: "Healthdirect Australia",
    description: "Talk with a registered nurse or use the government-funded service finder for local care options.",
    href: "https://www.healthdirect.gov.au/australian-health-services",
    action: "Open Service Finder",
    note: "Healthdirect offers 24/7 health advice on 1800 022 222.",
  },
  {
    id: "sexual-health",
    title: "Sexual health clinic finder",
    label: "Healthdirect clinic search",
    description: "Find a sexual health clinic by suburb or postcode without sharing your location with the academy.",
    href: "https://www.healthdirect.gov.au/australian-health-services/all-services/sexual-health-clinic/788122004",
    action: "Find a clinic",
    note: "The clinic search opens on Healthdirect’s own website.",
  },
  {
    id: "violence",
    title: "Family, domestic, or sexual violence support",
    label: "1800RESPECT",
    description: "Free 24/7 information, counselling, and support, with online-safety information and a quick-exit resource.",
    href: "https://1800respect.org.au/",
    action: "Open 1800RESPECT",
    note: "If it is unsafe to browse, use 1800RESPECT’s own quick-exit and technology-safety guidance.",
  },
];
