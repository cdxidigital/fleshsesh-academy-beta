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
    walkthroughAudio: "/manus-storage/fleshsesh-body-literacy-unit-walkthrough_1346b4d1.mp3",
    walkthroughTranscript: "Welcome to Body Literacy. This unit offers a clear, evidence-aware way to approach terminology, variation, and support boundaries. Begin with a five-minute mission on body terminology and variation. Nothing here asks for a personal story or saves a response. Take what is useful, pause whenever you like, and continue to the next mission only if it supports your learning.",
    title: "Arrive with the idea.",
    alt: "A dark-teal adult-learning desk with closed reference materials, textured paper, a gold bookmark, and warm lamplight.",
    description: "A warm lamp illuminates a dark-teal study desk with closed neutral reference books, textured paper, and a gold bookmark as the camera slowly moves closer. No people appear.",
  },
  "FSH 102": {
    video: "/manus-storage/fleshsesh-consent-first-mission-arrival_b11534f9.mp4",
    poster: "/manus-storage/fleshsesh-consent-media-reference_04deb87d.png",
    walkthroughAudio: "/manus-storage/fleshsesh-consent-unit-walkthrough_88253ef0.mp3",
    walkthroughTranscript: "Welcome to Consent, Boundaries and Communication. This unit introduces practical language for respectful conversations, personal boundaries, and everyday choices. Begin with the five-minute mission on consent as an ongoing conversation. You do not need to disclose an experience or submit an answer. Keep the ideas that help, pause when you need to, and choose the next mission only if it feels useful.",
    title: "Make room to listen.",
    alt: "A dark-teal seminar table with two empty chairs, an unopened notebook, gold pen, coral divider card, and warm lamplight.",
    description: "A warm-lit dark-teal seminar table holds an unopened notebook, gold pen, and blush divider card between two empty chairs as the camera slowly moves across the space. No people appear.",
  },
  "FSH 103": {
    video: "/manus-storage/fleshsesh-sexual-health-first-mission-transition_4151d0d3.mp4",
    poster: "/manus-storage/fleshsesh-sexual-health-media-reference_4af9199d.png",
    walkthroughAudio: "/manus-storage/fleshsesh-sexual-health-unit-walkthrough_f610fcc5.mp3",
    walkthroughTranscript: "Welcome to Sexual Health, Hygiene and Self-Care. This unit separates clear preventive-care principles from shame-based myths and points to safe next questions. Begin with the five-minute mission on hygiene myths and body neutrality. It is general education, not personal advice or diagnosis. Nothing is recorded. Take your time, use the support routes if needed, and continue only when the next step is useful.",
    title: "Take a quiet pause.",
    alt: "A dark-teal wellbeing study counter with a folded linen towel, ceramic bowl, closed reference book, gold clasp, coral glass object, and warm light.",
    description: "Warm light moves across a dark-teal wellbeing study counter with folded linen, a ceramic bowl, a closed reference book, and a gold clasp as the camera glides slowly forward. No people appear.",
  },
  "FSH 104": {
    video: "/manus-storage/fleshsesh-relationships-first-mission-transition_3de26372.mp4",
    poster: "/manus-storage/fleshsesh-relationships-media-reference_bc62d022.png",
    walkthroughAudio: "/manus-storage/fleshsesh-relationships-unit-walkthrough_ea102cae.mp3",
    walkthroughTranscript: "Welcome to Relationships, Identity and Respect. This unit explores respectful relationship qualities, diverse identities, and the social expectations that can shape everyday choices. Begin with the five-minute mission on friendship, intimacy, and family. You are not asked to share a personal story or decide anything about yourself. Keep what is helpful, pause freely, and continue only if the next mission supports your learning.",
    title: "Leave room for respect.",
    alt: "A dark-teal shared study table with two empty chairs, closed notebooks, a gold paperclip, coral ribbon bookmark, and warm lamp light.",
    description: "A warm lamp softly illuminates a dark-teal shared study table with two empty chairs, closed notebooks, a gold paperclip, and coral ribbon as the camera glides around the table corner. No people appear.",
  },
  "FSH 105": {
    video: "/manus-storage/fleshsesh-fsh105-first-mission-transition_3502f6bb.mp4",
    poster: "/manus-storage/fleshsesh-fsh105-media-reference_a666589e.png",
    walkthroughAudio: "/manus-storage/fleshsesh-fsh105-unit-walkthrough_84527860.mp3",
    walkthroughTranscript: "In FSH 105, you’ll explore practical prevention layers, testing and treatment principles, ways to reduce stigma, and how to find trusted services. Begin with the first mission, What STIs are, for a clear foundation in respectful, everyday language. You won’t be asked for a personal story or answer, and nothing is saved. When useful, choose to pause or continue at your own pace.",
    title: "Make prevention clearer.",
    alt: "A dark-teal prevention-study desk with a closed health guide, layered cards, gold pen, and warm editorial light.",
    description: "Warm light moves across a dark-teal prevention-study desk with a closed health guide, layered reference cards, and a gold pen. No people appear.",
  },
  "FSH 201": {
    video: "/manus-storage/fleshsesh-fsh201-first-mission-transition_b7bf1535.mp4",
    poster: "/manus-storage/fleshsesh-fsh201-media-reference_62e66a44.png",
    walkthroughAudio: "/manus-storage/fleshsesh-fsh201-unit-walkthrough_9f22d177.mp3",
    walkthroughTranscript: "Welcome to FSH 201 — Contraception and Family Planning. This unit compares broad contraceptive categories and helps you prepare informed questions for a qualified health professional, without offering individual prescribing advice. Begin with the first mission, Pregnancy and fertility basics, to build a clear foundation. You are not asked to share a personal story or provide an answer, and nothing is saved. Pause or continue whenever useful.",
    title: "Make space for options.",
    alt: "A dark-teal planning desk with a closed notebook, neutral option cards, gold pencil, and soft editorial light.",
    description: "Soft light crosses a dark-teal planning desk with a closed notebook, neutral option cards, and a gold pencil arranged for a calm review. No people appear.",
  },
  "FSH 202": {
    video: "/manus-storage/fleshsesh-fsh202-first-mission-transition_808e4d72.mp4",
    poster: "/manus-storage/fleshsesh-fsh202-media-reference_a3c499f4.png",
    walkthroughAudio: "/manus-storage/fleshsesh-fsh202-unit-walkthrough_d480801f.mp3",
    walkthroughTranscript: "Welcome to FSH 202 — STI Testing, Treatment and Care Navigation. This unit will help you build a respectful testing conversation, recognise broad test categories, and consider referral pathways without diagnosing yourself or anyone else. When you’re ready, begin the first mission: Testing pathways. You won’t be asked to share a personal story, and your answers aren’t requested or saved. Take your time, and pause or continue whenever feels useful.",
    title: "Find the next right question.",
    alt: "A dark-teal care-navigation table with a closed referral folder, neutral pathway cards, and warm light.",
    description: "Warm light rests on a dark-teal care-navigation table with a closed referral folder and neutral pathway cards arranged in a simple line. No people appear.",
  },
  "FSH 203": {
    video: "/manus-storage/fleshsesh-fsh203-first-mission-transition_876d7b59.mp4",
    poster: "/manus-storage/fleshsesh-fsh203-media-reference_f238aecc.png",
    walkthroughAudio: "/manus-storage/fleshsesh-fsh203-unit-walkthrough_ed933dd6.mp3",
    walkthroughTranscript: "Welcome to FSH 203 — Pleasure, Intimacy and Sexual Communication. This unit explores how to communicate preferences and limits without entitlement, while recognising that desire can differ across people, relationships and contexts. Begin with the first mission, Pleasure literacy, to build thoughtful language for understanding choice and difference. No personal story or answer is requested or saved. Pause here, or continue when useful.",
    title: "Make room for honest language.",
    alt: "A dark-teal reading nook with two closed notebooks, a coral bookmark, a gold lamp, and warm editorial light.",
    description: "Warm light moves across a dark-teal reading nook with two closed notebooks, a coral bookmark, and a gold lamp as the camera settles into a quiet study pause. No people appear.",
  },
  "FSH 204": {
    video: "/manus-storage/fleshsesh-fsh204-first-mission-transition_4ce2b249.mp4",
    poster: "/manus-storage/fleshsesh-fsh204-media-reference_974483d6.png",
    walkthroughAudio: "/manus-storage/fleshsesh-fsh204-unit-walkthrough_03499bfd.mp3",
    walkthroughTranscript: "In FSH 204, you’ll explore how relationship systems and expectations can shape conflict, communication, and repair. Begin with the first mission, Relationship systems and expectations, and consider the patterns that influence how people respond to one another. You won’t be asked to share a personal story, and no answer is requested or saved. Pause here, or continue when it feels useful.",
    title: "Leave room for repair.",
    alt: "A warm dark-teal shared study table with two closed notebooks, a coral ribbon bookmark, and a gold pen.",
    description: "Soft light moves across a warm dark-teal shared study table with two closed notebooks, a coral ribbon bookmark, and a gold pen as the camera glides toward an open place to pause. No people appear.",
  },
  "FSH 205": {
    video: "/manus-storage/fleshsesh-fsh205-first-mission-transition_8f9ad92b.mp4",
    poster: "/manus-storage/fleshsesh-fsh205-media-reference_eaea9108.png",
    walkthroughAudio: "/manus-storage/fleshsesh-fsh205-unit-walkthrough_62231bb7.mp3",
    walkthroughTranscript: "Welcome to FSH 205 — LGBTQ+ Inclusive Sexual Health. This unit explores respectful language and affirming communication, helping you recognise diverse identities and consider inclusive referral approaches. Begin with the first mission, Language and identity, and reflect at your own pace. You will not be asked to share a personal story, and no answer is requested or saved. Pause or continue whenever useful.",
    title: "Make space for every identity.",
    alt: "A dark-teal study desk with a closed inclusive health guide, layered coral and gold language cards, and warm editorial light.",
    description: "Warm light moves across a dark-teal study desk with a closed inclusive health guide and layered coral and gold language cards arranged for a calm review. No people appear.",
  },
  "FSH 206": {
    video: "/manus-storage/fleshsesh-fsh206-first-mission-transition_70c30cac.mp4",
    poster: "/manus-storage/fleshsesh-fsh206-media-reference_dc660583.png",
    walkthroughAudio: "/manus-storage/fleshsesh-fsh206-unit-walkthrough_692d90b1.mp3",
    walkthroughTranscript: "In FSH 206 — Digital Intimacy, Privacy and Safety, you’ll explore how privacy and consent shape safer digital communication, then develop a practical incident-response plan. Begin with the first mission, Digital consent, and consider the choices that help communication remain respectful and secure. You won’t be asked for, or have any personal story or answer saved. Pause here, or continue when useful.",
    title: "Pause before you share.",
    alt: "A dark-teal desk with a closed laptop, privacy notebook, gold lock-shaped paperclip, and soft coral light.",
    description: "Soft coral light moves across a dark-teal desk with a closed laptop, privacy notebook, and gold lock-shaped paperclip arranged for a quiet digital-safety pause. No people appear.",
  },
  "FSH 207": {
    video: "/manus-storage/fleshsesh-fsh207-first-mission-transition_d7b4ae12.mp4",
    poster: "/manus-storage/fleshsesh-fsh207-media-reference_4aa7592d.png",
    walkthroughAudio: "/manus-storage/fleshsesh-fsh207-unit-walkthrough_02aa3c0e.mp3",
    walkthroughTranscript: "In FSH 207, we’ll explore how sexual wellbeing can support mental health, using respectful, supportive language and recognising when qualified care may be helpful. To begin, open the first mission: Definitions of sexual wellbeing. You won’t be asked to share a personal story or provide an answer, and nothing is requested or saved. Take your time, and pause or continue whenever feels useful.",
    title: "Start with a kinder question.",
    alt: "A softly lit dark-teal reading table with a closed wellbeing journal, coral bookmark, ceramic cup, and gold lamp.",
    description: "A gold lamp creates a calm pool of light on a dark-teal reading table with a closed wellbeing journal, coral bookmark, and ceramic cup. No people appear.",
  },
};
