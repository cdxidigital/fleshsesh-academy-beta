import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Check,
  CircleStop,
  Compass,
  Gamepad2,
  HeartPulse,
  Library,
  LockKeyhole,
  Pause,
  Play,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  campusFacilities,
  canStartDeviceSession,
  emergencyStopMessage,
  tournamentSessionMessage,
  transitionTournamentSession,
  type DeviceConsentState,
  type FacilityId,
  type TournamentSessionStatus,
} from "@shared/campusFacilities";

const emblem = "/manus-storage/fleshsesh-academy-emblem_79c8c72e.png";
const wordmark = "/manus-storage/fleshsesh-academy-lockup-primary_c4730d25.png";
const ageStorageKey = "fleshsesh_academy_age_confirmed_v2";
const facilityIcons = { eclinic: HeartPulse, "law-library": Library, "residence-life": Users, esports: Gamepad2 } as const;
const blankConsent: DeviceConsentState = { adultConfirmed: false, ownerConfirmed: false, voluntaryConfirmed: false, privacyConfirmed: false };

export default function Campus() {
  const [, setLocation] = useLocation();
  const previewMode = import.meta.env.DEV && new URLSearchParams(window.location.search).get("preview") === "academy";
  const [ageReady, setAgeReady] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(previewMode);
  const [selectedFacility, setSelectedFacility] = useState<FacilityId>("eclinic");
  const [deviceConsent, setDeviceConsent] = useState<DeviceConsentState>(blankConsent);
  const [tournamentStatus, setTournamentStatus] = useState<TournamentSessionStatus>("idle");
  const [safetyNotice, setSafetyNotice] = useState("The Arena is a non-live preview. No provider or personal device is connected.");
  const activeFacility = useMemo(() => campusFacilities.find((facility) => facility.id === selectedFacility) ?? campusFacilities[0], [selectedFacility]);
  const consentComplete = canStartDeviceSession(deviceConsent);
  const homePath = previewMode ? "/?preview=academy" : "/";

  useEffect(() => {
    if (!previewMode) setAgeConfirmed(window.localStorage.getItem(ageStorageKey) === "true");
    if (window.location.hash === "#arena-lobby") setSelectedFacility("esports");
    setAgeReady(true);
  }, [previewMode]);

  useEffect(() => {
    if (!ageReady || window.location.hash !== "#arena-lobby") return;
    const frame = window.requestAnimationFrame(() => document.getElementById("arena-lobby")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    return () => window.cancelAnimationFrame(frame);
  }, [ageReady]);

  const chooseFacility = (id: FacilityId) => {
    setSelectedFacility(id);
    window.setTimeout(() => document.getElementById("facility-preview")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };
  const toggleConsent = (key: keyof DeviceConsentState) => setDeviceConsent((state) => ({ ...state, [key]: !state[key] }));
  const updateTournament = (action: "start" | "pause" | "stop" | "disconnect") => {
    const next = transitionTournamentSession(tournamentStatus, action, consentComplete);
    setTournamentStatus(next);
    if (action === "stop") setSafetyNotice(emergencyStopMessage(false));
    if (action === "disconnect") setSafetyNotice("Disconnect requested. This non-live preview stores no pairing, device, or activity data.");
  };

  if (!ageReady) return <div className="min-h-screen bg-[#061018]" />;
  if (!ageConfirmed) return <main className="grid min-h-screen place-items-center bg-[#061018] px-5 text-[#eff4f1]"><section className="max-w-xl border border-white/15 bg-[#0b1c26] p-8 sm:p-12"><img src={wordmark} alt="fleshsesh | academy" className="h-[96px] w-[340px] max-w-full object-cover object-center" /><p className="mt-10 text-[10px] font-bold uppercase tracking-[.22em] text-[#e6c887]">Campus entry</p><h1 className="mt-4 font-display text-6xl leading-[.78] tracking-[-.05em]">Confirm the<br /><em className="text-[#e49aa9]">adult gateway.</em></h1><p className="mt-6 text-sm leading-6 text-[#c3d3cf]">The visual campus and its learning rooms share the eCampus 18+ entry boundary.</p><button onClick={() => setLocation(homePath)} className="mt-9 inline-flex items-center gap-2 bg-[#e49aa9] px-5 py-4 text-xs font-bold uppercase tracking-[.14em] text-[#061018]">Return to entry <ArrowUpRight className="h-4 w-4" /></button></section></main>;

  return <main className="min-h-screen overflow-x-hidden bg-[#061018] text-[#eff4f1]"><header className="sticky top-0 z-40 border-b border-white/10 bg-[#061018]/85 backdrop-blur-xl"><div className="mx-auto flex min-h-[88px] py-2 max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12"><button onClick={() => setLocation(homePath)} className="flex items-center gap-3" aria-label="Return to eCampus"><img src={emblem} alt="" className="h-9 w-9 rounded-full ring-1 ring-[#e6c887]/55" /><span className="hidden text-[10px] font-bold uppercase tracking-[.16em] text-[#e6c887] sm:block">eCampus home</span></button><img src={wordmark} alt="fleshsesh | academy" className="h-[58px] w-[180px] object-cover object-center sm:h-[72px] sm:w-[240px]" /><button onClick={() => setLocation(`/learn${previewMode ? "?preview=academy" : ""}`)} className="inline-flex items-center gap-2 border-b border-[#e6c887]/60 pb-1 text-[10px] font-bold uppercase tracking-[.14em] text-[#f1dca4]">Learning atlas <ArrowUpRight className="h-3.5 w-3.5" /></button></div></header>

    <section className="relative min-h-[690px] overflow-hidden px-5 pb-16 pt-16 sm:px-8 lg:px-12 lg:pb-24 lg:pt-24"><img src={activeFacility.image} alt="" className="absolute inset-0 h-full w-full object-cover object-center" /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,13,20,.96),rgba(4,13,20,.74)_38%,rgba(4,13,20,.2)_100%)]" /><div className="relative mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-[1fr_440px] lg:items-end"><div><button onClick={() => setLocation(homePath)} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#d5e0dc] transition hover:text-[#e6c887]"><ArrowLeft className="h-3.5 w-3.5" /> eCampus home</button><p className="mt-24 text-[10px] font-bold uppercase tracking-[.24em] text-[#e6c887]">Four worlds · one adult-learning campus</p><h1 className="mt-6 font-display text-[clamp(5rem,10vw,10rem)] leading-[.7] tracking-[-.075em]">Choose your<br /><em className="text-[#e49aa9]">next room.</em></h1><p className="mt-9 max-w-xl text-base leading-7 text-[#d3dfdb]">A visual campus with four distinct learning environments. Choose by mood, subject, or the kind of conversation you want to have next.</p></div><div className="border border-white/20 bg-[#071720]/72 p-5 backdrop-blur-md"><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#e6c887]">Currently framed</p><p className="mt-3 font-display text-5xl leading-[.82]">{activeFacility.label}</p><p className="mt-5 text-sm leading-6 text-[#cedbd7]">{activeFacility.description}</p><button onClick={() => setLocation(`/campus/${activeFacility.id}${previewMode ? "?preview=academy" : ""}`)} className="mt-7 inline-flex items-center gap-2 bg-[#e6c887] px-4 py-3 text-[10px] font-bold uppercase tracking-[.14em] text-[#061018]">Enter the room <ArrowUpRight className="h-3.5 w-3.5" /></button></div></div></section>

    <section className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16"><div className="mx-auto grid max-w-[1600px] gap-3 md:grid-cols-2 xl:grid-cols-4">{campusFacilities.map((facility) => { const Icon = facilityIcons[facility.id]; const selected = facility.id === selectedFacility; return <button key={facility.id} onClick={() => chooseFacility(facility.id)} className={`group relative min-h-[390px] overflow-hidden border text-left transition ${selected ? "border-[#e49aa9]" : "border-white/10 hover:border-[#e6c887]/70"}`}><img src={facility.image} alt={`${facility.label} campus scene`} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]" /><div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,13,20,.95),rgba(4,13,20,.08)_72%)]" /><div className="relative flex h-full flex-col justify-end p-6"><span className="absolute left-6 top-6 grid h-10 w-10 place-items-center border border-white/30 bg-[#061018]/55 text-[#e6c887] backdrop-blur-sm"><Icon className="h-5 w-5" /></span><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#e6c887]">{facility.eyebrow}</p><h2 className="mt-3 font-display text-5xl leading-[.82]">{facility.label}</h2><p className="mt-4 text-xs leading-5 text-[#d2dfdb]">{facility.description}</p><span className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#f1dca4]">Preview this world <ArrowUpRight className="h-3.5 w-3.5" /></span></div></button>})}</div></section>

    <section id="facility-preview" className="border-y border-white/10 bg-[#102630] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div className="relative aspect-[4/3] overflow-hidden border border-white/15"><img src={activeFacility.image} alt={`${activeFacility.label} visual scene`} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,13,20,.72),transparent_62%)]" /><p className="absolute bottom-5 left-5 text-[9px] font-bold uppercase tracking-[.18em] text-[#e6c887]">{activeFacility.eyebrow}</p></div><div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#e6c887]">Room brief</p><h2 className="mt-5 font-display text-7xl leading-[.76] tracking-[-.06em]">{activeFacility.label}</h2><p className="mt-7 max-w-2xl text-base leading-7 text-[#cad8d4]">{activeFacility.description}</p><p className="mt-7 border-l-2 border-[#e49aa9] bg-[#071720] px-5 py-4 text-sm leading-6 text-[#d4dfdb]">{activeFacility.note}</p><div className="mt-7 flex flex-wrap gap-2">{activeFacility.courseCodes.map((course) => <span key={course} className="border border-[#e6c887]/35 px-3 py-2 text-[9px] font-bold uppercase tracking-[.14em] text-[#f1dca4]">{course}</span>)}</div><div className="mt-8 flex flex-wrap gap-3"><button onClick={() => setLocation(`/campus/${activeFacility.id}${previewMode ? "?preview=academy" : ""}`)} className="inline-flex items-center gap-2 bg-[#e6c887] px-5 py-4 text-xs font-bold uppercase tracking-[.14em] text-[#061018]">Enter {activeFacility.label} <ArrowUpRight className="h-4 w-4" /></button><button onClick={() => setLocation(`/learn?facility=${activeFacility.id}${previewMode ? "&preview=academy" : ""}`)} className="inline-flex items-center gap-2 border border-white/25 px-5 py-4 text-xs font-bold uppercase tracking-[.14em] text-[#f3f1ea] transition hover:border-[#e49aa9]">Open mapped units <BookOpen className="h-4 w-4" /></button></div></div></div></section>

    <section id="arena-lobby" className="relative overflow-hidden bg-[#071720] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><img src={campusFacilities.find((facility) => facility.id === "esports")?.image} alt="" className="pointer-events-none absolute inset-y-0 right-0 h-full w-[47%] object-cover opacity-20" /><div className="pointer-events-none absolute inset-y-0 right-0 w-[70%] bg-[linear-gradient(90deg,#071720,rgba(7,23,32,.34))]" /><div className="relative mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.22em] text-[#e6c887]"><Gamepad2 className="h-3.5 w-3.5" /> Arena protocol · non-live</p><h2 className="mt-5 font-display text-7xl leading-[.76] tracking-[-.06em]">Play with<br /><em className="text-[#e49aa9]">confidence.</em></h2><p className="mt-7 max-w-lg text-sm leading-6 text-[#c8d6d2]">This is a consent architecture and local session preview—not a hardware controller. Any future provider bridge must be voluntary, session-only, reversible, and designed to retain no activity log.</p><div className="mt-8 border-y border-white/10 py-5 text-xs leading-5 text-[#b6c8c3]"><strong className="text-[#e6c887]">No live connection.</strong> The preview never pairs with a personal device and never sends an external command.</div></div><div className="border border-[#e6c887]/30 bg-[#061018]/82 p-5 backdrop-blur-sm sm:p-7"><div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5"><div><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#e6c887]">Consent checkpoint</p><h3 className="mt-3 font-display text-5xl leading-[.8]">Session protocol</h3></div><LockKeyhole className="h-7 w-7 text-[#e49aa9]" /></div><div className="mt-6 grid gap-2">{([ ["adultConfirmed", "I confirm I am 18 years of age or older."], ["ownerConfirmed", "I control any device I might choose to connect."], ["voluntaryConfirmed", "My participation is voluntary and I can stop at any time."], ["privacyConfirmed", "I understand the academy should not store device or activity data."] ] as Array<[keyof DeviceConsentState, string]>).map(([key, label]) => <button key={key} onClick={() => toggleConsent(key)} className={`flex gap-3 border p-4 text-left text-sm leading-5 transition ${deviceConsent[key] ? "border-[#99c8b4] bg-[#19362f] text-[#e7f1ec]" : "border-white/10 bg-[#0b1c26] text-[#cad8d4] hover:border-[#e6c887]/55"}`} aria-pressed={deviceConsent[key]}><span className={`mt-.5 grid h-5 w-5 shrink-0 place-items-center border ${deviceConsent[key] ? "border-[#99c8b4] bg-[#84b6a1] text-[#061018]" : "border-white/25"}`}>{deviceConsent[key] && <Check className="h-3.5 w-3.5" />}</span>{label}</button>)}</div><div className="mt-5 grid gap-2 sm:grid-cols-2"><div className={`border p-4 ${consentComplete ? "border-[#99c8b4] bg-[#19362f]" : "border-white/10 bg-[#0b1c26]"}`}><p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#e6c887]">Consent status</p><p className="mt-2 text-sm font-semibold">{consentComplete ? "Complete · provider bridge still inactive" : "Awaiting four confirmations"}</p></div><button onClick={() => updateTournament("stop")} className="border border-[#e49aa9]/75 bg-[#3a2230] p-4 text-left transition hover:bg-[#4a2939]"><span className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.16em] text-[#f2adba]"><CircleStop className="h-4 w-4" /> Emergency stop</span><p className="mt-2 text-sm font-semibold">Always available</p></button></div><div className="mt-5 border border-white/10 bg-[#0b1c26] p-4"><div className="flex items-start justify-between gap-4"><div><p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#e6c887]">Quiet Queue · local preview</p><p className="mt-2 text-sm font-semibold">Consent-first practice room</p></div><span className="border border-[#99c8b4]/55 bg-[#19362f] px-2 py-1 text-[9px] font-bold uppercase tracking-[.13em] text-[#c1e5d5]">{tournamentStatus}</span></div><p className="mt-3 text-xs leading-5 text-[#c5d3cf]">{tournamentSessionMessage(tournamentStatus)}</p><div className="mt-4 grid gap-2 sm:grid-cols-3"><button onClick={() => updateTournament("start")} disabled={!consentComplete || tournamentStatus === "disconnected"} className="border border-[#e6c887]/55 px-3 py-3 text-left text-[9px] font-bold uppercase tracking-[.13em] text-[#f1dca4] disabled:cursor-not-allowed disabled:opacity-35">{tournamentStatus === "paused" ? "Resume preview" : "Begin preview"}</button><button onClick={() => updateTournament("pause")} disabled={tournamentStatus !== "ready"} className="border border-white/15 px-3 py-3 text-left text-[9px] font-bold uppercase tracking-[.13em] text-[#d4dfdb] disabled:cursor-not-allowed disabled:opacity-35">Pause</button><button onClick={() => updateTournament("disconnect")} className="border border-white/15 px-3 py-3 text-left text-[9px] font-bold uppercase tracking-[.13em] text-[#d4dfdb]">Disconnect</button></div></div><p className="mt-4 border-l-2 border-[#e6c887] bg-[#0b1c26] px-4 py-3 text-xs leading-5 text-[#c7d5d1]">{safetyNotice}</p></div></div></section>

    <footer className="border-t border-white/10 bg-[#030b11] px-5 py-8 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-4 text-[10px] font-bold uppercase tracking-[.14em] text-[#9fb3b0] sm:flex-row sm:items-center"><div className="flex items-center gap-3"><img src={wordmark} alt="fleshsesh | academy" className="h-12 w-[200px] object-cover object-center" /><span>visual campus for adult learning</span></div><button onClick={() => setLocation(homePath)} className="inline-flex items-center gap-2 text-[#f1dca4]">Return to eCampus <ArrowUpRight className="h-3.5 w-3.5" /></button></div></footer></main>;
}
