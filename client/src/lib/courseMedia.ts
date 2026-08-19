export type CourseTransitionMedia = {
  video: string;
  poster: string;
  walkthroughAudio: string;
  walkthroughTranscript: string;
  title: string;
  alt: string;
  description: string;
};

export const courseMediaManifest: Readonly<Record<string, CourseTransitionMedia>> = {
  "FSH 101": {
    video: "/manus-storage/fleshsesh-body-literacy-first-mission-arrival_cb0255f6.mp4",
    poster: "/manus-storage/fleshsesh-body-literacy-media-reference_876f5fc1.png",
    walkthroughAudio: "/manus-storage/fleshsesh-body-literacy-unit-walkthrough_e58e1325.wav",
    walkthroughTranscript: "Welcome to Body Literacy. This unit offers a clear, evidence-aware way to approach terminology, variation, and support boundaries. Begin with a five-minute mission on body terminology and variation. Nothing here asks for a personal story or saves a response. Take what is useful, pause whenever you like, and continue to the next mission only if it supports your learning.",
    title: "Arrive with the idea.",
    alt: "A dark-teal adult-learning desk with closed reference materials, textured paper, a gold bookmark, and warm lamplight.",
    description: "A warm lamp illuminates a dark-teal study desk with closed neutral reference books, textured paper, and a gold bookmark as the camera slowly moves closer. No people appear.",
  },
  "FSH 102": {
    video: "/manus-storage/fleshsesh-consent-first-mission-arrival_b11534f9.mp4",
    poster: "/manus-storage/fleshsesh-consent-media-reference_04deb87d.png",
    walkthroughAudio: "/manus-storage/fleshsesh-consent-unit-walkthrough_52a20ce3.wav",
    walkthroughTranscript: "Welcome to Consent, Boundaries and Communication. This unit introduces practical language for respectful conversations, personal boundaries, and everyday choices. Begin with the five-minute mission on consent as an ongoing conversation. You do not need to disclose an experience or submit an answer. Keep the ideas that help, pause when you need to, and choose the next mission only if it feels useful.",
    title: "Make room to listen.",
    alt: "A dark-teal seminar table with two empty chairs, an unopened notebook, gold pen, coral divider card, and warm lamplight.",
    description: "A warm-lit dark-teal seminar table holds an unopened notebook, gold pen, and blush divider card between two empty chairs as the camera slowly moves across the space. No people appear.",
  },
  "FSH 103": {
    video: "/manus-storage/fleshsesh-sexual-health-first-mission-transition_4151d0d3.mp4",
    poster: "/manus-storage/fleshsesh-sexual-health-media-reference_4af9199d.png",
    walkthroughAudio: "/manus-storage/fleshsesh-sexual-health-unit-walkthrough_cbb6119c.wav",
    walkthroughTranscript: "Welcome to Sexual Health, Hygiene and Self-Care. This unit separates clear preventive-care principles from shame-based myths and points to safe next questions. Begin with the five-minute mission on hygiene myths and body neutrality. It is general education, not personal advice or diagnosis. Nothing is recorded. Take your time, use the support routes if needed, and continue only when the next step is useful.",
    title: "Take a quiet pause.",
    alt: "A dark-teal wellbeing study counter with a folded linen towel, ceramic bowl, closed reference book, gold clasp, coral glass object, and warm light.",
    description: "Warm light moves across a dark-teal wellbeing study counter with folded linen, a ceramic bowl, a closed reference book, and a gold clasp as the camera glides slowly forward. No people appear.",
  },
  "FSH 104": {
    video: "/manus-storage/fleshsesh-relationships-first-mission-transition_3de26372.mp4",
    poster: "/manus-storage/fleshsesh-relationships-media-reference_bc62d022.png",
    walkthroughAudio: "/manus-storage/fleshsesh-relationships-unit-walkthrough_8bdc0c79.wav",
    walkthroughTranscript: "Welcome to Relationships, Identity and Respect. This unit explores respectful relationship qualities, diverse identities, and the social expectations that can shape everyday choices. Begin with the five-minute mission on friendship, intimacy, and family. You are not asked to share a personal story or decide anything about yourself. Keep what is helpful, pause freely, and continue only if the next mission supports your learning.",
    title: "Leave room for respect.",
    alt: "A dark-teal shared study table with two empty chairs, closed notebooks, a gold paperclip, coral ribbon bookmark, and warm lamp light.",
    description: "A warm lamp softly illuminates a dark-teal shared study table with two empty chairs, closed notebooks, a gold paperclip, and coral ribbon as the camera glides around the table corner. No people appear.",
  },
};
