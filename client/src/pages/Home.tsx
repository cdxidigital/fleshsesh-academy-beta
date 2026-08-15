import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { AIChatBox, type Message as LecturerMessage } from "@/components/AIChatBox";
import { buildFacultyConversationStarters } from "@/lib/facultyConversationStarters";
import { trpc } from "@/lib/trpc";
import { academyCourses, type AcademyCourse } from "@shared/courseCatalog";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  CircleHelp,
  Compass,
  Eye,
  GraduationCap,
  HeartHandshake,
  Menu,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

const emblem = "/manus-storage/fleshsesh-academy-emblem_79c8c72e.png";
const wordmark = "/manus-storage/fleshsesh-academy-wordmark_f79fa930.png";
const academyFilm = "/manus-storage/fleshsesh-academy-ambient-film_52e77d54.mp4";
const lawLibraryScene = "/manus-storage/fleshsesh-law-library-editorial_d61126d2.jpg";
const eClinicScene = "/manus-storage/fleshsesh-eclinic-editorial_f01115b8.jpg";
const residenceLifeScene = "/manus-storage/fleshsesh-residence-life-editorial_70ee9870.jpg";
const esportsScene = "/manus-storage/fleshsesh-esports-editorial_7a22e23b.jpg";
const ageStorageKey = "fleshsesh_academy_age_confirmed_v2";
const ageStorageDateKey = "fleshsesh_academy_age_confirmed_at";

const campusScenes = [
  { id: "eclinic", number: "01", eyebrow: "Evidence with warmth", title: "eClinic", copy: "Health literacy, care navigation, and clear questions for the right professional.", image: eClinicScene, course: "FSH 103" },
  { id: "law-library", number: "02", eyebrow: "Rights in focus", title: "Law Library", copy: "A private archive for consent, ethics, privacy, and the language of agency.", image: lawLibraryScene, course: "FSH 102" },
  { id: "residence-life", number: "03", eyebrow: "The candid social wing", title: "Residence Life", copy: "Relationships, repair, and body-neutral self-knowledge without performance or pressure.", image: residenceLifeScene, course: "FSH 203" },
  { id: "esports", number: "04", eyebrow: "Play with agency", title: "Esports Arena", copy: "Digital consent, privacy, and a session-only, consent-first tournament culture.", image: esportsScene, course: "FSH 206" },
] as const;

const faculty = [
  { id: "mira", initials: "MS", name: "Dr. Mira Sen", role: "Clinical Professor", focus: "Foundations & health literacy", tone: "#d7bd82", prompts: ["How should I assess health information online?", "What is the boundary between learning and clinical care?", "How can I prepare a question for a clinician?"] },
  { id: "alex", initials: "AR", name: "Alex Rivera", role: "Peer Educator", focus: "Consent & communication", tone: "#e28c9b", prompts: ["How can I phrase a boundary clearly?", "What does a respectful check-in sound like?", "How can I respond when someone changes their mind?"] },
  { id: "rae", initials: "RO", name: "Rae Okafor", role: "Harm-Reduction Educator", focus: "Health literacy & stigma reduction", tone: "#c7a477", prompts: ["What makes a health source credible?", "How can I talk about testing without shame?", "How can I prepare for a sexual-health appointment?"] },
  { id: "jo", initials: "JV", name: "Jo Vale", role: "Intimacy Tutor", focus: "Pleasure & self-knowledge", tone: "#c8869d", prompts: ["How can I communicate preferences without pressure?", "What makes a conversation feel less confrontational?", "How does body image affect communication?"] },
  { id: "sam", initials: "SC", name: "Sam Chen", role: "Digital Safety Lecturer", focus: "Privacy & digital consent", tone: "#91b4bf", prompts: ["What are the principles of digital consent?", "How can I reduce privacy risk online?", "What belongs in a general incident-response plan?"] },
  { id: "amara", initials: "AW", name: "Amara Williams", role: "Relationship Systems Lecturer", focus: "Conflict, repair & power", tone: "#d29092", prompts: ["What does respectful repair involve?", "How can I recognise conflict versus coercion?", "How can expectations be more explicit?"] },
  { id: "niko", initials: "NH", name: "Niko Hart", role: "Kink Safety Facilitator", focus: "Adult-only risk literacy", tone: "#d9aa69", prompts: ["What is the difference between SSC and RACK?", "What makes a negotiation consent-centred?", "Why do capacity and aftercare matter?"] },
  { id: "taylor", initials: "TM", name: "Taylor Morgan", role: "Inclusive Practice Lecturer", focus: "Access & affirming language", tone: "#93baa6", prompts: ["What makes health communication inclusive?", "How can I avoid identity assumptions?", "What does accessible adult education look like?"] },
  { id: "linh", initials: "LP", name: "Professor Linh Patel", role: "Assessment Coach", focus: "Evidence & study practice", tone: "#a5aacd", prompts: ["How can I evaluate a health source?", "What makes a reflection useful without disclosure?", "How should I prepare for a scenario assessment?"] },
] as const;

type FacultyId = (typeof faculty)[number]["id"];
type CourseLevel = AcademyCourse["level"];

function routeWithPreview(path: string, previewMode: boolean) {
  if (!previewMode) return path;
  return `${path}${path.includes("?") ? "&" : "?"}preview=academy`;
}

export default function Home() {
  const [, setLocation] = useLocation();
  const previewMode = import.meta.env.DEV && new URLSearchParams(window.location.search).get("preview") === "academy";
  const forceAgeGatePreview = import.meta.env.DEV && new URLSearchParams(window.location.search).get("preview") === "age-gate";
  const { user, isAuthenticated } = useAuth();
  const [ageReady, setAgeReady] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(previewMode);
  const [ageAccepted, setAgeAccepted] = useState(false);
  const [ageDeclined, setAgeDeclined] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filmPlaying, setFilmPlaying] = useState(true);
  const [filmAvailable, setFilmAvailable] = useState(true);
  const [activeLevel, setActiveLevel] = useState<CourseLevel>("101");
  const [selectedLecturerId, setSelectedLecturerId] = useState<FacultyId>("mira");
  const [lecturerMessages, setLecturerMessages] = useState<LecturerMessage[]>([]);
  const [lecturerSafeguarded, setLecturerSafeguarded] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const activeLecturer = faculty.find((person) => person.id === selectedLecturerId) ?? faculty[0];
  const conversationStarters = buildFacultyConversationStarters(activeLecturer.focus);
  const visibleCourses = useMemo(() => academyCourses.filter((course) => course.level === activeLevel).slice(0, 4), [activeLevel]);
  const levelCopy: Record<CourseLevel, { title: string; note: string }> = {
    "101": { title: "Foundation", note: "Vocabulary, body literacy, consent literacy, and knowing when to seek care." },
    "201": { title: "Applied practice", note: "Practical communication, prevention, relationship, and digital-safety skills." },
    "301": { title: "Integration", note: "Complex case analysis, inclusion, facilitation, and ethical navigation." },
    "401": { title: "Advanced practice", note: "Leadership, curriculum design, evidence, and supervised capstone work." },
  };

  const lecturerMutation = trpc.lecturer.respond.useMutation({
    onSuccess: (data) => {
      setLecturerSafeguarded(data.safeguarded);
      setLecturerMessages((current) => [...current, { role: "assistant", content: data.reply }]);
    },
    onError: () => setLecturerMessages((current) => [...current, { role: "assistant", content: "The faculty studio is unavailable right now. Please return shortly, or use the support route if you need care beyond general education." }]),
  });

  useEffect(() => {
    if (!previewMode && !forceAgeGatePreview) {
      setAgeConfirmed(window.localStorage.getItem(ageStorageKey) === "true");
    }
    setAgeReady(true);
  }, [forceAgeGatePreview, previewMode]);

  useEffect(() => {
    const requestedFaculty = new URLSearchParams(window.location.search).get("faculty");
    if (faculty.some((person) => person.id === requestedFaculty)) {
      setSelectedLecturerId(requestedFaculty as FacultyId);
      window.setTimeout(() => document.getElementById("faculty")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
    }
  }, []);

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 3800);
  };

  const enterAcademy = () => {
    window.localStorage.setItem(ageStorageKey, "true");
    window.localStorage.setItem(ageStorageDateKey, new Date().toISOString());
    setAgeConfirmed(true);
    setAgeDeclined(false);
  };

  const resetAgeGate = () => {
    window.localStorage.removeItem(ageStorageKey);
    window.localStorage.removeItem(ageStorageDateKey);
    setAgeAccepted(false);
    setAgeConfirmed(false);
    setAgeDeclined(false);
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const openMemberSpace = () => {
    if (!ageConfirmed) return resetAgeGate();
    if (isAuthenticated) return setLocation(routeWithPreview("/member", previewMode));
    startLogin();
  };
  const openLearning = () => ageConfirmed ? setLocation(routeWithPreview("/orientation", previewMode)) : resetAgeGate();
  const openCourse = (course: AcademyCourse) => ageConfirmed ? setLocation(routeWithPreview(`/learn?course=${encodeURIComponent(course.code)}`, previewMode)) : resetAgeGate();
  const chooseLecturer = (id: FacultyId) => {
    setSelectedLecturerId(id);
    setLecturerMessages([]);
    setLecturerSafeguarded(false);
  };
  const askLecturer = (message: string) => {
    if (lecturerMutation.isPending || !ageConfirmed) return;
    setLecturerSafeguarded(false);
    setLecturerMessages((current) => [...current, { role: "user", content: message }]);
    lecturerMutation.mutate({ lecturerId: activeLecturer.id, message, ageConfirmed: true });
  };

  if (!ageReady) return <div className="min-h-screen bg-[#061018]" />;

  if (!ageConfirmed) {
    return <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#061018] px-5 py-8 text-[#f4f1e9]"><img src={lawLibraryScene} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" /><div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(5,14,22,.97),rgba(5,14,22,.7),rgba(5,14,22,.94))]" /><section className="relative grid w-full max-w-6xl overflow-hidden border border-white/15 bg-[#091722]/90 shadow-[0_30px_120px_rgba(0,0,0,.62)] md:grid-cols-[1fr_.82fr]"><div className="p-7 sm:p-12"><img src={wordmark} alt="fleshsesh | academy" className="h-14 w-[245px] object-contain object-left" />{!ageDeclined ? <><p className="mt-12 text-[10px] font-bold uppercase tracking-[.24em] text-[#e6c887]">Private entry · adults only</p><h1 className="mt-5 max-w-lg font-display text-6xl leading-[.78] tracking-[-.055em] sm:text-7xl">Enter the<br /><em className="text-[#e49aa9]">learning house.</em></h1><p className="mt-8 max-w-lg text-sm leading-6 text-[#c9d7d4]">fleshsesh | academy is adult education for people exploring bodies, boundaries, relationships, and digital life. Confirm your age to access the visual campus, learning catalogue, and safeguarded faculty studio.</p><label className="mt-9 flex cursor-pointer gap-3 border-y border-white/10 py-5 text-sm leading-6 text-[#edf1ee]"><input type="checkbox" checked={ageAccepted} onChange={(event) => setAgeAccepted(event.target.checked)} className="mt-1 h-4 w-4 accent-[#d98595]" /><span>I confirm that I am <strong>18 years of age or older</strong> and that this is an adult-only educational platform.</span></label><div className="mt-7 flex flex-wrap gap-3"><button onClick={enterAcademy} disabled={!ageAccepted} className="inline-flex min-h-12 items-center gap-3 bg-[#e49aa9] px-5 text-xs font-bold uppercase tracking-[.15em] text-[#17232d] transition enabled:hover:bg-[#f0b1bb] disabled:cursor-not-allowed disabled:opacity-40">Enter eCampus <ArrowUpRight className="h-4 w-4" /></button><button onClick={() => setAgeDeclined(true)} className="min-h-12 px-3 text-xs font-semibold text-[#c3d1ce] transition hover:text-[#e6c887]">I am not 18+ / leave</button></div><p className="mt-7 flex max-w-xl items-start gap-2 text-[10px] leading-5 text-[#a9bbb8]"><ShieldCheck className="mt-.5 h-3.5 w-3.5 shrink-0 text-[#e6c887]" />This introductory confirmation is stored only in this browser. It can be cleared at any time; it is not an identity-document check.</p></> : <><p className="mt-12 text-[10px] font-bold uppercase tracking-[.24em] text-[#e6c887]">Access paused</p><h1 className="mt-5 font-display text-6xl leading-[.8] tracking-[-.05em]">Take care of<br /><em className="text-[#e49aa9]">your space.</em></h1><p className="mt-7 max-w-lg text-sm leading-6 text-[#c9d7d4]">This learning environment is intended only for adults. You have not entered the academy.</p><button onClick={() => setAgeDeclined(false)} className="mt-9 border-b border-[#e6c887]/70 pb-1 text-xs font-bold uppercase tracking-[.15em] text-[#f3dda7]">Return to entry</button></>}</div><div className="relative hidden min-h-[680px] overflow-hidden md:block"><img src={residenceLifeScene} alt="" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,19,29,.15),rgba(7,19,29,.86))]" /><div className="absolute bottom-10 left-10 right-10"><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#e6c887]">fleshsesh | academy</p><p className="mt-4 font-display text-5xl leading-[.82]">A vivid campus<br /><em className="text-[#e49aa9]">for private learning.</em></p></div></div></section></main>;
  }

  return <div className="min-h-screen overflow-x-hidden bg-[#061018] text-[#eff4f1] selection:bg-[#e49aa9] selection:text-[#061018]">
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#061018]/72 backdrop-blur-xl"><div className="mx-auto flex h-[74px] max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12"><button onClick={() => scrollTo("top")} className="flex items-center gap-3" aria-label="Back to top"><img src={emblem} alt="" className="h-9 w-9 rounded-full ring-1 ring-[#e6c887]/55" /><img src={wordmark} alt="fleshsesh | academy" className="hidden h-8 w-[140px] object-contain object-left sm:block" /></button><nav className="hidden items-center gap-7 md:flex"><button onClick={() => setLocation(routeWithPreview("/campus", previewMode))} className="text-[10px] font-bold uppercase tracking-[.16em] text-[#d8e2de] transition hover:text-[#e6c887]">Campus</button><button onClick={() => scrollTo("curriculum")} className="text-[10px] font-bold uppercase tracking-[.16em] text-[#d8e2de] transition hover:text-[#e6c887]">Learning atlas</button><button onClick={() => scrollTo("faculty")} className="text-[10px] font-bold uppercase tracking-[.16em] text-[#d8e2de] transition hover:text-[#e6c887]">Faculty</button><button onClick={() => scrollTo("care")} className="text-[10px] font-bold uppercase tracking-[.16em] text-[#d8e2de] transition hover:text-[#e6c887]">Care layer</button></nav><div className="hidden items-center gap-4 md:flex"><span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[.16em] text-[#b9cac6]"><ShieldCheck className="h-3.5 w-3.5 text-[#e6c887]" /> 18+ learning space</span><button onClick={openMemberSpace} className="bg-[#e6c887] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#061018] transition hover:bg-[#f2dc9f]">{isAuthenticated ? "My learning" : "Member sign in"}</button></div><button onClick={() => setMenuOpen((open) => !open)} className="grid h-10 w-10 place-items-center border border-white/20 md:hidden" aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button></div>{menuOpen && <div className="border-t border-white/10 bg-[#091722] px-5 py-4 md:hidden"><div className="grid gap-1"><button onClick={() => { setLocation(routeWithPreview("/campus", previewMode)); setMenuOpen(false); }} className="flex items-center justify-between border-b border-white/10 py-4 text-left text-sm">Campus <ChevronRight className="h-4 w-4 text-[#e6c887]" /></button>{[["Learning atlas", "curriculum"], ["Faculty", "faculty"], ["Care layer", "care"]].map(([label, id]) => <button key={id} onClick={() => { scrollTo(id); setMenuOpen(false); }} className="flex items-center justify-between border-b border-white/10 py-4 text-left text-sm">{label}<ChevronRight className="h-4 w-4 text-[#e6c887]" /></button>)}<button onClick={openMemberSpace} className="mt-3 bg-[#e49aa9] px-4 py-4 text-left text-xs font-bold uppercase tracking-[.14em] text-[#061018]">{isAuthenticated ? "Open my learning" : "Member sign in"}</button></div></div>}</header>

    <main id="top">
      <section className="relative flex min-h-[100svh] items-end overflow-hidden px-5 pb-7 pt-28 sm:px-8 sm:pb-10 lg:px-12 lg:pb-12"><img src={lawLibraryScene} alt="" className="absolute inset-0 h-full w-full object-cover object-[58%_center]" />{filmAvailable && filmPlaying && <video autoPlay loop muted playsInline preload="auto" poster={lawLibraryScene} onError={() => setFilmAvailable(false)} className="absolute inset-0 h-full w-full object-cover object-[58%_center] opacity-[.56] saturate-[.76] contrast-[1.12]"><source src={academyFilm} type="video/mp4" /></video>}<div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,13,20,.96)_0%,rgba(4,13,20,.78)_36%,rgba(4,13,20,.18)_72%,rgba(4,13,20,.62)_100%)]" /><div className="absolute inset-x-0 bottom-0 h-[48%] bg-[linear-gradient(0deg,rgba(4,13,20,.98),transparent)]" /><div className="absolute inset-x-0 top-[74px] h-px bg-white/10" /><div className="relative mx-auto grid w-full max-w-[1600px] gap-10 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end"><div className="max-w-4xl pb-4 lg:pb-10"><p className="inline-flex items-center gap-3 border-y border-[#e6c887]/45 py-2 text-[10px] font-bold uppercase tracking-[.24em] text-[#f0dba3]"><span className="h-1.5 w-1.5 rounded-full bg-[#e49aa9]" /> An adult learning world for agency</p><h1 className="mt-8 font-display text-[clamp(4.8rem,11vw,11.5rem)] leading-[.71] tracking-[-.075em] text-[#f5f4ed]">Learn<br /><em className="text-[#e49aa9]">out loud.</em></h1><p className="mt-9 max-w-xl text-base leading-7 text-[#d2dfdb] sm:text-lg">A visual eCampus for exploring body literacy, consent, relationships, and digital life—with evidence, room to pause, and no demand for personal disclosure.</p><div className="mt-9 flex flex-wrap gap-3"><button onClick={openLearning} className="inline-flex items-center gap-3 bg-[#e49aa9] px-5 py-4 text-xs font-bold uppercase tracking-[.15em] text-[#061018] transition hover:bg-[#f0b1bb] active:scale-[.97]">Explore learning <ArrowDownRight className="h-4 w-4" /></button><button onClick={() => setLocation(routeWithPreview("/campus", previewMode))} className="inline-flex items-center gap-3 border border-white/25 bg-[#061018]/35 px-5 py-4 text-xs font-bold uppercase tracking-[.15em] text-[#f3f0e9] backdrop-blur-sm transition hover:border-[#e6c887] hover:text-[#f0dba3]">Enter campus <Compass className="h-4 w-4" /></button></div></div><aside className="relative border border-white/20 bg-[#071720]/70 p-3 backdrop-blur-md lg:mb-2"><div className="relative aspect-[1.08/1] overflow-hidden"><img src={residenceLifeScene} alt="Residence Life interior" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,13,20,.9),transparent_65%)]" /><div className="absolute inset-x-0 bottom-0 p-5"><p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#e6c887]">Live campus index · 01</p><p className="mt-3 font-display text-4xl leading-[.82]">The campus<br /><em className="text-[#e49aa9]">is the curriculum.</em></p></div></div><div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3"><p className="text-[9px] font-bold uppercase tracking-[.15em] text-[#c3d3cf]">Welcome film · {filmPlaying ? "playing" : "paused"}</p><button onClick={() => setFilmPlaying((playing) => !playing)} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.13em] text-[#f1dca4]">{filmPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current" />}{filmPlaying ? "Pause" : "Play"}</button></div></aside></div><div className="absolute bottom-0 left-0 right-0 hidden border-t border-white/10 bg-[#061018]/88 px-12 py-3 lg:block"><div className="mx-auto grid max-w-[1600px] grid-cols-4 gap-px bg-white/10">{campusScenes.map((scene) => <button key={scene.id} onClick={() => setLocation(routeWithPreview(`/campus/${scene.id}`, previewMode))} className="group flex items-center gap-3 bg-[#061018] px-3 py-3 text-left transition hover:bg-[#102630]"><img src={scene.image} alt="" className="h-10 w-14 object-cover transition group-hover:scale-[1.04]" /><span><span className="block text-[8px] font-bold uppercase tracking-[.16em] text-[#e6c887]">{scene.number}</span><span className="mt-1 block text-xs font-semibold text-[#e8eeeb]">{scene.title}</span></span><ArrowUpRight className="ml-auto h-3.5 w-3.5 text-[#e49aa9]" /></button>)}</div></div></section>

      <section id="campus" className="bg-[#061018] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto max-w-[1600px]"><div className="grid gap-8 border-b border-white/15 pb-10 lg:grid-cols-[1fr_.62fr] lg:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#e6c887]">Four places to begin</p><h2 className="mt-5 font-display text-6xl leading-[.78] tracking-[-.055em] sm:text-7xl">Follow the<br /><em className="text-[#e49aa9]">right room.</em></h2></div><p className="max-w-lg text-sm leading-6 text-[#bdceca]">Every room has its own visual language, specialist faculty, learning pathway, and clear boundary. Choose a destination; the catalogue follows from there.</p></div><div className="mt-8 grid gap-3 md:grid-cols-2">{campusScenes.map((scene, index) => <button key={scene.id} onClick={() => setLocation(routeWithPreview(`/campus/${scene.id}`, previewMode))} className={`group relative min-h-[420px] overflow-hidden border border-white/10 text-left ${index === 0 ? "md:col-span-2 md:min-h-[520px]" : ""}`}><img src={scene.image} alt={`${scene.title} cinematic campus scene`} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" /><div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,13,20,.96),rgba(4,13,20,.1)_72%)]" /><div className="relative flex h-full flex-col justify-end p-6 sm:p-8"><div className="flex items-center justify-between"><span className="font-display text-5xl text-[#e6c887]">{scene.number}</span><span className="border border-white/25 bg-[#061018]/60 px-3 py-2 text-[9px] font-bold uppercase tracking-[.15em] text-[#e9f0ed] backdrop-blur-sm">Enter room</span></div><p className="mt-auto text-[10px] font-bold uppercase tracking-[.2em] text-[#e6c887]">{scene.eyebrow}</p><h3 className="mt-3 font-display text-6xl leading-[.8] tracking-[-.045em]">{scene.title}</h3><p className="mt-4 max-w-xl text-sm leading-6 text-[#d2dfdb]">{scene.copy}</p><span className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#f3dda7]">See the pathway <ArrowUpRight className="h-4 w-4" /></span></div></button>)}</div></div></section>

      <section id="curriculum" className="relative overflow-hidden bg-[#102630] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><img src={eClinicScene} alt="" className="pointer-events-none absolute right-0 top-0 h-full w-[48%] object-cover opacity-20" /><div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#102630_20%,rgba(16,38,48,.94)_48%,rgba(16,38,48,.5))]" /><div className="relative mx-auto max-w-[1600px]"><div className="grid gap-8 lg:grid-cols-[1fr_.72fr] lg:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#e6c887]">The learning atlas</p><h2 className="mt-5 font-display text-6xl leading-[.78] tracking-[-.055em] sm:text-7xl">Build your<br /><em className="text-[#e49aa9]">own syllabus.</em></h2></div><p className="max-w-md text-sm leading-6 text-[#c8d7d3]">Twenty-one paid units, four levels, and meaningful competency markers. Explore a unit before enrolling; no learning path asks for private history.</p></div><div className="mt-12 grid gap-3 lg:grid-cols-[285px_1fr]"><div className="grid grid-cols-2 gap-2 lg:grid-cols-1">{(["101", "201", "301", "401"] as CourseLevel[]).map((level) => <button key={level} onClick={() => setActiveLevel(level)} className={`border p-4 text-left transition ${activeLevel === level ? "border-[#e49aa9] bg-[#3a2030]" : "border-white/15 bg-[#071720]/80 hover:border-[#e6c887]/65"}`}><span className="font-display text-3xl text-[#e6c887]">{level}</span><span className="ml-3 text-[10px] font-bold uppercase tracking-[.13em]">{levelCopy[level].title}</span></button>)}</div><div className="border border-white/15 bg-[#061018]/65 p-5 sm:p-7"><div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#e49aa9]">Level {activeLevel}</p><h3 className="mt-2 font-display text-5xl leading-none">{levelCopy[activeLevel].title}</h3></div><p className="max-w-md text-xs leading-5 text-[#bbccc7]">{levelCopy[activeLevel].note}</p></div><div className="mt-2 divide-y divide-white/10">{visibleCourses.map((course, index) => <button key={course.code} onClick={() => openCourse(course)} className="group grid w-full gap-4 py-5 text-left sm:grid-cols-[70px_1fr_auto] sm:items-center"><span className="font-display text-4xl text-[#e6c887]">0{index + 1}</span><span><span className="text-[9px] font-bold uppercase tracking-[.16em] text-[#e49aa9]">{course.code} · {course.hours} hours</span><span className="mt-2 block font-display text-3xl leading-none transition group-hover:text-[#f0b1bb]">{course.title}</span><span className="mt-2 block text-xs text-[#b9c9c5]">{course.subtitle}</span></span><span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.13em] text-[#f1dca4]">View unit <ArrowUpRight className="h-3.5 w-3.5" /></span></button>)}</div><button onClick={openLearning} className="mt-7 inline-flex items-center gap-2 border-b border-[#e6c887]/60 pb-1 text-xs font-bold uppercase tracking-[.14em] text-[#f1dca4] transition hover:border-[#e49aa9] hover:text-[#f0b1bb]">Open all 21 units <ChevronRight className="h-4 w-4" /></button></div></div></div></section>

      <section id="faculty" className="bg-[#071720] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto max-w-[1600px]"><div className="grid gap-10 border-b border-white/15 pb-10 lg:grid-cols-[.75fr_1.25fr] lg:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#e6c887]">The faculty archive</p><h2 className="mt-5 font-display text-6xl leading-[.78] tracking-[-.055em] sm:text-7xl">A guide for<br /><em className="text-[#e49aa9]">every room.</em></h2></div><p className="max-w-xl text-sm leading-6 text-[#c2d2ce]">Nine automated lecturers are indexed by scope, not personality. Each gives education-first guidance and routes health, safety, crisis, coercion, or highly personal concerns toward appropriate human support.</p></div><div className="mt-10 grid gap-3 xl:grid-cols-[1.07fr_.93fr]"><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{faculty.map((person) => <button key={person.id} onClick={() => chooseLecturer(person.id)} className={`min-h-[180px] border p-4 text-left transition sm:p-5 ${activeLecturer.id === person.id ? "border-[#e6c887] bg-[#162d38]" : "border-white/10 bg-[#0b1c26] hover:border-[#e49aa9]/70"}`} aria-pressed={activeLecturer.id === person.id}><span className="inline-flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold" style={{ borderColor: person.tone, color: person.tone }}>{person.initials}</span><p className="mt-10 text-[9px] font-bold uppercase tracking-[.16em] text-[#e6c887]">{person.role}</p><h3 className="mt-2 font-display text-3xl leading-[.85]">{person.name}</h3><p className="mt-3 text-[11px] leading-5 text-[#b6c7c2]">{person.focus}</p></button>)}</div><aside className="border border-[#e6c887]/35 bg-[#061018] p-4 sm:p-6"><div className="border-b border-white/10 pb-5"><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#e6c887]">Faculty folio</p><div className="mt-4 flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-full border text-sm font-bold" style={{ borderColor: activeLecturer.tone, color: activeLecturer.tone }}>{activeLecturer.initials}</span><div><h3 className="font-display text-3xl leading-none">{activeLecturer.name}</h3><p className="mt-1 text-[10px] font-bold uppercase tracking-[.14em] text-[#e49aa9]">{activeLecturer.role}</p></div></div><p className="mt-5 text-xs leading-5 text-[#c4d3cf]">{activeLecturer.focus}. The studio offers general learning support; it does not provide personal clinical, legal, crisis, or emergency advice.</p></div><div className="border-b border-white/10 py-5"><p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#e6c887]">Choose a learning move</p><p className="mt-2 text-[11px] leading-5 text-[#aebfbb]">These starters are topic-based and fictional or general. They never ask you to share personal history.</p><div className="mt-4 grid gap-2 sm:grid-cols-3">{conversationStarters.map((starter) => <button key={starter.id} onClick={() => askLecturer(starter.prompt)} disabled={lecturerMutation.isPending} className="border border-white/15 bg-[#0b1c26] px-3 py-3 text-left text-[9px] font-bold uppercase tracking-[.11em] text-[#dfeae6] transition hover:border-[#e6c887] disabled:opacity-50">{starter.label}</button>)}</div></div><div className="pt-5"><AIChatBox messages={lecturerMessages} onSendMessage={askLecturer} isLoading={lecturerMutation.isPending} height="350px" placeholder={`Ask ${activeLecturer.name} an educational question…`} emptyStateMessage={`Begin with ${activeLecturer.name}'s teaching scope`} suggestedPrompts={[...activeLecturer.prompts]} className="rounded-none border-white/10 bg-[#0b1c26] shadow-none" />{lecturerSafeguarded && <div className="mt-3 flex gap-3 border border-[#e6c887]/35 bg-[#2b2020] p-4 text-xs leading-5 text-[#f0e1c5]"><ShieldCheck className="h-4 w-4 shrink-0 text-[#e6c887]" /><p><strong>Support route activated.</strong> This subject needs personal or specialist support beyond general educational AI guidance. If there is immediate danger, contact local emergency services.</p></div>}</div></aside></div></div></section>

      <section id="care" className="relative overflow-hidden bg-[#e9e1d3] px-5 py-20 text-[#102630] sm:px-8 lg:px-12 lg:py-28"><img src={eClinicScene} alt="" className="absolute inset-y-0 right-0 hidden h-full w-[46%] object-cover lg:block" /><div className="absolute inset-y-0 right-0 hidden w-[55%] bg-[linear-gradient(90deg,#e9e1d3_0%,rgba(233,225,211,.22)_100%)] lg:block" /><div className="relative mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[.82fr_1.18fr]"><div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#9b4e61]">The care layer</p><h2 className="mt-5 font-display text-6xl leading-[.78] tracking-[-.055em] sm:text-7xl">Safety is part<br />of the <em className="text-[#b76578]">architecture.</em></h2><p className="mt-8 max-w-xl text-sm leading-6 text-[#40575f]">fleshsesh | academy provides learning, not diagnosis, crisis intervention, treatment, or erotic interaction. You can pause, skip a reflective prompt, or choose a non-disclosure route at any time.</p><button onClick={() => showNotice("Support links are available in every teaching unit. If there is immediate danger, contact local emergency services.")} className="mt-8 inline-flex items-center gap-2 border-b border-[#9b4e61]/55 pb-1 text-xs font-bold uppercase tracking-[.14em] text-[#743b4b]">See the support boundary <ArrowUpRight className="h-4 w-4" /></button></div><div className="grid gap-2 sm:grid-cols-2">{[[ShieldCheck, "Consent-centred", "Age controls, pause routes, and clear boundaries shape every learning flow."], [Eye, "Private by design", "The academy does not ask for intimate images, history, or identifying details."], [CircleHelp, "Human support", "Sensitive routes step out of general AI guidance and toward appropriate care."], [HeartHandshake, "Evidence-aware", "Learning distinguishes helpful information from individual advice and diagnosis."]].map(([Icon, title, copy]) => { const CardIcon = Icon as typeof ShieldCheck; return <article key={title as string} className="bg-[#f5f0e7]/90 p-6 shadow-[0_14px_35px_rgba(35,45,47,.10)]"><CardIcon className="h-5 w-5 text-[#b76578]" /><h3 className="mt-10 font-display text-4xl leading-[.86]">{title as string}</h3><p className="mt-4 text-xs leading-5 text-[#4e656a]">{copy as string}</p></article>})}</div></div></section>

      <section className="bg-[#061018] px-5 py-16 sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto grid max-w-[1600px] overflow-hidden border border-white/15 lg:grid-cols-[1fr_.72fr]"><div className="relative min-h-[360px] p-8 sm:p-12"><img src={esportsScene} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,13,20,.97),rgba(4,13,20,.56))]" /><div className="relative"><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#e6c887]">Your route starts here</p><h2 className="mt-5 max-w-xl font-display text-6xl leading-[.78] tracking-[-.055em]">Move through<br /><em className="text-[#e49aa9]">the campus.</em></h2><p className="mt-7 max-w-lg text-sm leading-6 text-[#cedbd7]">Explore a room, choose a unit, or sign in to keep a private learning record. The next step is yours to set.</p></div></div><div className="flex flex-col justify-center gap-3 bg-[#102630] p-8 sm:p-12"><button onClick={() => setLocation(routeWithPreview("/campus", previewMode))} className="group flex items-center justify-between bg-[#e49aa9] px-5 py-5 text-left text-xs font-bold uppercase tracking-[.15em] text-[#061018] transition hover:bg-[#f0b1bb]">Explore campus <Compass className="h-4 w-4 transition group-hover:rotate-12" /></button><button onClick={openLearning} className="group flex items-center justify-between border border-white/20 px-5 py-5 text-left text-xs font-bold uppercase tracking-[.15em] text-[#f1f3ed] transition hover:border-[#e6c887] hover:text-[#f1dca4]">Browse all learning <BookOpen className="h-4 w-4" /></button><button onClick={openMemberSpace} className="group flex items-center justify-between border border-white/20 px-5 py-5 text-left text-xs font-bold uppercase tracking-[.15em] text-[#f1f3ed] transition hover:border-[#e6c887] hover:text-[#f1dca4]">{isAuthenticated ? "Open my learning" : "Member sign in"}<GraduationCap className="h-4 w-4" /></button></div></div></section>
    </main>
    <footer className="border-t border-white/10 bg-[#030b11] px-5 py-8 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-4 text-[10px] font-bold uppercase tracking-[.15em] text-[#9db1ae] sm:flex-row sm:items-center"><div className="flex items-center gap-3"><img src={wordmark} alt="fleshsesh | academy" className="h-7 w-[120px] object-contain object-left" /><span>adult learning with agency</span></div><div className="flex gap-5"><button onClick={() => showNotice("The learner agreement will be available in the member learning space.")} className="transition hover:text-[#e6c887]">Learner agreement</button><button onClick={resetAgeGate} className="transition hover:text-[#e6c887]">Age access</button></div></div></footer>
    {notice && <div className="fixed bottom-5 left-1/2 z-[80] max-w-[min(92vw,650px)] -translate-x-1/2 border border-[#e6c887]/40 bg-[#0c1c26] px-5 py-4 text-center text-xs leading-5 text-[#e9f0ed] shadow-2xl">{notice}</div>}
  </div>;
}
