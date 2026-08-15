import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { normalizeSyllabusShelf, syllabusShelfStorageKey, toggleSyllabusCourse } from "@/lib/syllabusShelf";
import { useSyllabusShelf } from "@/hooks/useSyllabusShelf";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, ArrowUpRight, BookOpen, CheckCircle2, ChevronLeft, CirclePlay, LockKeyhole, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { campusFacilities, type FacilityId } from "@shared/campusFacilities";

const wordmark = "/manus-storage/fleshsesh-academy-wordmark_f79fa930.png";
const courseImages = [
  "/manus-storage/fleshsesh-law-library-editorial_d61126d2.jpg",
  "/manus-storage/fleshsesh-eclinic-editorial_f01115b8.jpg",
  "/manus-storage/fleshsesh-residence-life-editorial_70ee9870.jpg",
  "/manus-storage/fleshsesh-esports-editorial_7a22e23b.jpg",
];
const ageStorageKey = "fleshsesh_academy_age_confirmed_v2";

type Course = {
  code: string;
  level: string;
  title: string;
  subtitle: string;
  hours: number;
  priceCents: number;
  currency: string;
  learningOutcome: string;
  assessment: string;
  badgeCode: string;
  modules: { id: string; title: string; summary: string; practice: string; check: string; xp: number }[];
};

const coursePrice = (course: Course) => new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: course.currency.toUpperCase(),
  maximumFractionDigits: 0,
}).format(course.priceCents / 100);

export default function Learning() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, loading } = useAuth();
  const catalogue = trpc.academy.catalogue.useQuery();
  const myLearning = trpc.academy.myLearning.useQuery(undefined, { enabled: isAuthenticated });
  const checkout = trpc.academy.checkout.useMutation({
    onSuccess: ({ url }) => {
      window.open(url, "_blank", "noopener,noreferrer");
      toast.success("Secure checkout opened in a new tab.");
    },
    onError: (error) => toast.error(error.message),
  });
  const completeLesson = trpc.academy.completeLesson.useMutation({
    onSuccess: () => myLearning.refetch(),
    onError: (error) => toast.error(error.message),
  });

  const previewHost = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname.endsWith(".manus.computer"));
  const previewValue = new URLSearchParams(window.location.search).get("preview");
  const previewMode = previewHost && (previewValue === "academy" || previewValue === "lesson");
  const lessonPreview = previewHost && previewValue === "lesson";
  const requestedFacility = new URLSearchParams(window.location.search).get("facility") as FacilityId | null;
  const activeFacility = campusFacilities.find((facility) => facility.id === requestedFacility) ?? null;
  const [selectedCourseCode, setSelectedCourseCode] = useState<string | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [shelfCodes, toggleShelf] = useSyllabusShelf();
  const ageVerified = previewMode || (typeof window !== "undefined" && window.localStorage.getItem(ageStorageKey) === "true");
  const courses = (catalogue.data ?? []) as Course[];
  const displayedCourses = activeFacility ? courses.filter((course) => activeFacility.courseCodes.includes(course.code)) : courses;
  const selectedCourse = courses.find((course) => course.code === selectedCourseCode) ?? null;
  const selectedModule = selectedCourse?.modules.find((module) => module.id === selectedModuleId) ?? selectedCourse?.modules[0] ?? null;
  const activeEnrollment = Boolean(selectedCourse && (lessonPreview || myLearning.data?.enrollments.some((enrolment) => enrolment.courseCode === selectedCourse.code && enrolment.status === "active")));
  const completedIds = useMemo(() => new Set(myLearning.data?.completions.map((completion) => completion.lessonId) ?? []), [myLearning.data?.completions]);
  const selectedImage = courseImages[Math.max(0, courses.findIndex((course) => course.code === selectedCourse?.code)) % courseImages.length] ?? courseImages[0];
  const shelfCourses = courses.filter((course) => shelfCodes.includes(course.code));

  useEffect(() => {
    if (!ageVerified) setLocation("/");
  }, [ageVerified, setLocation]);

  useEffect(() => {
    const requestedCourse = new URLSearchParams(window.location.search).get("course");
    if (requestedCourse) setSelectedCourseCode(requestedCourse);
  }, []);


  const updateShelf = (courseCode: string) => toggleShelf(courseCode);

  const cataloguePath = activeFacility
    ? `/learn?facility=${encodeURIComponent(activeFacility.id)}${previewMode ? "&preview=academy" : ""}`
    : previewMode ? "/learn?preview=academy" : "/learn";

  const chooseCourse = (course: Course) => {
    setSelectedCourseCode(course.code);
    setSelectedModuleId(course.modules[0]?.id ?? null);
    const params = new URLSearchParams({ course: course.code });
    if (activeFacility) params.set("facility", activeFacility.id);
    if (previewMode) params.set("preview", "academy");
    window.history.replaceState(null, "", `/learn?${params.toString()}`);
  };

  const beginCheckout = (course: Course) => isAuthenticated ? checkout.mutate({ courseCode: course.code }) : startLogin();
  const inShelf = (code: string) => shelfCodes.includes(code);

  if (!ageVerified || (loading && !previewMode)) return <div className="min-h-screen bg-[#061018]" />;

  if (selectedCourse && selectedModule) {
    const completedCount = selectedCourse.modules.filter((module) => completedIds.has(module.id)).length;
    const isModuleComplete = completedIds.has(selectedModule.id);
    return <main className="min-h-screen overflow-x-hidden bg-[#061018] text-[#eff4f1]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#061018]/90 backdrop-blur-xl"><div className="mx-auto flex h-[74px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <button onClick={() => { setSelectedCourseCode(null); window.history.replaceState(null, "", cataloguePath); }} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#f1dca4]"><ChevronLeft className="h-4 w-4" /> {activeFacility ? `${activeFacility.label} pathway` : "Learning atlas"}</button>
        <img src={wordmark} alt="fleshsesh | academy" className="h-8 w-[145px] object-contain" />
        <span className="hidden text-[9px] font-bold uppercase tracking-[.15em] text-[#9cb2ad] sm:block">Protected unit view</span>
      </div></header>
      <section className="relative overflow-hidden border-b border-white/10 px-5 pb-12 pt-14 sm:px-8 lg:px-12 lg:pb-20 lg:pt-20"><img src={selectedImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,13,20,.97),rgba(4,13,20,.74),rgba(4,13,20,.48))]" /><div className="relative mx-auto max-w-[1500px]"><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#e6c887]">{selectedCourse.code} · level {selectedCourse.level} · {selectedCourse.hours} hours</p><h1 className="mt-6 max-w-4xl font-display text-[clamp(4.5rem,9vw,9rem)] leading-[.71] tracking-[-.07em]">{selectedCourse.title}</h1><p className="mt-8 max-w-2xl text-base leading-7 text-[#d2dfdb]">{selectedCourse.learningOutcome}</p></div></section>
      {!activeEnrollment ? <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24"><div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[1.1fr_.9fr]"><div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#e6c887]">Unit orientation</p><h2 className="mt-5 font-display text-6xl leading-[.78] tracking-[-.055em]">Study at your<br /><em className="text-[#e49aa9]">own pace.</em></h2><p className="mt-8 max-w-xl text-sm leading-6 text-[#c6d5d1]">This unit has guided teaching modules, a non-disclosure practice route, a short knowledge check, and a competency-based completion record. You can step away and return whenever you need.</p><div className="mt-8 border-l-2 border-[#e49aa9] bg-[#102630] px-5 py-4"><p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#e6c887]">Assessment</p><p className="mt-2 text-sm leading-6 text-[#d4dfdb]">{selectedCourse.assessment}</p></div></div><aside className="border border-[#e6c887]/35 bg-[#0b1c26] p-6 sm:p-8"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#e6c887]">Single-unit enrolment</p><p className="mt-7 font-display text-7xl leading-none">{coursePrice(selectedCourse)}</p><p className="mt-4 text-xs leading-5 text-[#bdcec9]">One-time AUD payment. Secure checkout unlocks the protected course after confirmed enrolment.</p><button onClick={() => beginCheckout(selectedCourse)} disabled={checkout.isPending} className="mt-8 flex w-full items-center justify-between bg-[#e49aa9] px-5 py-4 text-left text-xs font-bold uppercase tracking-[.14em] text-[#061018] transition hover:bg-[#f0b1bb] disabled:opacity-50"><span className="inline-flex items-center gap-2"><LockKeyhole className="h-4 w-4" /> {isAuthenticated ? "Secure checkout" : "Sign in to enrol"}</span><ArrowUpRight className="h-4 w-4" /></button><button onClick={() => updateShelf(selectedCourse.code)} className="mt-3 flex w-full items-center justify-between border border-white/25 px-5 py-4 text-left text-[10px] font-bold uppercase tracking-[.14em] text-[#f1dca4] hover:border-[#e6c887]"><span>{inShelf(selectedCourse.code) ? `Remove ${selectedCourse.code}` : `Save ${selectedCourse.code}`} · private shelf</span><BookOpen className="h-4 w-4" /></button><p className="mt-4 text-[10px] leading-5 text-[#9db1ac]">The shelf stores this course code only in this browser. It never creates an enrolment, progress, reward, or disclosure record.</p></aside></div></section> : <section className="px-5 py-8 sm:px-8 lg:px-12 lg:py-12"><div className="mx-auto grid max-w-[1500px] gap-4 xl:grid-cols-[280px_1fr_260px]"><aside className="border border-white/10 bg-[#0b1c26] p-5"><p className="text-[9px] font-bold uppercase tracking-[.17em] text-[#e6c887]">Teaching sequence</p><div className="mt-6 space-y-2">{selectedCourse.modules.map((module, index) => <button key={module.id} onClick={() => setSelectedModuleId(module.id)} className={`w-full border p-3 text-left transition ${selectedModule.id === module.id ? "border-[#e49aa9] bg-[#3a2230]" : "border-white/10 hover:border-[#e6c887]/55"}`}><span className="text-[9px] font-bold uppercase tracking-[.13em] text-[#e6c887]">{completedIds.has(module.id) ? "Completed" : `Module ${String(index + 1).padStart(2, "0")}`}</span><span className="mt-2 block text-xs leading-4 text-[#d4dfdb]">{module.title}</span></button>)}</div></aside><article className="border border-white/10 bg-[#102630] p-6 sm:p-10"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#e6c887]">Current module · {selectedCourse.modules.findIndex((module) => module.id === selectedModule.id) + 1}</p><h2 className="mt-5 font-display text-6xl leading-[.78] tracking-[-.055em]">{selectedModule.title}</h2><div className="mt-10 grid gap-5"><section className="border-y border-white/10 py-6"><p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#e49aa9]">Explore</p><p className="mt-3 text-sm leading-7 text-[#d2dfdb]">{selectedModule.summary}</p></section><section className="border-l-2 border-[#e6c887] bg-[#071720] p-5"><p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#e6c887]">Practice without disclosure</p><p className="mt-3 text-sm leading-6 text-[#d2dfdb]">{selectedModule.practice}</p></section><section className="border border-[#e49aa9]/35 bg-[#30202b] p-5"><p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#f0aab8]">Knowledge check</p><p className="mt-3 text-sm leading-6 text-[#f0e7ea]">{selectedModule.check}</p></section></div><button onClick={() => completeLesson.mutate({ courseCode: selectedCourse.code, lessonId: selectedModule.id })} disabled={isModuleComplete || completeLesson.isPending} className="mt-9 inline-flex items-center gap-2 bg-[#e49aa9] px-5 py-4 text-xs font-bold uppercase tracking-[.14em] text-[#061018] disabled:opacity-50">{isModuleComplete ? <CheckCircle2 className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}{isModuleComplete ? "Learning step recorded" : `Complete step · +${selectedModule.xp} XP`}</button></article><aside className="space-y-3"><div className="border border-white/10 bg-[#0b1c26] p-5"><p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#e6c887]">Unit progress</p><p className="mt-4 font-display text-6xl">{Math.round((completedCount / selectedCourse.modules.length) * 100)}%</p><p className="mt-2 text-xs text-[#bcd0cb]">{completedCount} of {selectedCourse.modules.length} modules complete</p></div><div className="border border-[#e6c887]/30 bg-[#102630] p-5"><p className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.16em] text-[#e6c887]"><Trophy className="h-3.5 w-3.5" /> Learning record</p><p className="mt-4 font-display text-4xl">Level {myLearning.data?.rewards?.level ?? 1}</p><p className="mt-2 text-xs text-[#bcd0cb]">{myLearning.data?.rewards?.xp ?? 0} XP · {myLearning.data?.rewards?.currentStreak ?? 0}-day learning rhythm</p><p className="mt-4 text-[10px] leading-5 text-[#9db1ac]">Rewards recognise completion and competency, never personal disclosure or time in sensitive content.</p></div><button onClick={() => updateShelf(selectedCourse.code)} className="w-full border border-white/20 p-5 text-left text-[10px] font-bold uppercase tracking-[.14em] text-[#f1dca4] hover:border-[#e6c887]">{inShelf(selectedCourse.code) ? `Remove ${selectedCourse.code}` : `Save ${selectedCourse.code}`} · private shelf</button></aside></div></section>}</main>;
  }

  return <main className="min-h-screen overflow-x-hidden bg-[#061018] text-[#eff4f1]">
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#061018]/90 backdrop-blur-xl"><div className="mx-auto flex h-[74px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12"><button onClick={() => setLocation(activeFacility ? "/campus?preview=academy" : `/${previewMode ? "?preview=academy" : ""}`)} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#f1dca4]"><ArrowLeft className="h-4 w-4" /> {activeFacility ? "Campus map" : "eCampus home"}</button><img src={wordmark} alt="fleshsesh | academy" className="h-8 w-[145px] object-contain" /><span className="hidden text-[9px] font-bold uppercase tracking-[.14em] text-[#9eb2ad] sm:block">Paid learning atlas</span></div></header>
    <section className="relative overflow-hidden px-5 pb-16 pt-16 sm:px-8 lg:px-12 lg:pb-24 lg:pt-24"><img src={activeFacility?.image ?? courseImages[0]} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,13,20,.97),rgba(4,13,20,.76),rgba(4,13,20,.38))]" /><div className="relative mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[1fr_.62fr] lg:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#e6c887]">{activeFacility ? `${activeFacility.label} pathway` : "The learning atlas"}</p><h1 className="mt-6 font-display text-[clamp(5rem,10vw,10rem)] leading-[.7] tracking-[-.075em]">{activeFacility ? <>{activeFacility.courseLabel}<br /><em className="text-[#e49aa9]">starts here.</em></> : <>Choose a unit.<br /><em className="text-[#e49aa9]">Keep the thread.</em></>}</h1><p className="mt-8 max-w-2xl text-base leading-7 text-[#d0ded9]">{activeFacility ? `${activeFacility.description} This collection shows the units mapped to this room.` : "Twenty-one adult-learning units built around evidence, agency, consent, and self-paced learning. Start with a room or browse the complete atlas."}</p></div><aside className="border border-white/20 bg-[#071720]/72 p-5 backdrop-blur-md"><p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#e6c887]">Private syllabus shelf · {shelfCodes.length}</p><p className="mt-5 font-display text-5xl">Keep a<br /><em className="text-[#e49aa9]">private thread.</em></p><p className="mt-3 text-xs leading-5 text-[#c6d5d1]">This browser stores selected course codes only. It does not create a member account, enrolment, progress, reward, or disclosure record.</p><button onClick={() => setLocation(previewMode ? "/orientation?preview=academy" : "/orientation")} className="mt-5 inline-flex items-center gap-2 border-b border-[#e6c887]/60 pb-1 text-[10px] font-bold uppercase tracking-[.14em] text-[#f1dca4]">Manage shelf <ArrowUpRight className="h-3.5 w-3.5" /></button>{activeFacility && <button onClick={() => setLocation(previewMode ? "/learn?preview=academy" : "/learn")} className="ml-5 mt-5 inline-flex border-b border-white/20 pb-1 text-[10px] font-bold uppercase tracking-[.14em] text-[#d2dfdb]">View all units</button>}</aside></div></section>
    <section className="px-5 py-12 sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto max-w-[1500px]"><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{displayedCourses.map((course, index) => { const enrolled = myLearning.data?.enrollments.some((item) => item.courseCode === course.code && item.status === "active"); return <article key={course.code} className="group relative min-h-[350px] overflow-hidden border border-white/10"><img src={courseImages[index % courseImages.length]} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-700 group-hover:scale-[1.05] group-hover:opacity-70" /><div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,13,20,.96),rgba(4,13,20,.12)_76%)]" /><div className="relative flex h-full flex-col justify-end p-6"><div className="absolute left-6 right-6 top-6 flex items-start justify-between gap-2"><span className="border border-white/25 bg-[#061018]/60 px-2 py-1 text-[9px] font-bold uppercase tracking-[.14em] text-[#e6c887]">{course.code} · {course.hours}h</span><button onClick={() => updateShelf(course.code)} className={`border px-2 py-1 text-[9px] font-bold uppercase tracking-[.11em] ${inShelf(course.code) ? "border-[#e49aa9] bg-[#3a2230] text-[#f2c7cf]" : "border-white/30 bg-[#061018]/70 text-[#f1dca4] hover:border-[#e6c887]"}`}>{inShelf(course.code) ? "Remove" : "Save"}</button></div><p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#e6c887]">Level {course.level}{enrolled ? " · enrolled" : ""}</p><h2 className="mt-3 font-display text-5xl leading-[.8]">{course.title}</h2><p className="mt-4 text-xs leading-5 text-[#cedbd7]">{course.subtitle}</p><button onClick={() => chooseCourse(course)} className="mt-6 inline-flex items-center gap-2 self-start text-[10px] font-bold uppercase tracking-[.14em] text-[#f1dca4] hover:text-[#e6c887]">{enrolled ? "Continue unit" : "View unit"} <CirclePlay className="h-4 w-4" /></button></div></article>; })}</div>{shelfCourses.length > 0 && <div className="mt-8 border border-[#e6c887]/35 bg-[#0b1c26] p-5"><p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#e6c887]">Saved on this browser · {shelfCourses.length}</p><div className="mt-4 flex flex-wrap gap-2">{shelfCourses.map((course) => <button key={course.code} onClick={() => chooseCourse(course)} className="border border-white/15 px-3 py-2 text-left text-[10px] font-bold uppercase tracking-[.12em] text-[#dce9e5] hover:border-[#e6c887]">{course.code} · {course.title}</button>)}</div></div>}<div className="mt-10 flex items-start gap-3 border-l-2 border-[#e6c887] bg-[#102630] px-5 py-4 text-xs leading-5 text-[#c8d7d3]"><ShieldCheck className="mt-.5 h-4 w-4 shrink-0 text-[#e6c887]" /><p>Each unit combines teaching, a non-disclosure practice route, a knowledge check, and competency-based completion. The private shelf is optional, browser-local, and independent from paid enrolment and learning records.</p></div></div></section>
  </main>;
}
