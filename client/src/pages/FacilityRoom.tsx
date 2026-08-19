import { ArrowLeft, ArrowUpRight, BookOpen, Headphones, HeartHandshake, Library } from "lucide-react";
import { useLocation, useRoute } from "wouter";
import { campusFacilities, type FacilityId } from "@shared/campusFacilities";

const wordmark = "/manus-storage/fleshsesh-academy-lockup-primary_c4730d25.png";
const icons: Record<FacilityId, typeof BookOpen> = { classroom: BookOpen, "student-services": Headphones, auditorium: Library };

export default function FacilityRoom() {
  const [, params] = useRoute("/campus/:facility");
  const [, setLocation] = useLocation();
  const previewMode = import.meta.env.DEV && new URLSearchParams(window.location.search).get("preview") === "academy";
  const withPreview = (path: string) => previewMode ? `${path}${path.includes("?") ? "&" : "?"}preview=academy` : path;
  const facility = campusFacilities.find((place) => place.id === params?.facility) ?? campusFacilities[0];
  const Icon = icons[facility.id];
  const details: Record<FacilityId, { title: string; copy: string; action: string; path: string; icon: typeof BookOpen }> = {
    classroom: { title: "Begin or continue one mission.", copy: "This is the only space a new learner needs to understand: one small idea, one action, and one clear next step.", action: "Start a mission", path: "/orientation", icon: BookOpen },
    "student-services": { title: "Get simple next-step help.", copy: "Use this when you need help finding a unit, understanding the eCampus, or opening a public support route—without telling a personal story.", action: "Open care support", path: "/care", icon: HeartHandshake },
    auditorium: { title: "Choose deeper context only when useful.", copy: "This is optional. It is for wider perspectives, special guests, and further study after the basic ideas already make sense.", action: "Browse learning", path: "/learn", icon: Library },
  };
  const detail = details[facility.id];
  const DetailIcon = detail.icon;

  return <main className="min-h-screen bg-[#061018] text-[#eff4f1]"><header className="sticky top-0 z-40 border-b border-white/10 bg-[#061018]/90 backdrop-blur-xl"><div className="mx-auto flex min-h-[88px] max-w-[1500px] items-center justify-between gap-3 px-5 py-2 sm:px-8 lg:px-12"><button onClick={() => setLocation(withPreview("/campus"))} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#f1dca4]"><ArrowLeft className="h-3.5 w-3.5" /> Support spaces</button><img src={wordmark} alt="fleshsesh | academy" className="h-[58px] w-[180px] object-cover object-center sm:h-[72px] sm:w-[240px]" /><button onClick={() => setLocation(withPreview("/orientation"))} className="text-[10px] font-bold uppercase tracking-[.14em] text-[#f1dca4]">Start mission</button></div></header>
    <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><img src={facility.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,13,20,.98),rgba(4,13,20,.72),rgba(4,13,20,.4))]" /><div className="relative mx-auto max-w-[1500px]"><Icon className="h-6 w-6 text-[#e6c887]" /><p className="mt-8 text-[10px] font-bold uppercase tracking-[.22em] text-[#e6c887]">{facility.eyebrow}</p><h1 className="mt-6 max-w-4xl font-display text-[clamp(5rem,10vw,10rem)] leading-[.7] tracking-[-.07em]">{facility.label}</h1><p className="mt-8 max-w-xl text-base leading-7 text-[#d0ded9]">{facility.description}</p></div></section>
    <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto max-w-[900px] border border-white/15 bg-[#0b1c26] p-7 sm:p-10"><DetailIcon className="h-6 w-6 text-[#e6c887]" /><p className="mt-8 text-[9px] font-bold uppercase tracking-[.16em] text-[#e6c887]">One useful thing</p><h2 className="mt-4 font-display text-5xl leading-[.82]">{detail.title}</h2><p className="mt-7 max-w-2xl text-sm leading-7 text-[#c9d7d4]">{detail.copy}</p><button onClick={() => setLocation(withPreview(detail.path))} className="mt-9 inline-flex items-center gap-3 bg-[#e49aa9] px-6 py-5 text-xs font-bold uppercase tracking-[.16em] text-[#061018]">{detail.action} <ArrowUpRight className="h-4 w-4" /></button><p className="mt-6 text-[10px] leading-5 text-[#aabcb7]">You can leave this space at any time. It does not create a profile, record progress, or request a personal disclosure.</p></div></section>
  </main>;
}
