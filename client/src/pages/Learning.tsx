import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";
import { Award, BookOpen, CheckCircle2, ChevronLeft, CirclePlay, LockKeyhole, Sparkles, Trophy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

const wordmark = "/manus-storage/fleshsesh-academy-wordmark_f79fa930.png";
const ageStorageKey = "fleshsesh_academy_age_confirmed_v2";

type Course = {
  code: string;
  level: string;
  title: string;
  subtitle: string;
  hours: number;
  priceCents: number;
  currency: string;
  prerequisites: string;
  learningOutcome: string;
  assessment: string;
  badgeCode: string;
  modules: { id: string; title: string; summary: string; practice: string; check: string; xp: number }[];
};

const coursePrice = (course: Course) => new Intl.NumberFormat("en-AU", { style: "currency", currency: course.currency.toUpperCase(), maximumFractionDigits: 0 }).format(course.priceCents / 100);

export default function Learning() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, loading } = useAuth();
  const catalogue = trpc.academy.catalogue.useQuery();
  const myLearning = trpc.academy.myLearning.useQuery(undefined, { enabled: isAuthenticated });
  const checkout = trpc.academy.checkout.useMutation({
    onSuccess: ({ url }) => {
      window.open(url, "_blank", "noopener,noreferrer");
      toast.success("Secure checkout has opened in a new tab.");
    },
    onError: error => toast.error(error.message),
  });
  const completeLesson = trpc.academy.completeLesson.useMutation({ onSuccess: () => myLearning.refetch(), onError: error => toast.error(error.message) });
  const [selectedCourseCode, setSelectedCourseCode] = useState<string | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const previewHost = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname.endsWith(".manus.computer"));
  const previewVariant = new URLSearchParams(window.location.search).get("preview");
  const previewMode = previewHost && (previewVariant === "academy" || previewVariant === "lesson");
  const lessonPreview = previewHost && previewVariant === "lesson";
  const ageVerified = previewMode || (typeof window !== "undefined" && window.localStorage.getItem(ageStorageKey) === "true");

  useEffect(() => { if (!ageVerified) setLocation("/"); }, [ageVerified, setLocation]);
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("course");
    if (code) setSelectedCourseCode(code);
  }, []);

  const courses = (catalogue.data ?? []) as Course[];
  const selectedCourse = courses.find(course => course.code === selectedCourseCode) ?? null;
  const activeEnrollment = selectedCourse && (lessonPreview || myLearning.data?.enrollments.find(enrollment => enrollment.courseCode === selectedCourse.code && enrollment.status === "active"));
  const selectedModule = selectedCourse?.modules.find(module => module.id === selectedModuleId) ?? selectedCourse?.modules[0] ?? null;
  const completeIds = useMemo(() => new Set(myLearning.data?.completions.map(completion => completion.lessonId) ?? []), [myLearning.data?.completions]);
  const activeRewards = myLearning.data?.rewards;

  if (!ageVerified || loading) return <div className="min-h-screen bg-[#0b090b]" />;

  const chooseCourse = (course: Course) => {
    setSelectedCourseCode(course.code);
    setSelectedModuleId(course.modules[0]?.id ?? null);
    window.history.replaceState(null, "", `/learn?course=${encodeURIComponent(course.code)}`);
  };

  const beginCheckout = (course: Course) => {
    if (!isAuthenticated) return startLogin();
    checkout.mutate({ courseCode: course.code });
  };

  if (selectedCourse && selectedModule) {
    const completedCount = selectedCourse.modules.filter(module => completeIds.has(module.id)).length;
    const isModuleComplete = completeIds.has(selectedModule.id);
    return <div className="min-h-screen bg-[#0b090b] px-5 py-6 text-[#f6eee2] sm:px-8 lg:px-12"><div className="mx-auto max-w-[1280px]"><header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5"><button onClick={() => { setSelectedCourseCode(null); window.history.replaceState(null, "", "/learn"); }} className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-[#e7c888] hover:text-[#fff8ef]"><ChevronLeft className="h-4 w-4" /> All learning units</button><img src={wordmark} alt="fleshsesh | academy" className="h-10 w-[180px] object-contain object-right" /></header>{!activeEnrollment ? <main className="mx-auto grid max-w-4xl gap-8 py-14 lg:grid-cols-[1.1fr_.9fr]"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#e4bd78]">Enrolment required</p><h1 className="mt-4 font-display text-6xl leading-[.85] text-[#fff8ef]">{selectedCourse.title}</h1><p className="mt-6 text-sm leading-6 text-[#cbbab1]">This guided {selectedCourse.hours}-hour unit includes all teaching modules, practice activities, formative checks, and the completion competency marker.</p><div className="mt-8 border-l-2 border-[#ef789d] bg-[#21131a] p-5"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#e4bd78]">Learning outcome</p><p className="mt-2 text-sm leading-6 text-[#f0ded4]">{selectedCourse.learningOutcome}</p></div></div><aside className="border border-[#e4bd78]/25 bg-[#160e13] p-7"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#e4bd78]">Single unit enrolment</p><p className="mt-5 font-display text-5xl text-[#fff8ef]">{coursePrice(selectedCourse)}</p><p className="mt-2 text-xs leading-5 text-[#cbbab1]">One-time payment in AUD. Checkout uses Stripe and unlocks this course after confirmed payment.</p><button onClick={() => beginCheckout(selectedCourse)} disabled={checkout.isPending} className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 bg-[#ef779d] px-5 text-xs font-bold uppercase tracking-[.13em] text-[#260e17] transition hover:bg-[#f6a3b9] disabled:opacity-50"><LockKeyhole className="h-4 w-4" /> {isAuthenticated ? "Enrol with secure checkout" : "Sign in to enrol"}</button><p className="mt-4 text-[11px] leading-5 text-[#a99990]">Badge: {selectedCourse.badgeCode.replace(/-/g, " ")}. Certificates mark completed learning and are not clinical licences.</p></aside></main> : <main className="grid gap-8 py-8 lg:grid-cols-[280px_1fr_260px]"><aside className="border border-white/10 bg-[#120d11] p-5"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#e4bd78]">{selectedCourse.code} · {selectedCourse.hours} hrs</p><h1 className="mt-3 font-display text-4xl leading-[.9] text-[#fff8ef]">{selectedCourse.title}</h1><div className="mt-7 space-y-2">{selectedCourse.modules.map((module, index) => <button key={module.id} onClick={() => setSelectedModuleId(module.id)} className={`w-full border px-3 py-3 text-left transition ${selectedModule.id === module.id ? "border-[#ef789d] bg-[#351824] text-[#fff8ef]" : "border-white/10 text-[#cbbab1] hover:border-[#e4bd78]/50"}`}><span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.12em] text-[#e4bd78]">{completeIds.has(module.id) ? <CheckCircle2 className="h-3.5 w-3.5" /> : <span className="w-3.5 text-center">{index + 1}</span>} Module {index + 1}</span><span className="mt-1 block text-xs leading-4">{module.title}</span></button>)}</div></aside><article className="border border-[#e4bd78]/20 bg-[#160e13] p-6 sm:p-9"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#e4bd78]">Teaching module {selectedCourse.modules.findIndex(module => module.id === selectedModule.id) + 1}</p><h2 className="mt-4 font-display text-5xl leading-[.86] text-[#fff8ef]">{selectedModule.title}</h2><section className="mt-8 border-y border-white/10 py-6"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#ef90ad]">Explore</p><p className="mt-3 text-sm leading-7 text-[#e2d4cb]">{selectedModule.summary}</p></section><section className="mt-6 border-l-2 border-[#e4bd78] bg-[#201719] p-5"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#e4bd78]">Practice without disclosure</p><p className="mt-3 text-sm leading-6 text-[#e2d4cb]">{selectedModule.practice}</p></section><section className="mt-6 border border-[#ef789d]/25 bg-[#2c1520] p-5"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#efb0c3]">Knowledge check</p><p className="mt-3 text-sm leading-6 text-[#f1e1e4]">{selectedModule.check}</p></section><button onClick={() => completeLesson.mutate({ courseCode: selectedCourse.code, lessonId: selectedModule.id })} disabled={isModuleComplete || completeLesson.isPending} className="mt-8 inline-flex min-h-12 items-center gap-2 bg-[#ef779d] px-5 text-xs font-bold uppercase tracking-[.13em] text-[#260e17] transition hover:bg-[#f6a3b9] disabled:opacity-50">{isModuleComplete ? <CheckCircle2 className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}{isModuleComplete ? "Learning step recorded" : `Complete step · +${selectedModule.xp} XP`}</button></article><aside className="space-y-4"><div className="border border-[#e4bd78]/25 bg-[#160e13] p-5"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#e4bd78]">Unit progress</p><p className="mt-4 font-display text-5xl text-[#fff8ef]">{Math.round((completedCount / selectedCourse.modules.length) * 100)}%</p><p className="mt-2 text-xs text-[#cbbab1]">{completedCount} of {selectedCourse.modules.length} teaching modules completed</p></div><div className="border border-white/10 bg-[#120d11] p-5"><p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#e4bd78]"><Trophy className="h-3.5 w-3.5" /> Learning rewards</p><p className="mt-4 font-display text-3xl text-[#fff8ef]">Level {activeRewards?.level ?? 1}</p><p className="mt-1 text-xs text-[#cbbab1]">{activeRewards?.xp ?? 0} XP · {activeRewards?.currentStreak ?? 0}-day learning rhythm</p><p className="mt-4 text-[11px] leading-5 text-[#a99990]">Rewards recognise completion and competency. They never reward personal disclosure or time spent in sensitive content.</p></div><div className="border border-white/10 p-5 text-xs leading-5 text-[#bcaea4]"><strong className="text-[#f2d49a]">Assessment:</strong> {selectedCourse.assessment}</div></aside></main>}</div></div>;
  }

  return <div className="min-h-screen bg-[#0b090b] px-5 py-6 text-[#f6eee2] sm:px-8 lg:px-12"><div className="mx-auto max-w-[1280px]"><header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6"><button onClick={() => setLocation("/")} className="inline-flex items-center gap-2 text-xs font-semibold text-[#e7c888] hover:text-[#fff8ef]"><ChevronLeft className="h-4 w-4" /> Academy home</button><img src={wordmark} alt="fleshsesh | academy" className="h-10 w-[180px] object-contain" /></header><main className="py-10"><div className="grid gap-8 lg:grid-cols-[1.25fr_.75fr]"><div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#e4bd78]">Paid learning catalogue</p><h1 className="mt-4 font-display text-6xl leading-[.82] text-[#fff8ef]">Choose a unit.<br /><em className="text-[#f18dac]">Learn with depth.</em></h1><p className="mt-6 max-w-2xl text-sm leading-6 text-[#cbbab1]">Every unit combines teaching modules, a non-disclosure practice route, a short knowledge check, and a competency-based completion record. You retain a clear path to pause or seek appropriate human support.</p></div><aside className="border border-[#e4bd78]/25 bg-[#160e13] p-6"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#e4bd78]">Your learning record</p><p className="mt-4 font-display text-4xl text-[#fff8ef]">{isAuthenticated ? `${myLearning.data?.enrollments.filter(item => item.status === "active").length ?? 0} active units` : "Member sign-in"}</p><p className="mt-2 text-xs leading-5 text-[#cbbab1]">{isAuthenticated ? "Choose an enrolled unit to continue your protected lesson sequence." : "Sign in before enrolment so payment and learning access are securely linked to your member record."}</p></aside></div><section className="mt-12 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-3">{courses.map(course => { const active = myLearning.data?.enrollments.some(enrollment => enrollment.courseCode === course.code && enrollment.status === "active"); return <article key={course.code} className="flex min-h-[320px] flex-col bg-[#120d11] p-6"><div className="flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-[.16em] text-[#e4bd78]">{course.code} · Level {course.level}</span>{active ? <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#9ed3b1]"><CheckCircle2 className="h-3.5 w-3.5" /> Enrolled</span> : <span className="text-[10px] font-bold uppercase tracking-[.12em] text-[#bbaaa1]">{coursePrice(course)}</span>}</div><h2 className="mt-6 font-display text-4xl leading-[.88] text-[#fff8ef]">{course.title}</h2><p className="mt-3 text-xs text-[#cbbab1]">{course.subtitle} · {course.hours} hrs</p><p className="mt-5 text-xs leading-5 text-[#ad9e95]">{course.learningOutcome}</p><div className="mt-auto pt-7"><button onClick={() => chooseCourse(course)} className="inline-flex min-h-10 items-center gap-2 text-xs font-bold uppercase tracking-[.13em] text-[#f1ce91] transition hover:text-[#fff8ef]"><CirclePlay className="h-4 w-4" /> {active ? "Continue class" : "View unit"}</button></div></article>})}</section><section className="mt-10 border border-[#e4bd78]/20 bg-[#160e13] p-6"><div className="flex gap-4"><Award className="mt-1 h-5 w-5 shrink-0 text-[#e4bd78]" /><div><h2 className="font-display text-3xl text-[#fff8ef]">Competency, not pressure.</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-[#cbbab1]">XP, badges and levels mark completed learning steps and defined competencies. They do not rank learners by personal disclosure, sexual activity, time in sensitive content, or social popularity. Course badges are issued only after every module has been completed.</p></div></div></section></main></div></div>;
}
