import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, BookOpen, HeartHandshake, Headphones, Library, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";

const wordmark = "/manus-storage/fleshsesh-academy-lockup-primary_c4730d25.png";
const classroomScene = "/manus-storage/fleshsesh-eclinic-editorial_f01115b8.jpg";
const ageStorageKey = "fleshsesh_academy_age_confirmed_v2";
const ageStorageDateKey = "fleshsesh_academy_age_confirmed_at";

function withPreview(path: string, previewMode: boolean) {
  return previewMode ? `${path}${path.includes("?") ? "&" : "?"}preview=academy` : path;
}

export default function Home() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const previewMode = import.meta.env.DEV && new URLSearchParams(window.location.search).get("preview") === "academy";
  const forceAgeGate = import.meta.env.DEV && new URLSearchParams(window.location.search).get("preview") === "age-gate";
  const [ready, setReady] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(previewMode && !forceAgeGate);
  const [ageAccepted, setAgeAccepted] = useState(false);

  useEffect(() => {
    if (!previewMode || forceAgeGate) setAgeConfirmed(window.localStorage.getItem(ageStorageKey) === "true");
    setReady(true);
  }, [forceAgeGate, previewMode]);

  const enter = () => {
    window.localStorage.setItem(ageStorageKey, "true");
    window.localStorage.setItem(ageStorageDateKey, new Date().toISOString());
    setAgeConfirmed(true);
  };
  const startMission = () => setLocation(withPreview("/orientation", previewMode));
  const openSupport = () => setLocation(withPreview("/campus/student-services", previewMode));
  const openMember = () => isAuthenticated ? setLocation(withPreview("/member", previewMode)) : startLogin();

  if (!ready) return <div className="min-h-screen bg-[#061018]" />;
  if (!ageConfirmed) return <main className="grid min-h-screen place-items-center bg-[#061018] px-5 py-8 text-[#eff4f1]"><section className="w-full max-w-xl border border-white/15 bg-[#0b1c26] p-7 sm:p-10"><img src={wordmark} alt="fleshsesh | academy" className="h-[96px] w-[340px] max-w-full object-cover object-center" /><p className="mt-10 text-[10px] font-bold uppercase tracking-[.22em] text-[#e6c887]">Adults only · private learning</p><h1 className="mt-5 font-display text-6xl leading-[.78]">Start with<br /><em className="text-[#e49aa9]">one small step.</em></h1><h2 className="mt-6 font-display text-3xl leading-none text-[#f1dca4]">Adult learning about bodies, sex, sexuality, and wellbeing</h2><p className="mt-7 text-sm leading-6 text-[#c9d7d4]">Confirm your age to access a calm, adult-only learning space. You do not need to share a personal story to begin.</p><label className="mt-8 flex cursor-pointer gap-3 border-y border-white/10 py-5 text-sm leading-6"><input type="checkbox" checked={ageAccepted} onChange={(event) => setAgeAccepted(event.target.checked)} className="mt-1 h-4 w-4 accent-[#e49aa9]" /><span>I confirm that I am <strong>18 years of age or older.</strong></span></label><button disabled={!ageAccepted} onClick={enter} className="mt-7 inline-flex items-center gap-3 bg-[#e49aa9] px-5 py-4 text-xs font-bold uppercase tracking-[.15em] text-[#061018] disabled:cursor-not-allowed disabled:opacity-40">Enter eCampus <ArrowUpRight className="h-4 w-4" /></button><p className="mt-6 flex gap-2 text-[10px] leading-5 text-[#a9bbb8]"><ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#e6c887]" />This confirmation is only stored in this browser and can be cleared at any time.</p></section></main>;

  return <main className="min-h-screen overflow-x-hidden bg-[#061018] text-[#eff4f1]"><header className="sticky top-0 z-40 border-b border-white/10 bg-[#061018]/90 backdrop-blur-xl"><div className="mx-auto flex min-h-[88px] max-w-[1500px] items-center justify-between gap-3 px-5 py-2 sm:px-8 lg:px-12"><img src={wordmark} alt="fleshsesh | academy" className="h-[58px] w-[180px] object-cover object-center sm:h-[72px] sm:w-[240px]" /><div className="flex items-center gap-4"><button onClick={openSupport} className="hidden text-[10px] font-bold uppercase tracking-[.14em] text-[#f1dca4] sm:block">Get help</button><button onClick={openMember} className="border border-[#e6c887]/65 px-3 py-2 text-[10px] font-bold uppercase tracking-[.12em] text-[#f1dca4]">{isAuthenticated ? "My learning" : "Sign in"}</button></div></div></header>
    <section className="relative overflow-hidden border-b border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><img src={classroomScene} alt="Quiet classroom for adult learning" className="absolute inset-0 h-full w-full object-cover opacity-35" /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,13,20,.98),rgba(4,13,20,.8),rgba(4,13,20,.42))]" /><div className="relative mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1fr_430px] lg:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#e6c887]">Free first mission · about five minutes</p><h1 className="mt-7 max-w-4xl font-display text-[clamp(5rem,11vw,10rem)] leading-[.69] tracking-[-.075em]">Learn. Try.<br /><em className="text-[#e49aa9]">Choose what’s next.</em></h1><p className="mt-8 max-w-xl text-base leading-7 text-[#d0ded9]">A calm, practical starting point for adult learning about bodies, consent, relationships, or wellbeing. You only need to take one small step.</p><button onClick={startMission} className="mt-9 inline-flex items-center gap-3 bg-[#e49aa9] px-6 py-5 text-xs font-bold uppercase tracking-[.16em] text-[#061018]">Start free <ArrowUpRight className="h-4 w-4" /></button><p className="mt-5 text-[10px] leading-5 text-[#b7c8c3]">No account, payment, personal story, or progress record is needed to try it.</p></div><div className="border border-white/20 bg-[#071720]/85 p-6 backdrop-blur-md"><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#e6c887]">A five-minute loop</p><div className="mt-7 space-y-5">{[["1", "Learn one idea.", "A short explanation, not a wall of text."], ["2", "Try one action.", "A general scenario—never your personal history."], ["3", "Choose what’s next.", "Continue, pause, or ask for simple help."]].map(([number, title, copy]) => <div key={number} className="flex gap-4"><span className="font-display text-4xl text-[#e6c887]">{number}</span><p className="text-sm leading-5 text-[#c9d7d4]"><strong className="block text-[#eff4f1]">{title}</strong>{copy}</p></div>)}</div></div></div></section>
    <section className="px-5 py-12 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[1500px] flex-col gap-6 border-b border-white/10 pb-12 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#e6c887]">Background support</p><p className="mt-3 max-w-xl text-sm leading-6 text-[#c7d5d1]">You do not need to understand the campus before you start learning. Support is here only when it is useful.</p></div><div className="flex flex-wrap gap-3"><button onClick={openSupport} className="inline-flex items-center gap-2 border border-white/20 px-5 py-4 text-[10px] font-bold uppercase tracking-[.14em] text-[#f1dca4]"><Headphones className="h-4 w-4" /> Get simple help</button><button onClick={() => setLocation(withPreview("/care", previewMode))} className="inline-flex items-center gap-2 border border-white/20 px-5 py-4 text-[10px] font-bold uppercase tracking-[.14em] text-[#f1dca4]"><HeartHandshake className="h-4 w-4" /> Care support</button></div></div></section>
    <section className="px-5 pb-16 sm:px-8 lg:px-12"><div className="mx-auto grid max-w-[1500px] gap-3 md:grid-cols-3"><article className="border border-white/15 bg-[#0b1c26] p-6"><BookOpen className="h-5 w-5 text-[#e6c887]" /><p className="mt-7 text-[9px] font-bold uppercase tracking-[.16em] text-[#e6c887]">Start here</p><h2 className="mt-3 font-display text-4xl">Classroom</h2><p className="mt-4 text-sm leading-6 text-[#c6d5d1]">One mission, one idea, one action, one next step.</p></article><article className="border border-white/15 bg-[#0b1c26] p-6"><Headphones className="h-5 w-5 text-[#e6c887]" /><p className="mt-7 text-[9px] font-bold uppercase tracking-[.16em] text-[#e6c887]">Only when useful</p><h2 className="mt-3 font-display text-4xl">Student Services</h2><p className="mt-4 text-sm leading-6 text-[#c6d5d1]">Simple platform help and next-step guidance without a personal story.</p></article><article className="border border-white/15 bg-[#0b1c26] p-6"><Library className="h-5 w-5 text-[#e6c887]" /><p className="mt-7 text-[9px] font-bold uppercase tracking-[.16em] text-[#e6c887]">Optional deeper context</p><h2 className="mt-3 font-display text-4xl">Auditorium</h2><p className="mt-4 text-sm leading-6 text-[#c6d5d1]">Special perspectives and deeper learning after the basics make sense.</p></article></div></section>
  </main>;
}
