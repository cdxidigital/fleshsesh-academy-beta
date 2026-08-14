import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { AIChatBox, type Message as LecturerMessage } from "@/components/AIChatBox";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  BookOpen,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Compass,
  Eye,
  FileText,
  GraduationCap,
  HeartHandshake,
  Menu,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

/**
 * Rose Lacquer Learning House — a private, adult-learning stage with editorial asymmetry,
 * obsidian space, lacquer-rose actions, and champagne-gold academic indexing.
 */

const emblem = "/manus-storage/fleshsesh-academy-emblem_79c8c72e.png";
const wordmark = "/manus-storage/fleshsesh-academy-wordmark_f79fa930.png";
const academyFilm = "/manus-storage/fleshsesh-academy-ambient-film_52e77d54.mp4";
const ageStorageKey = "fleshsesh_academy_age_confirmed_v2";
const ageStorageDateKey = "fleshsesh_academy_age_confirmed_at";

const pathways = [
  { code: "01", title: "Body literacy", course: "FSH 101", hours: "12 hrs", copy: "Foundational anatomy, variation, life stages and help-seeking literacy.", accent: "from-[#b54464] via-[#ec779b] to-[#f5d9cb]", tag: "Foundations" },
  { code: "02", title: "Consent & boundaries", course: "FSH 102", hours: "10 hrs", copy: "Build language for requests, uncertainty, changing minds and respectful repair.", accent: "from-[#dfb56b] via-[#f3d39e] to-[#c05d6e]", tag: "Essential" },
  { code: "03", title: "Intimacy & communication", course: "FSH 203", hours: "12 hrs", copy: "Pleasure literacy, self-compassion and communication without pressure or entitlement.", accent: "from-[#7c2740] via-[#e46891] to-[#f1a9af]", tag: "Applied" },
  { code: "04", title: "Digital safety", course: "FSH 206", hours: "10 hrs", copy: "Digital consent, privacy, incident response and practical online boundaries.", accent: "from-[#1e1a24] via-[#91536a] to-[#e7c487]", tag: "Applied" },
];

const curriculumLevels = {
  "101": {
    label: "Foundation",
    purpose: "Accurate vocabulary, body literacy, consent literacy and help-seeking confidence.",
    outcome: "By completion, learners can explain core concepts in plain language, recognise reliable information and know when professional support is appropriate.",
    courses: [
      { code: "FSH 101", title: "Body Literacy", hours: "12 hrs", note: "Anatomy, variation, life stages and support boundaries." },
      { code: "FSH 102", title: "Consent, Boundaries & Communication", hours: "10 hrs", note: "Clear requests, changing minds, capacity and respectful repair." },
      { code: "FSH 103", title: "Sexual Health, Hygiene & Self-Care", hours: "8 hrs", note: "Preventive care, body-neutral hygiene and when to seek support." },
      { code: "FSH 104", title: "Relationships, Identity & Respect", hours: "9 hrs", note: "Diverse relationships, inclusion, reciprocity and media literacy." },
      { code: "FSH 105", title: "STI & HIV Prevention Essentials", hours: "10 hrs", note: "Prevention layers, testing literacy, stigma reduction and service navigation." },
    ],
  },
  "201": {
    label: "Applied practice",
    purpose: "Communication, prevention, relationship and digital-safety skills for real-world decisions.",
    outcome: "By completion, learners can apply concepts to realistic scenarios, rehearse respectful communication and compare safer, informed options.",
    courses: [
      { code: "FSH 201", title: "Contraception & Family Planning", hours: "14 hrs", note: "Method categories, access, questions for clinicians and life planning." },
      { code: "FSH 202", title: "STI Testing, Treatment & Care Navigation", hours: "12 hrs", note: "Testing pathways, care navigation and partner communication principles." },
      { code: "FSH 203", title: "Pleasure, Intimacy & Sexual Communication", hours: "12 hrs", note: "Desire diversity, non-pressured intimacy and inclusive conversation." },
      { code: "FSH 204", title: "Relationship Dynamics & Conflict Repair", hours: "12 hrs", note: "Listening, repair, autonomy and recognition of coercive control." },
      { code: "FSH 205", title: "LGBTQ+ Inclusive Sexual Health", hours: "11 hrs", note: "Affirming language, access and inclusive service design." },
      { code: "FSH 206", title: "Digital Intimacy, Privacy & Safety", hours: "10 hrs", note: "Digital consent, image-based harm, scams and incident response." },
      { code: "FSH 207", title: "Sexual Wellness & Mental Health", hours: "11 hrs", note: "Body image, stress, trauma-aware communication and care pathways." },
    ],
  },
  "301": {
    label: "Integration",
    purpose: "Complex case analysis, inclusion, facilitation and health-system navigation.",
    outcome: "By completion, learners can analyse complex cases, design bounded support responses and navigate inclusion, power and referral considerations.",
    courses: [
      { code: "FSH 301", title: "Reproductive Health, Fertility & Life Planning", hours: "14 hrs", note: "Fertility variation, life planning and clinical-referral boundaries." },
      { code: "FSH 302", title: "Kink Education, Negotiation & Safety", hours: "14 hrs", note: "Adult-only, non-explicit consent, SSC/RACK and risk literacy." },
      { code: "FSH 303", title: "Communication for Educators & Advocates", hours: "16 hrs", note: "Plain-language evidence, facilitation and referral awareness." },
      { code: "FSH 304", title: "Sexual Rights, Ethics, Power & Social Context", hours: "13 hrs", note: "Rights, privacy, AI ethics, institutional power and advocacy." },
      { code: "FSH 305", title: "Inclusive Service & Curriculum Design", hours: "15 hrs", note: "Needs analysis, universal design and safeguarded course building." },
    ],
  },
  "401": {
    label: "Advanced practice",
    purpose: "Leadership, curriculum design, advocacy, evaluation and supervised capstone work.",
    outcome: "By completion, learners can create evidence-informed educational or advocacy outputs while demonstrating ethical leadership and safeguarding awareness.",
    courses: [
      { code: "FSH 401", title: "Advanced Advocacy & Community Practice", hours: "18 hrs", note: "Community assessment, ethical partnerships and evaluation." },
      { code: "FSH 402", title: "Advanced Consent & Relationship Facilitation", hours: "16 hrs", note: "Complex conversations, survivor-centred referral and supervised facilitation." },
      { code: "FSH 403", title: "Evidence, Evaluation & AI in Sexual Education", hours: "18 hrs", note: "Evidence appraisal, AI bias, learner analytics and update governance." },
      { code: "FSH 404", title: "Capstone: Sexual Wellness Education Portfolio", hours: "24 hrs", note: "A supervised portfolio integrating evidence, inclusion, ethics and implementation." },
    ],
  },
} as const;

const certificationTracks = [
  { title: "Sexual Health Advocate", hours: "112 hrs", outcome: "Community education, service navigation and stigma-reduction practice." },
  { title: "Consent Educator", hours: "112 hrs", outcome: "Accessible consent education, facilitation and referral practice." },
  { title: "Pleasure-Positive Coach", hours: "106 hrs", outcome: "Bounded, non-clinical intimacy and communication education." },
  { title: "Digital Intimacy Safety Specialist", hours: "93 hrs", outcome: "Privacy, digital consent, incident response and support pathways." },
  { title: "Kink Safety Educator", hours: "100 hrs", outcome: "Non-explicit negotiation, SSC/RACK and ethical risk literacy." },
  { title: "Sexual-Health Curriculum Designer", hours: "120 hrs", outcome: "Inclusive curriculum design, quality governance and evaluation." },
];

type CurriculumLevel = keyof typeof curriculumLevels;

const faculty = [
  { id: "mira", initials: "MS", name: "Dr. Mira Sen", role: "Clinical Professor", focus: "Foundations & health literacy", color: "bg-[#d67693]", prompts: ["What makes consent specific and ongoing?", "How should I assess health information online?", "Explain the difference between sexual health education and clinical care."] },
  { id: "alex", initials: "AR", name: "Alex Rivera", role: "Peer Educator", focus: "Consent & communication", color: "bg-[#c69a56]", prompts: ["How can I phrase a boundary clearly?", "What does a respectful check-in sound like?", "How can I respond without pressure when someone changes their mind?"] },
  { id: "rae", initials: "RO", name: "Rae Okafor", role: "Harm-Reduction Educator", focus: "Health literacy & stigma reduction", color: "bg-[#e59c5b]", prompts: ["How can I talk about testing without adding shame?", "What makes a source of health information credible?", "How can I prepare questions for a sexual-health appointment?"] },
  { id: "jo", initials: "JO", name: "Jo Vale", role: "Intimacy Tutor", focus: "Pleasure & self-knowledge", color: "bg-[#7f4355]", prompts: ["How can I communicate preferences without pressure?", "What can help make a difficult conversation feel less confrontational?", "How does body image affect intimacy and communication?"] },
  { id: "sam", initials: "SC", name: "Sam Chen", role: "Digital Safety Lecturer", focus: "Privacy & digital consent", color: "bg-[#9b7fca]", prompts: ["What are the principles of digital consent?", "How can I reduce privacy risk in digital communication?", "What should a general incident-response plan include?"] },
  { id: "amara", initials: "AW", name: "Amara Williams", role: "Relationship Systems Lecturer", focus: "Conflict, repair & power", color: "bg-[#ba6175]", prompts: ["What does respectful repair after a misunderstanding involve?", "How can I recognise the difference between conflict and coercion?", "How can I make relationship expectations more explicit?"] },
  { id: "niko", initials: "NH", name: "Niko Hart", role: "Kink Safety Facilitator", focus: "Adult-only risk literacy", color: "bg-[#dba55d]", prompts: ["What is the difference between SSC and RACK?", "What principles make a negotiation consent-centred?", "Why do capacity and aftercare matter in adult consent frameworks?"] },
  { id: "taylor", initials: "TM", name: "Taylor Morgan", role: "Inclusive Practice Lecturer", focus: "Access & affirming language", color: "bg-[#73ae9b]", prompts: ["What makes health communication more inclusive?", "How can I use language without assuming someone’s identity?", "What does accessible adult education look like in practice?"] },
  { id: "linh", initials: "LP", name: "Professor Linh Patel", role: "Assessment Coach", focus: "Evidence & study practice", color: "bg-[#819bd3]", prompts: ["How can I evaluate whether a health source is credible?", "What makes a reflection task useful without personal disclosure?", "How should I prepare for a scenario-based assessment?"] },
] as const;

const navigation = [
  { id: "top", label: "Home", compact: "Home", icon: Sparkles },
  { id: "curriculum", label: "Curriculum", compact: "Learn", icon: BookOpen },
  { id: "faculty", label: "AI faculty", compact: "Guides", icon: GraduationCap },
  { id: "care", label: "Support", compact: "Care", icon: HeartHandshake },
] as const;

export default function Home() {
  const previewToken = new URLSearchParams(window.location.search).get("preview");
  const previewMode = import.meta.env.DEV && previewToken === "academy";
  const forceAgeGatePreview = import.meta.env.DEV && previewToken === "age-gate";
  const [ageConfirmed, setAgeConfirmed] = useState(previewMode);
  const [ageChecked, setAgeChecked] = useState(false);
  const [ageDeclined, setAgeDeclined] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [selectedLecturerId, setSelectedLecturerId] = useState<(typeof faculty)[number]["id"]>("mira");
  const [lecturerMessages, setLecturerMessages] = useState<LecturerMessage[]>([]);
  const [lecturerSafeguarded, setLecturerSafeguarded] = useState(false);
  const [catalogueLevel, setCatalogueLevel] = useState<CurriculumLevel>("101");
  const [activeSection, setActiveSection] = useState<(typeof navigation)[number]["id"]>("top");
  const [filmPlaying, setFilmPlaying] = useState(true);
  const [filmAvailable, setFilmAvailable] = useState(true);
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const activeLecturer = faculty.find((person) => person.id === selectedLecturerId) ?? faculty[0];
  const activeCurriculumLevel = curriculumLevels[catalogueLevel];
  const lecturerMutation = trpc.lecturer.respond.useMutation({
    onSuccess: (data) => {
      setLecturerSafeguarded(data.safeguarded);
      setLecturerMessages((current) => [...current, { role: "assistant", content: data.reply }]);
    },
    onError: (error) => setLecturerMessages((current) => [...current, { role: "assistant", content: `I’m unable to respond just now. ${error.message}` }]),
  });
  const courseProgressMutation = trpc.learningProgress.upsert.useMutation({
    onSuccess: () => setLocation("/member"),
    onError: () => showNotice("Your course step could not be saved just now. Please try again from the member space."),
  });

  useEffect(() => {
    if (!previewMode && !forceAgeGatePreview) {
      setAgeConfirmed(window.localStorage.getItem(ageStorageKey) === "true");
    }
  }, [forceAgeGatePreview, previewMode]);

  useEffect(() => {
    const targets = navigation.map(({ id }) => document.getElementById(id)).filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id as (typeof navigation)[number]["id"]);
          entry.target.classList.add("is-cinematic-visible");
        }
      });
    }, { rootMargin: "-24% 0px -62% 0px", threshold: 0.01 });
    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const grantAccess = () => {
    if (!ageChecked) return;
    window.localStorage.setItem(ageStorageKey, "true");
    window.localStorage.setItem(ageStorageDateKey, new Date().toISOString());
    setAgeConfirmed(true);
    setAgeDeclined(false);
  };

  const resetAgeGate = () => {
    window.localStorage.removeItem(ageStorageKey);
    window.localStorage.removeItem(ageStorageDateKey);
    setAgeChecked(false);
    setAgeConfirmed(false);
    setAgeDeclined(false);
  };

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 3600);
  };

  const jumpToSection = (id: (typeof navigation)[number]["id"] | "pathway") => {
    setActiveSection(id === "pathway" ? "curriculum" : id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openMemberSpace = () => {
    if (!ageConfirmed) {
      resetAgeGate();
      return;
    }
    if (isAuthenticated) {
      setLocation("/member");
      return;
    }
    startLogin();
  };

  const saveCourseStep = (courseCode: string) => {
    if (!isAuthenticated) {
      startLogin();
      return;
    }
    courseProgressMutation.mutate({ courseCode, progressPercent: 10, status: "in_progress" });
  };

  const chooseLecturer = (lecturerId: (typeof faculty)[number]["id"]) => {
    setSelectedLecturerId(lecturerId);
    setLecturerMessages([]);
    setLecturerSafeguarded(false);
  };

  const askLecturer = (message: string) => {
    if (!ageConfirmed || lecturerMutation.isPending) return;
    setLecturerSafeguarded(false);
    setLecturerMessages((current) => [...current, { role: "user", content: message }]);
    lecturerMutation.mutate({ lecturerId: activeLecturer.id, message, ageConfirmed: true });
  };

  return (
    <div className="cinematic-shell min-h-screen bg-[#0b090b] text-[#f6eee2] selection:bg-[#e86f98] selection:text-[#190d13]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[84px] flex-col items-center border-r border-white/10 bg-[#0a080a] lg:flex">
        <button onClick={() => jumpToSection("top")} className="mt-6 h-12 w-12 overflow-hidden rounded-full ring-1 ring-[#e4bd78]/40 transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#ee6f9a]" aria-label="Back to top">
          <img src={emblem} alt="fleshsesh academy emblem" className="h-full w-full object-cover" />
        </button>
        <div className="mt-8 h-28 w-px bg-gradient-to-b from-[#e4bd78] via-[#e4bd78]/30 to-transparent" />
        <nav className="mt-6 flex flex-1 flex-col items-center gap-7" aria-label="Primary navigation">
          {navigation.slice(1).map(({ label, id, icon: Icon }) => (
            <button key={label} onClick={() => jumpToSection(id)} className={`group relative transition focus:outline-none ${activeSection === id ? "text-[#f2c684]" : "text-[#a79b92] hover:text-[#f2c684] focus:text-[#f2c684]"}`} aria-label={label}>
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
              {activeSection === id && <span className="absolute -left-4 top-1/2 h-5 w-px -translate-y-1/2 bg-[#ee7e9f]" />}
              <span className="pointer-events-none absolute left-9 top-1/2 hidden -translate-y-1/2 whitespace-nowrap border border-[#e4bd78]/20 bg-[#171115] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f5e8d4] shadow-xl group-hover:block">{label}</span>
            </button>
          ))}
        </nav>
        <button onClick={resetAgeGate} className="mb-6 text-[#a79b92] transition hover:text-[#ee6f9a] focus:outline-none focus:text-[#ee6f9a]" aria-label="Reconfirm age access">
          <ShieldCheck className="h-[18px] w-[18px]" strokeWidth={1.6} />
        </button>
      </aside>

      <main className="pb-20 lg:ml-[84px] lg:pb-0">
        <header id="top" className="relative z-30 flex h-[72px] items-center justify-between border-b border-white/10 px-5 sm:px-8 lg:px-12">
          <button onClick={() => jumpToSection("top")} className="flex items-center gap-3 text-left lg:hidden" aria-label="Back to top">
            <img src={emblem} alt="fleshsesh academy" className="h-9 w-9 rounded-full object-cover ring-1 ring-[#e4bd78]/40" />
          </button>
          <div className="hidden items-center lg:flex">
            <img src={wordmark} alt="fleshsesh academy" className="h-11 w-[185px] object-contain object-left" />
          </div>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main links">
            {navigation.slice(1).map(({ id, label }) => <button key={id} onClick={() => jumpToSection(id)} className={`relative py-2 text-xs font-medium transition ${activeSection === id ? "text-[#f3d39a]" : "text-[#cbbfb6] hover:text-white"}`}>{label}{activeSection === id && <span className="absolute inset-x-0 -bottom-1 h-px bg-[#ee7e9f]" />}</button>)}
          </nav>
          <div className="hidden items-center gap-4 md:flex">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#cabcae]"><ShieldCheck className="h-3.5 w-3.5 text-[#e7bd76]" /> 18+ learning space</span>
            <button onClick={openMemberSpace} className="border-b border-[#e4bd78]/80 pb-1 text-xs font-semibold text-[#f1d494] transition hover:border-[#ee6f9a] hover:text-[#ee6f9a]">{isAuthenticated ? `Welcome back, ${user?.name?.split(" ")[0] || "member"}` : "Member sign in"}</button>
          </div>
          <button onClick={() => setMenuOpen((open) => !open)} className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-[#f6eee2] md:hidden" aria-label="Toggle navigation" aria-expanded={menuOpen}>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          {menuOpen && (
            <div className="absolute left-0 right-0 top-[71px] border-b border-white/10 bg-[#100c10] p-5 shadow-2xl md:hidden">
              <div className="grid gap-3 text-sm">
                {navigation.slice(1).map(({ label, id }) => (
                  <button key={label} onClick={() => { jumpToSection(id); setMenuOpen(false); }} className="flex items-center justify-between border-b border-white/10 py-3 text-left text-[#f6eee2]">{label}<ChevronRight className="h-4 w-4 text-[#e4bd78]" /></button>
                ))}
                <button onClick={() => { openMemberSpace(); setMenuOpen(false); }} className="mt-2 bg-[#ed7299] px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.13em] text-[#1a0d13]">{isAuthenticated ? "Open member space" : "Member sign in"}</button>
              </div>
            </div>
          )}
        </header>

        <section data-cinematic-section className="relative overflow-hidden px-5 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:min-h-[690px] lg:px-12 lg:pb-24 lg:pt-20">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            {ageConfirmed && filmAvailable && filmPlaying && <video autoPlay loop muted playsInline preload="metadata" onError={() => setFilmAvailable(false)} className="absolute inset-0 h-full w-full object-cover object-[62%_center] opacity-[0.36] saturate-[0.72] contrast-[1.08]"><source src={academyFilm} type="video/mp4" /></video>}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#0b090b_5%,rgba(11,9,11,0.92)_39%,rgba(11,9,11,0.48)_70%,#0b090b_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(228,189,120,0.11),transparent_25%),radial-gradient(circle_at_78%_48%,rgba(215,63,109,0.16),transparent_35%)]" />
            <div className="absolute right-[8%] top-[20%] h-[2px] w-[42%] -rotate-[5deg] bg-gradient-to-r from-transparent via-[#e4bd78]/70 to-transparent shadow-[0_0_15px_rgba(228,189,120,0.45)]" />
            <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:40px_40px]" />
          </div>
          <div className="relative grid max-w-[1280px] gap-12 lg:grid-cols-[minmax(0,1fr)_290px] lg:items-end">
            <div className="max-w-[780px]">
              <div className="rise-in relative h-[118px] w-full overflow-visible sm:h-[136px] lg:h-[154px]"><div className="pointer-events-none absolute -inset-x-10 -inset-y-7 max-w-[520px] bg-[#ee6f9a]/20 blur-3xl" /><img src={wordmark} alt="fleshsesh academy" className="relative h-[82px] w-[310px] origin-left scale-[1.42] object-contain object-left sm:h-[98px] sm:w-[380px] sm:scale-[1.48] lg:h-[112px] lg:w-[450px] lg:scale-[1.52]" /></div>
              <div className="rise-in mt-6 inline-flex items-center gap-3 border-y border-[#e4bd78]/35 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#e9c987]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ee6f9a]" /> Adult-only learning house
              </div>
              <h1 className="rise-in-delay mt-7 font-display text-[clamp(3.5rem,8vw,7.5rem)] font-semibold leading-[0.83] tracking-[-0.052em] text-[#fbf5ec]">
                Learn the language<br />of <em className="font-display font-medium text-[#f18aab]">your agency.</em>
              </h1>
              <p className="rise-in-delay mt-8 max-w-xl text-base leading-7 text-[#cfc2b8] sm:text-lg">
                Thoughtful, evidence-informed education for adult learners navigating bodies, boundaries, relationships and digital life — without shame, pressure or performance.
              </p>
              <div className="rise-in-delay mt-10 flex flex-wrap items-center gap-4">
                <button onClick={() => jumpToSection("curriculum")} className="group inline-flex items-center gap-3 bg-[#ef779d] px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#210d15] transition duration-200 hover:bg-[#f8a7be] active:scale-[0.97]">
                  Explore curriculum <ArrowDownRight className="h-4 w-4 transition group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
                <button onClick={() => jumpToSection("care")} className="inline-flex items-center gap-2 border-b border-[#e4bd78]/60 pb-1 text-xs font-semibold text-[#f1d494] transition hover:border-[#ee6f9a] hover:text-[#ee6f9a]">How the academy protects your space <ArrowUpRight className="h-3.5 w-3.5" /></button>
              </div>
            </div>
            <div className="relative border-l border-[#e4bd78]/35 pl-5 lg:pb-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#d7b979]">The 2026/27 guide</p>
              <p className="mt-3 font-display text-3xl leading-[0.95] text-[#f5ece2]">A complete curriculum for clarity, care and connection.</p>
              <button onClick={() => jumpToSection("pathway")} className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#f18aab] transition hover:text-[#f5d09a]">See the learning architecture <ChevronRight className="h-4 w-4" /></button>
              {filmAvailable && <button onClick={() => setFilmPlaying(playing => !playing)} className="mt-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#cabcae] transition hover:text-[#f2d498]">{filmPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current" />}{filmPlaying ? "Pause academy film" : "Play academy film"}</button>}
            </div>
          </div>
          <div className="relative mt-16 grid max-w-[770px] grid-cols-3 border-y border-white/10 py-5 sm:mt-20">
            {[ ["21", "Courses across four levels"], ["18+", "Adult access verified"], ["100%", "Self-paced learning routes"] ].map(([value, label]) => (
              <div key={value} className="border-r border-white/10 px-3 first:pl-0 last:border-0 sm:px-5">
                <p className="font-display text-3xl font-semibold text-[#f1d494] sm:text-4xl">{value}</p>
                <p className="mt-1.5 max-w-[110px] text-[10px] leading-4 text-[#a89b93] sm:text-[11px]">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pathway" data-cinematic-section className="border-y border-[#e4bd78]/20 bg-[#f1e7d8] px-5 py-10 text-[#1c1517] sm:px-8 lg:px-12 lg:py-14">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8a4b5c]">A structured pathway</p>
              <h2 className="mt-4 font-display text-5xl font-semibold leading-[0.88] tracking-[-0.04em] sm:text-6xl">Start where<br />you <em>are.</em></h2>
            </div>
            <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-5">
              {[ ["101", "Foundation", "Knowledge & safety"], ["201", "Applied", "Skills & practice"], ["301", "Integration", "Analysis & facilitation"], ["401", "Advanced", "Leadership & practice"] ].map(([num, level, description]) => (
                <div key={num} className="border-l border-[#95715c]/40 pl-4">
                  <p className="font-display text-3xl text-[#b74363]">{num}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.13em]">{level}</p>
                  <p className="mt-1 text-[11px] leading-4 text-[#685552]">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="curriculum" data-cinematic-section className="bg-[#110d10] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid gap-7 border-b border-[#e4bd78]/25 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e1bb75]">Selected pathways</p>
                <h2 className="mt-4 font-display text-5xl font-semibold leading-[0.9] tracking-[-0.04em] text-[#fbf5ec] sm:text-6xl">Curriculum for the<br /><em className="text-[#f08eac]">whole conversation.</em></h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-[#b9aaa1]">Choose foundational literacy, practical skills or advanced study. Every route makes room for reflection, non-disclosure and support.</p>
            </div>
            <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
              {pathways.map((course) => (
                <article key={course.course} className="group relative min-h-[285px] overflow-hidden bg-[#161014] p-6 transition hover:bg-[#1b1318] sm:p-8">
                  <div className={`pointer-events-none absolute -right-12 -top-14 h-48 w-48 rounded-full bg-gradient-to-br ${course.accent} opacity-35 blur-2xl transition duration-500 group-hover:scale-125 group-hover:opacity-55`} />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between">
                      <span className="font-display text-3xl text-[#e5bd77]">{course.code}</span>
                      <span className="border border-[#e4bd78]/30 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[#e7c888]">{course.tag}</span>
                    </div>
                    <div className="mt-10 max-w-sm">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d67490]">{course.course}</p>
                      <h3 className="mt-2 font-display text-4xl font-semibold leading-[0.92] text-[#fff9f2]">{course.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-[#c7b8ae]">{course.copy}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-7">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#bfae9f]"><Clock3 className="h-3.5 w-3.5" /> {course.hours}</span>
                      <button onClick={() => saveCourseStep(course.course)} disabled={courseProgressMutation.isPending} className="inline-flex items-center gap-2 text-xs font-semibold text-[#f3d49b] transition hover:text-[#ee80a3] disabled:cursor-not-allowed disabled:opacity-50">{isAuthenticated ? "Begin & save" : "Sign in to save"} <ArrowUpRight className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8 flex flex-col justify-between gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center">
              <p className="max-w-xl text-xs leading-5 text-[#91827a]">The course guide is designed for adult learners and contains educational, non-diagnostic content. Some modules may provide a content note or an alternative route.</p>
              <button onClick={() => showNotice("The full 2026/27 course catalogue is being staged for member access.")} className="inline-flex shrink-0 items-center gap-2 border-b border-[#e4bd78]/60 pb-1 text-xs font-semibold text-[#f3d49b] transition hover:border-[#ee6f9a] hover:text-[#ee6f9a]">Open complete course catalogue <ChevronRight className="h-4 w-4" /></button>
            </div>
            <div className="relative mt-16 overflow-hidden border border-[#e4bd78]/25 bg-[#150e13] p-5 sm:p-8 lg:p-10">
              <img src={wordmark} alt="" className="pointer-events-none absolute -right-20 -top-12 hidden h-32 w-[380px] rotate-[-8deg] object-contain opacity-10 lg:block" />
              <div className="relative flex flex-col justify-between gap-6 border-b border-[#e4bd78]/20 pb-7 lg:flex-row lg:items-end">
                <div className="max-w-2xl"><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e4bd78]">2026 / 27 course atlas</p><h3 className="mt-3 font-display text-4xl leading-[0.9] text-[#fff9f2] sm:text-5xl">Find a route through the<br /><em className="text-[#f08eac]">whole curriculum.</em></h3></div>
                <p className="max-w-sm text-xs leading-5 text-[#bcaea4]">All courses use orientation, guided modules, a knowledge check, practical activity, reflection and clear help-seeking information. A learner can pause, skip a reflective prompt or choose an alternative route.</p>
              </div>
              <div className="relative mt-7 grid gap-7 lg:grid-cols-[230px_1fr]">
                <div className="grid gap-2 sm:grid-cols-4 lg:grid-cols-1" role="tablist" aria-label="Curriculum level">
                  {(Object.keys(curriculumLevels) as CurriculumLevel[]).map((level) => <button key={level} role="tab" aria-selected={catalogueLevel === level} onClick={() => setCatalogueLevel(level)} className={`border px-4 py-3 text-left transition ${catalogueLevel === level ? "border-[#ed91ac] bg-[#3a1724] text-[#fff7ee]" : "border-white/10 bg-[#100b0f] text-[#bbaaa1] hover:border-[#e4bd78]/50 hover:text-[#f4e6d5]"}`}><span className="font-display text-2xl text-[#e4bd78]">{level}</span><span className="ml-3 text-[10px] font-bold uppercase tracking-[0.13em]">{curriculumLevels[level].label}</span></button>)}
                </div>
                <div>
                  <div className="flex flex-col justify-between gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#ed91ac]">Level {catalogueLevel}</p><h4 className="mt-2 font-display text-4xl leading-none text-[#fff8ee]">{activeCurriculumLevel.label}</h4></div><p className="max-w-sm text-xs leading-5 text-[#bbaaa1]">{activeCurriculumLevel.purpose}</p></div>
                  <div className="mt-5 border-l-2 border-[#ef90ac] bg-[#2c1721] px-4 py-3"><p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#e9c481]">Learning outcome</p><p className="mt-1.5 max-w-3xl text-xs leading-5 text-[#f0ded4]">{activeCurriculumLevel.outcome}</p></div>
                  <div className="grid divide-y divide-white/10">{activeCurriculumLevel.courses.map((course) => <article key={course.code} className="group grid gap-3 py-5 sm:grid-cols-[92px_1fr_auto] sm:items-center"><div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#e4bd78]">{course.code}</p><p className="mt-1 text-[10px] text-[#9f8f87]">{course.hours}</p></div><div><h5 className="font-display text-2xl leading-none text-[#fff8ee] transition group-hover:text-[#f19bb6]">{course.title}</h5><p className="mt-2 text-xs leading-5 text-[#bcaea4]">{course.note}</p></div><button onClick={() => saveCourseStep(course.code)} disabled={courseProgressMutation.isPending} className="mt-1 inline-flex items-center gap-1 text-left text-[10px] font-bold uppercase tracking-[0.12em] text-[#f0ce92] transition hover:text-[#f18eab] disabled:cursor-not-allowed disabled:opacity-50 sm:mt-0">{isAuthenticated ? "Begin & save" : "Sign in to save"} <ChevronRight className="h-3.5 w-3.5" /></button></article>)}</div>
                </div>
              </div>
            </div>
            <div className="mt-10 grid gap-5 border-t border-white/10 pt-10 lg:grid-cols-[0.68fr_1.32fr]">
              <div><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e4bd78]">Certification pathways</p><h3 className="mt-3 font-display text-4xl leading-[0.9] text-[#fff8ee]">Study with a<br /><em className="text-[#f08eac]">clear outcome.</em></h3><p className="mt-5 max-w-sm text-xs leading-5 text-[#aa9a91]">Badges recognise demonstrated competency, not clinical licensure. Formal accreditation is not represented until it is granted.</p></div>
              <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">{certificationTracks.map((track) => <article key={track.title} className="bg-[#161014] p-5"><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#e4bd78]">{track.hours}</p><h4 className="mt-4 font-display text-2xl leading-[0.92] text-[#fff8ee]">{track.title}</h4><p className="mt-3 text-[11px] leading-5 text-[#bcaea4]">{track.outcome}</p></article>)}</div>
            </div>
          </div>
        </section>

        <section id="faculty" data-cinematic-section className="relative overflow-hidden bg-[#d77d98] px-5 py-16 text-[#251016] sm:px-8 lg:px-12 lg:py-24">
          <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full border-[55px] border-[#f3bea9]/45 blur-[2px]" />
          <div className="pointer-events-none absolute right-[10%] top-0 h-[340px] w-[340px] rounded-full bg-[#fbdbc1]/40 blur-[80px]" />
          <img src={wordmark} alt="" className="pointer-events-none absolute right-[-60px] top-[-24px] hidden h-36 w-[420px] rotate-[-8deg] object-contain opacity-20 lg:block" />
          <div className="relative mx-auto max-w-[1280px]">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#743348]"><Bot className="h-3.5 w-3.5" /> Automated faculty studio</p>
              <h2 className="mt-4 max-w-md font-display text-5xl font-semibold leading-[0.9] tracking-[-0.045em] sm:text-6xl">Guidance that<br /><em>meets you here.</em></h2>
              <p className="mt-7 max-w-md text-sm leading-6 text-[#512638]">Each AI lecturer responds automatically within a defined teaching scope. Questions that indicate a health, safety or crisis concern are routed away from general AI guidance and toward appropriate professional support.</p>
              <div className="mt-8 border-y border-[#6c3448]/25 py-4 text-[11px] leading-5 text-[#56283a]"><strong className="font-semibold">Private by design:</strong> the studio does not ask for sexual history, intimate images or identifying details. Each question is handled as an educational interaction.</div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {faculty.map((person) => (
                <button key={person.name} onClick={() => chooseLecturer(person.id)} className={`group min-h-[280px] border p-5 text-left text-[#f8eee6] transition duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#ffe6a9] ${selectedLecturerId === person.id ? "border-[#ffe2a3] bg-[#3a1724] shadow-[0_16px_30px_rgba(76,18,38,.22)]" : "border-[#633248]/30 bg-[#2a121c]/95 hover:bg-[#351521]"}`} aria-pressed={selectedLecturerId === person.id}>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${person.color} font-display text-lg font-semibold text-[#2a0e18] ring-4 ring-[#2a121c]`}>{person.initials}</div>
                  <div className="mt-24">
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#e9bf79]">{person.role}</p>
                    <h3 className="mt-2 font-display text-3xl leading-[0.92]">{person.name}</h3>
                    <p className="mt-3 text-[11px] leading-5 text-[#d7c2b8]">{person.focus}</p>
                  </div>
                </button>
              ))}
            </div>
            </div>
            <div className="mt-10 grid overflow-hidden border border-[#643246]/35 bg-[#251019] text-[#f8eee6] lg:grid-cols-[0.7fr_1.3fr]">
              <aside className="border-b border-[#e4bd78]/20 p-6 lg:border-b-0 lg:border-r lg:p-8">
                <img src={wordmark} alt="fleshsesh academy" className="h-12 w-[190px] object-contain object-left" />
                <div className="mt-8 flex items-center gap-3"><div className={`flex h-10 w-10 items-center justify-center rounded-full ${activeLecturer.color} font-display text-sm font-semibold text-[#2a0e18]`}>{activeLecturer.initials}</div><div><p className="font-display text-2xl leading-none">{activeLecturer.name}</p><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#e7bd76]">{activeLecturer.role}</p></div></div>
                <p className="mt-6 text-xs leading-5 text-[#cbb8af]">{activeLecturer.focus}. Automated educational replies use the selected lecturer’s scope and are not personal clinical advice.</p>
                <div className="mt-7 border-t border-white/10 pt-5"><p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#e7bd76]">How this guide works</p><p className="mt-2 text-[11px] leading-5 text-[#baa89f]">Ask a general learning question. The guide provides a concise response and a next learning step. It pauses and redirects sensitive health, safety and crisis topics.</p></div>
              </aside>
              <div className="min-w-0 p-3 sm:p-5">
                <AIChatBox messages={lecturerMessages} onSendMessage={askLecturer} isLoading={lecturerMutation.isPending} height="470px" placeholder={`Ask ${activeLecturer.name} an educational question…`} emptyStateMessage={`Start with ${activeLecturer.name}’s teaching scope`} suggestedPrompts={[...activeLecturer.prompts]} className="rounded-none border-[#e4bd78]/25 bg-[#1a1116] shadow-none" />
                {lecturerSafeguarded && <div className="mt-3 flex items-start gap-3 border border-[#e4bd78]/35 bg-[#2e1b16] px-4 py-3 text-xs leading-5 text-[#f4dfc0]"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#f0ca85]" /><p><strong>Support route activated.</strong> This conversation has reached a topic where direct personal care or specialist support is more appropriate than general educational AI guidance. If you are in immediate danger, contact local emergency services.</p></div>}
              </div>
            </div>
          </div>
        </section>

        <section id="care" data-cinematic-section className="bg-[#f1e7d8] px-5 py-16 text-[#201619] sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#93435b]">The care layer</p>
              <h2 className="mt-4 max-w-lg font-display text-5xl font-semibold leading-[0.88] tracking-[-0.045em] sm:text-6xl">Private learning deserves<br /><em>clear safeguards.</em></h2>
              <p className="mt-7 max-w-lg text-sm leading-6 text-[#625251]">fleshsesh academy is designed for learning. It does not provide diagnosis, crisis support, individualized treatment or erotic interaction. Sensitive routes always make space to pause, skip or seek appropriate care.</p>
            </div>
            <div className="grid gap-px border border-[#8f6f60]/30 bg-[#8f6f60]/30 sm:grid-cols-2">
              {[ [ShieldCheck, "Consent-centred by design", "Age controls, content notes and clear reporting routes are built into the learning experience."], [Eye, "Privacy without pressure", "Learning does not require intimate disclosure. Display names and quiet self-directed routes are supported."], [CircleHelp, "Support beyond the screen", "The health and referral layer distinguishes general education from individual medical or mental-health care."], [FileText, "Evidence with boundaries", "Faculty materials are source-led, inclusion-aware and explicit about uncertainty and jurisdiction." ] ].map(([Icon, title, copy]) => {
                const IconComponent = Icon as typeof ShieldCheck;
                return <article key={title as string} className="bg-[#f8f1e6] p-6 sm:p-7"><IconComponent className="h-5 w-5 text-[#b64462]" strokeWidth={1.6} /><h3 className="mt-8 font-display text-3xl font-semibold leading-[0.95]">{title as string}</h3><p className="mt-3 text-xs leading-5 text-[#695857]">{copy as string}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#100b0f] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto grid max-w-[1280px] gap-10 border border-[#e4bd78]/25 bg-[linear-gradient(100deg,rgba(99,21,42,.6),rgba(20,12,16,.92)_55%,rgba(20,12,16,.78))] p-7 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:p-14">
            <div>
              <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#e2bc78]"><Sparkles className="h-3.5 w-3.5 text-[#ef779d]" /> Your learning route</p>
              <h2 className="mt-5 max-w-xl font-display text-5xl font-semibold leading-[0.9] tracking-[-0.04em] text-[#fff8ef] sm:text-6xl">Begin with the<br /><em className="text-[#f18dac]">right questions.</em></h2>
              <p className="mt-6 max-w-xl text-sm leading-6 text-[#cbbab1]">Take a quiet self-placement route, explore foundations, and save course steps privately to your member record when you sign in.</p>
            </div>
            <div className="flex flex-col justify-end gap-3">
              <button onClick={openMemberSpace} className="group flex items-center justify-between bg-[#ef779d] px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.14em] text-[#260e17] transition hover:bg-[#f6a3b9] active:scale-[0.97]">{isAuthenticated ? "Open my learning record" : "Sign in to save progress"}<Compass className="h-4 w-4 transition group-hover:rotate-12" /></button>
              <button onClick={() => setFilmPlaying(playing => !playing)} className="group flex items-center justify-between border border-white/15 px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.14em] text-[#f6eee2] transition hover:border-[#e4bd78] hover:text-[#f1d494] active:scale-[0.97]">{filmPlaying ? "Pause the academy film" : "Play the academy film"}{filmPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}</button>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 bg-[#0a080a] px-5 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3"><img src={wordmark} alt="fleshsesh academy" className="h-7 w-[116px] object-contain object-left" /><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c3b5aa]"><span className="text-[#806d66]">© 2026</span></p></div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-semibold text-[#91827a]"><button onClick={() => showNotice("The learner agreement will be published with member access.")} className="transition hover:text-[#e4bd78]">Learner agreement</button><button onClick={() => showNotice("Accessibility preferences will be available in the member learning space.")} className="transition hover:text-[#e4bd78]">Accessibility</button><button onClick={resetAgeGate} className="transition hover:text-[#e4bd78]">Age verification</button></div>
          </div>
        </footer>
      </main>

      <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-4 border border-[#e4bd78]/25 bg-[#130c11]/95 p-1 shadow-[0_16px_40px_rgba(0,0,0,.45)] backdrop-blur-xl lg:hidden" aria-label="Quick navigation">
        {navigation.map(({ id, compact, icon: Icon }) => <button key={id} onClick={() => jumpToSection(id)} className={`flex min-h-12 flex-col items-center justify-center gap-1 text-[9px] font-bold uppercase tracking-[0.1em] transition ${activeSection === id ? "bg-[#ef789d] text-[#260e17]" : "text-[#c8b8ae] hover:text-[#f3d49a]"}`}><Icon className="h-3.5 w-3.5" strokeWidth={1.8} />{compact}</button>)}
      </nav>

      {!ageConfirmed && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#060506]/95 p-4 backdrop-blur-xl sm:p-8" role="dialog" aria-modal="true" aria-labelledby="age-gate-title">
          <div className="gate-enter relative w-full max-w-[860px] overflow-hidden border border-[#e4bd78]/35 bg-[#100b0f] shadow-[0_30px_100px_rgba(0,0,0,.7)]">
            <div className="absolute inset-y-0 right-0 hidden w-[46%] overflow-hidden border-l border-[#e4bd78]/20 sm:block">
              <div className="absolute -right-20 top-10 h-[390px] w-[390px] rotate-[20deg] rounded-[48%_52%_62%_38%/44%_60%_40%_56%] border border-[#f7d4dd]/30 bg-gradient-to-tr from-[#440214] via-[#d0436c] to-[#ffc0ce] opacity-80 shadow-[0_0_80px_rgba(229,102,142,.35)]" />
              <div className="absolute left-4 top-[46%] h-px w-[115%] -rotate-[8deg] bg-[#e4bd78] shadow-[0_0_20px_rgba(228,189,120,.9)]" />
              <p className="absolute bottom-8 left-8 max-w-[230px] font-display text-3xl leading-[0.9] text-[#faeee6]">A private threshold for adult learning.</p>
            </div>
            <div className="relative max-w-[520px] p-7 sm:p-11">
              <img src={wordmark} alt="fleshsesh academy" className="h-[64px] w-[230px] object-contain object-left" />
              {!ageDeclined ? (
                <>
                  <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.22em] text-[#e4bd78]">Age verification</p>
                  <h2 id="age-gate-title" className="mt-4 font-display text-5xl font-semibold leading-[0.86] tracking-[-0.04em] text-[#fff8ee] sm:text-6xl">This is a space<br />for <em className="text-[#f38eac]">adults.</em></h2>
                  <p className="mt-6 max-w-md text-sm leading-6 text-[#cdbdb2]">fleshsesh academy provides evidence-informed sexual-wellness education for learners aged 18 and over. Entering means you confirm you meet the age requirement in your location. The age check is required before the member space and academy film are available.</p>
                  <label className="mt-8 flex cursor-pointer items-start gap-3 border-y border-white/10 py-4 text-sm leading-5 text-[#eee2d6]">
                    <input type="checkbox" checked={ageChecked} onChange={(event) => setAgeChecked(event.target.checked)} className="mt-0.5 h-4 w-4 accent-[#ee6f9a]" />
                    <span>I confirm that I am <strong>18 years of age or older</strong> and understand that this is an educational, adult-only platform.</span>
                  </label>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button onClick={grantAccess} disabled={!ageChecked} className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#ef779d] px-5 text-xs font-bold uppercase tracking-[0.14em] text-[#250d16] transition enabled:hover:bg-[#f7a4bb] enabled:active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-35">Enter the academy <ArrowUpRight className="h-4 w-4" /></button>
                    <button onClick={() => setAgeDeclined(true)} className="min-h-12 px-3 text-xs font-semibold text-[#baaaa0] transition hover:text-[#f0cc8d]">I am not 18+ / leave this space</button>
                  </div>
                  <p className="mt-6 flex items-start gap-2 text-[10px] leading-4 text-[#93827a]"><ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d6af68]" /> Your selection is saved locally in this browser so returning learners see the same private entry. Reconfirm or clear it at any time from the age-verification control. No identity document is requested by this introductory gateway.</p>
                </>
              ) : (
                <div className="mt-7 max-w-md">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e4bd78]">Access paused</p>
                  <h2 className="mt-4 font-display text-5xl font-semibold leading-[0.88] tracking-[-0.04em] text-[#fff8ee]">This learning space is limited to adults.</h2>
                  <p className="mt-5 text-sm leading-6 text-[#cdbdb2]">Please return when you meet the age requirement for adult educational content in your location.</p>
                  <button onClick={() => setAgeDeclined(false)} className="mt-7 border-b border-[#e4bd78]/60 pb-1 text-xs font-semibold text-[#f1d494] transition hover:border-[#ee6f9a] hover:text-[#ee6f9a]">Return to the age check</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {notice && <div className="fixed bottom-5 right-5 z-[110] max-w-sm border border-[#e4bd78]/40 bg-[#1a1116] px-4 py-3 text-xs leading-5 text-[#f4e5d7] shadow-2xl"><div className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#eabf79]" />{notice}</div></div>}
    </div>
  );
}
