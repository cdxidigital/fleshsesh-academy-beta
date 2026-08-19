export type CourseTransitionMedia = {
  video: string;
  poster: string;
  audio: string;
  title: string;
  alt: string;
  description: string;
};

export const courseMediaManifest: Readonly<Record<string, CourseTransitionMedia>> = {
  "FSH 101": {
    video: "/manus-storage/fleshsesh-body-literacy-first-mission-arrival_cb0255f6.mp4",
    poster: "/manus-storage/fleshsesh-body-literacy-media-reference_876f5fc1.png",
    audio: "/manus-storage/fleshsesh-body-literacy-focus-ambient_dd164cba.mp3",
    title: "Arrive with the idea.",
    alt: "A dark-teal adult-learning desk with closed reference materials, textured paper, a gold bookmark, and warm lamplight.",
    description: "A warm lamp illuminates a dark-teal study desk with closed neutral reference books, textured paper, and a gold bookmark as the camera slowly moves closer. No people appear.",
  },
  "FSH 102": {
    video: "/manus-storage/fleshsesh-consent-first-mission-arrival_b11534f9.mp4",
    poster: "/manus-storage/fleshsesh-consent-media-reference_04deb87d.png",
    audio: "/manus-storage/fleshsesh-consent-focus-ambient_01690600.mp3",
    title: "Make room to listen.",
    alt: "A dark-teal seminar table with two empty chairs, an unopened notebook, gold pen, coral divider card, and warm lamplight.",
    description: "A warm-lit dark-teal seminar table holds an unopened notebook, gold pen, and blush divider card between two empty chairs as the camera slowly moves across the space. No people appear.",
  },
  "FSH 103": {
    video: "/manus-storage/fleshsesh-sexual-health-first-mission-transition_4151d0d3.mp4",
    poster: "/manus-storage/fleshsesh-sexual-health-media-reference_4af9199d.png",
    audio: "/manus-storage/fleshsesh-sexual-health-focus-ambient_526d2261.mp3",
    title: "Take a quiet pause.",
    alt: "A dark-teal wellbeing study counter with a folded linen towel, ceramic bowl, closed reference book, gold clasp, coral glass object, and warm light.",
    description: "Warm light moves across a dark-teal wellbeing study counter with folded linen, a ceramic bowl, a closed reference book, and a gold clasp as the camera glides slowly forward. No people appear.",
  },
  "FSH 104": {
    video: "/manus-storage/fleshsesh-relationships-first-mission-transition_3de26372.mp4",
    poster: "/manus-storage/fleshsesh-relationships-media-reference_bc62d022.png",
    audio: "/manus-storage/fleshsesh-relationships-focus-ambient_30927c5e.mp3",
    title: "Leave room for respect.",
    alt: "A dark-teal shared study table with two empty chairs, closed notebooks, a gold paperclip, coral ribbon bookmark, and warm lamp light.",
    description: "A warm lamp softly illuminates a dark-teal shared study table with two empty chairs, closed notebooks, a gold paperclip, and coral ribbon as the camera glides around the table corner. No people appear.",
  },
};
