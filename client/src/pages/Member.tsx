import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, BookOpen, CheckCircle2, LogOut, Play, ShieldCheck } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useLocation } from "wouter";

const wordmark = "/manus-storage/fleshsesh-academy-wordmark_f79fa930.png";
const ageStorageKey = "fleshsesh_academy_age_confirmed_v2";

const memberCourses = [
  { code: "FSH 101", title: "Body Literacy", detail: "Foundations · 12 hrs" },
  { code: "FSH 102", title: "Consent, Boundaries & Communication", detail: "Essential · 10 hrs" },
  { code: "FSH 103", title: "Sexual Health, Hygiene & Self-Care", detail: "Foundation · 8 hrs" },
  { code: "FSH 104", title: "Relationships, Identity & Respect", detail: "Foundation · 9 hrs" },
  { code: "FSH 105", title: "STI & HIV Prevention Essentials", detail: "Foundation · 10 hrs" },
  { code: "FSH 201", title: "Contraception & Family Planning", detail: "Applied · 14 hrs" },
  { code: "FSH 202", title: "STI Testing, Treatment & Care Navigation", detail: "Applied · 12 hrs" },
  { code: "FSH 203", title: "Pleasure, Intimacy & Sexual Communication", detail: "Applied · 12 hrs" },
  { code: "FSH 204", title: "Relationship Dynamics & Conflict Repair", detail: "Applied · 12 hrs" },
  { code: "FSH 205", title: "LGBTQ+ Inclusive Sexual Health", detail: "Applied · 11 hrs" },
  { code: "FSH 206", title: "Digital Intimacy, Privacy & Safety", detail: "Applied · 10 hrs" },
  { code: "FSH 207", title: "Sexual Wellness & Mental Health", detail: "Applied · 11 hrs" },
  { code: "FSH 301", title: "Reproductive Health, Fertility & Life Planning", detail: "Integration · 14 hrs" },
  { code: "FSH 302", title: "Kink Education, Negotiation & Safety", detail: "Integration · 14 hrs" },
  { code: "FSH 303", title: "Communication for Educators & Advocates", detail: "Integration · 16 hrs" },
  { code: "FSH 304", title: "Sexual Rights, Ethics, Power & Social Context", detail: "Integration · 13 hrs" },
  { code: "FSH 305", title: "Inclusive Service & Curriculum Design", detail: "Integration · 15 hrs" },
  { code: "FSH 401", title: "Advanced Advocacy & Community Practice", detail: "Advanced · 18 hrs" },
  { code: "FSH 402", title: "Advanced Consent & Relationship Facilitation", detail: "Advanced · 16 hrs" },
  { code: "FSH 403", title: "Evidence, Evaluation & AI in Sexual Education", detail: "Advanced · 18 hrs" },
  { code: "FSH 404", title: "Capstone: Sexual Wellness Education Portfolio", detail: "Advanced · 24 hrs" },
];

type ProgressRecord = {
  courseCode: string;
  progressPercent: number;
  status: "not_started" | "in_progress" | "completed";
};

export default function Member() {
  const [, setLocation] = useLocation();
  const { user, loading, isAuthenticated, logout } = useAuth();
  const utils = trpc.useUtils();
  const previewHost = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname.endsWith(".manus.computer"));
  const previewMode = previewHost && new URLSearchParams(window.location.search).get("preview") === "academy";
  const ageVerified = previewMode || (typeof window !== "undefined" && window.localStorage.getItem(ageStorageKey) === "true");
  const progressQuery = trpc.learningProgress.list.useQuery(undefined, { enabled: isAuthenticated && ageVerified });
  const updateProgress = trpc.learningProgress.upsert.useMutation({
    onSuccess: () => utils.learningProgress.list.invalidate(),
  });

  useEffect(() => {
    if (!ageVerified) setLocation("/");
  }, [ageVerified, setLocation]);

  const progressRecords = (progressQuery.data ?? []) as ProgressRecord[];
  const progressByCourse = useMemo(() => new Map<string, ProgressRecord>(progressRecords.map(item => [item.courseCode, item])), [progressRecords]);
  const completedCount = progressRecords.filter(item => item.status === "completed").length;
  const averageProgress = memberCourses.length === 0 ? 0 : Math.round(memberCourses.reduce((total, course) => total + (progressByCourse.get(course.code)?.progressPercent ?? 0), 0) / memberCourses.length);

  const recordNextStep = (courseCode: string, currentPercent: number) => {
    const nextPercent = currentPercent === 0 ? 10 : Math.min(100, currentPercent + 25);
    updateProgress.mutate({ courseCode, progressPercent: nextPercent });
  };

  if (!ageVerified) return null;

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#0b090b] px-5 text-[#f6eee2]"><div className="border border-[#e4bd78]/25 bg-[#160e13] p-8 text-center"><img src={wordmark} alt="fleshsesh academy" className="mx-auto h-12 w-[190px] object-contain" /><p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e4bd78]">Opening your private learning record</p></div></div>;

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-[#0b090b] px-5 py-10 text-[#f6eee2] sm:px-8"><div className="mx-auto max-w-xl border border-[#e4bd78]/25 bg-[#160e13] p-8 sm:p-12"><img src={wordmark} alt="fleshsesh academy" className="h-14 w-[220px] object-contain object-left" /><p className="mt-10 text-[10px] font-bold uppercase tracking-[0.22em] text-[#e4bd78]">Member learning space</p><h1 className="mt-4 font-display text-5xl leading-[0.88] text-[#fff8ef]">Sign in to keep your <em className="text-[#f18dac]">place.</em></h1><p className="mt-6 max-w-md text-sm leading-6 text-[#cbbab1]">Your selected courses, learning progress and return points are saved privately to your member account.</p><button onClick={() => startLogin()} className="mt-9 inline-flex min-h-12 items-center justify-center bg-[#ef779d] px-5 text-xs font-bold uppercase tracking-[0.14em] text-[#260e17] transition hover:bg-[#f6a3b9] active:scale-[0.97]">Sign in to continue</button><button onClick={() => setLocation("/")} className="ml-5 text-xs font-semibold text-[#e7c888] hover:text-[#fff8ef]">Return to academy</button></div></div>;
  }

  return <div className="min-h-screen bg-[#0b090b] px-5 py-6 text-[#f6eee2] sm:px-8 lg:px-12 lg:py-10"><div className="mx-auto max-w-[1240px]"><header className="flex flex-col justify-between gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-center"><div className="flex items-center gap-5"><button onClick={() => setLocation("/")} className="flex h-10 w-10 items-center justify-center border border-white/15 text-[#e6c988] transition hover:border-[#e4bd78] hover:text-[#fff8ef]" aria-label="Return to academy"><ArrowLeft className="h-4 w-4" /></button><img src={wordmark} alt="fleshsesh academy" className="h-11 w-[190px] object-contain object-left" /></div><div className="flex items-center gap-4"><span className="text-xs text-[#cabcae]">{user?.name || "Member"}</span><button onClick={() => logout()} className="inline-flex items-center gap-2 text-xs font-semibold text-[#e7c888] transition hover:text-[#fff8ef]"><LogOut className="h-3.5 w-3.5" /> Sign out</button></div></header><main className="py-10"><div className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1.2fr_.8fr]"><div><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e4bd78]">Member dashboard</p><h1 className="mt-4 font-display text-6xl leading-[0.84] text-[#fff8ef]">Your learning<br /><em className="text-[#f18dac]">continues here.</em></h1><p className="mt-6 max-w-xl text-sm leading-6 text-[#cbbab1]">Each update is saved to your account. Continue a course when you are ready, or mark a completed learning step once you have finished it.</p></div><aside className="border border-[#e4bd78]/25 bg-[#160e13] p-6"><div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#e4bd78]"><ShieldCheck className="h-3.5 w-3.5" /> Private learning record</div><p className="mt-5 font-display text-5xl text-[#fff8ef]">{averageProgress}%</p><p className="mt-1 text-xs text-[#cbbab1]">Across the complete course atlas</p><Progress value={averageProgress} className="mt-5 h-2 bg-[#3a202b] [&>div]:bg-[#ef789d]" /><p className="mt-4 text-xs text-[#cbbab1]"><strong className="text-[#f2d49a]">{completedCount}</strong> of {memberCourses.length} courses completed</p></aside></div><section className="mt-10"><div className="flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e4bd78]">Saved routes</p><h2 className="mt-3 font-display text-4xl text-[#fff8ef]">Your course progress</h2></div><span className="text-xs text-[#91827a]">{progressQuery.isFetching ? "Updating your record…" : "Synced to your member account"}</span></div><div className="mt-6 grid gap-px border border-white/10 bg-white/10 lg:grid-cols-2">{memberCourses.map(course => { const record = progressByCourse.get(course.code); const percent = record?.progressPercent ?? 0; const isComplete = record?.status === "completed"; return <article key={course.code} className="bg-[#120d11] p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#e4bd78]">{course.code}</p><h3 className="mt-3 font-display text-3xl leading-[0.92] text-[#fff8ef]">{course.title}</h3><p className="mt-3 text-xs text-[#b9aaa1]">{course.detail}</p></div>{isComplete ? <CheckCircle2 className="h-5 w-5 shrink-0 text-[#e4bd78]" /> : <BookOpen className="h-5 w-5 shrink-0 text-[#bd7189]" />}</div><Progress value={percent} className="mt-8 h-2 bg-[#35212a] [&>div]:bg-[#ef789d]" /><div className="mt-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.13em]"><span className="text-[#e6c988]">{isComplete ? "Completed" : percent === 0 ? "Ready to begin" : "In progress"}</span><span className="text-[#cbbab1]">{percent}%</span></div><div className="mt-6 flex flex-wrap gap-3"><button disabled={updateProgress.isPending || isComplete} onClick={() => recordNextStep(course.code, percent)} className="inline-flex min-h-10 items-center gap-2 bg-[#ef789d] px-4 text-[10px] font-bold uppercase tracking-[0.13em] text-[#260e17] transition enabled:hover:bg-[#f6a3b9] disabled:cursor-not-allowed disabled:opacity-50"><Play className="h-3.5 w-3.5 fill-current" />{percent === 0 ? "Begin route" : "Save next step"}</button><button disabled={updateProgress.isPending || isComplete} onClick={() => updateProgress.mutate({ courseCode: course.code, progressPercent: 100, status: "completed" })} className="min-h-10 border border-[#e4bd78]/40 px-4 text-[10px] font-bold uppercase tracking-[0.13em] text-[#f2d49a] transition enabled:hover:border-[#f3d69b] enabled:hover:text-[#fff8ef] disabled:cursor-not-allowed disabled:opacity-50">Mark complete</button></div></article>})}</div></section></main></div></div>;
}
