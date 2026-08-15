import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Check,
  CircleStop,
  Gamepad2,
  HeartPulse,
  Library,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
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
const wordmark = "/manus-storage/fleshsesh-academy-wordmark_f79fa930.png";
const ageStorageKey = "fleshsesh_academy_age_confirmed_v2";

const facilityIcons = {
  eclinic: HeartPulse,
  "law-library": Library,
  "residence-life": Users,
  esports: Gamepad2,
} as const;

const emptyConsent: DeviceConsentState = {
  adultConfirmed: false,
  ownerConfirmed: false,
  voluntaryConfirmed: false,
  privacyConfirmed: false,
};

export default function Campus() {
  const [, setLocation] = useLocation();
  const previewMode = import.meta.env.DEV && new URLSearchParams(window.location.search).get("preview") === "academy";
  const eCampusHomePath = previewMode ? "/?preview=academy" : "/";
  const learningPath = previewMode ? "/learn?preview=academy" : "/learn";
  const [ageConfirmed, setAgeConfirmed] = useState(previewMode);
  const [ageChecked, setAgeChecked] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<FacilityId>("eclinic");
  const [deviceConsent, setDeviceConsent] = useState<DeviceConsentState>(emptyConsent);
  const [safetyNotice, setSafetyNotice] = useState("A personal-device connector is not enabled in this preview.");
  const [tournamentStatus, setTournamentStatus] = useState<TournamentSessionStatus>("idle");

  useEffect(() => {
    if (!previewMode) setAgeConfirmed(window.localStorage.getItem(ageStorageKey) === "true");
    setAgeChecked(true);
    if (window.location.hash === "#arena-lobby") {
      setSelectedFacility("esports");
      const frame = window.requestAnimationFrame(() => {
        Array.from(document.querySelectorAll("h2"))
          .find((heading) => heading.textContent?.includes("Tournament culture"))
          ?.closest("section")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return () => window.cancelAnimationFrame(frame);
    }
  }, [previewMode]);

  const activeFacility = useMemo(
    () => campusFacilities.find((facility) => facility.id === selectedFacility) ?? campusFacilities[0],
    [selectedFacility],
  );
  const deviceSessionEligible = canStartDeviceSession(deviceConsent);

  const chooseFacility = (facilityId: FacilityId) => {
    setSelectedFacility(facilityId);
    window.setTimeout(() => document.getElementById("facility-detail")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  const toggleConsent = (key: keyof DeviceConsentState) => {
    setDeviceConsent((current) => ({ ...current, [key]: !current[key] }));
  };

  const updateTournament = (action: "start" | "pause" | "stop" | "disconnect") => {
    const nextStatus = transitionTournamentSession(tournamentStatus, action, deviceSessionEligible);
    setTournamentStatus(nextStatus);
    if (action === "stop") setSafetyNotice(emergencyStopMessage(false));
    if (action === "disconnect") setSafetyNotice("Session disconnect requested. No pairing data is retained in this preview.");
  };

  if (!ageChecked) return <div className="min-h-screen bg-[#0d1822]" />;

  if (!ageConfirmed) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#0d1822] px-5 text-[#f3f7f4]">
        <section className="max-w-xl border border-[#d8bd82]/30 bg-[#152532] p-8 shadow-2xl sm:p-10">
          <img src={wordmark} alt="fleshsesh | academy" className="h-12 w-[220px] object-contain object-left" />
          <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d8bd82]">Campus access</p>
          <h1 className="mt-4 font-display text-5xl leading-[0.88]">Confirm the adult gateway before entering the campus.</h1>
          <p className="mt-6 text-sm leading-6 text-[#c6d3d0]">The facility worlds contain adult-learning material and use the same 18+ access boundary as the eCampus homepage.</p>
          <button onClick={() => setLocation("/")} className="mt-8 inline-flex items-center gap-2 bg-[#df8997] px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#152532] transition hover:bg-[#eea6b1] active:scale-[0.97]">Return to age gateway <ArrowUpRight className="h-4 w-4" /></button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0d1822] text-[#f3f7f4] selection:bg-[#df8997] selection:text-[#152532]">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0d1822]/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <button onClick={() => setLocation(eCampusHomePath)} className="flex items-center gap-3 text-left" aria-label="Return to eCampus home"><img src={emblem} alt="" className="h-10 w-10 rounded-full ring-1 ring-[#d8bd82]/35" /><span className="hidden text-[10px] font-bold uppercase tracking-[0.18em] text-[#d8bd82] sm:block">eCampus home</span></button>
          <img src={wordmark} alt="fleshsesh | academy" className="h-10 w-[175px] object-contain" />
          <button onClick={() => setLocation(learningPath)} className="inline-flex items-center gap-2 border-b border-[#d8bd82]/65 pb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#f2d59e] transition hover:border-[#df8997] hover:text-[#ec9aa6]">Catalogue <ArrowUpRight className="h-3.5 w-3.5" /></button>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10 px-5 pb-16 pt-14 sm:px-8 lg:px-12 lg:pb-24 lg:pt-20">
        <img src={activeFacility.image} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-20 grayscale-[0.16]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#0d1822_2%,rgba(13,24,34,0.89)_42%,rgba(13,24,34,0.42)_100%)]" />
        <div className="relative mx-auto max-w-[1440px]">
          <button onClick={() => setLocation(eCampusHomePath)} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#c5d3d2] transition hover:text-[#f3e0ad]"><ArrowLeft className="h-3.5 w-3.5" /> Back to eCampus</button>
          <div className="mt-14 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="max-w-3xl"><p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d8bd82]"><Sparkles className="h-3.5 w-3.5" /> Four worlds, one adult-learning campus</p><h1 className="mt-5 font-display text-[clamp(4rem,8vw,8.4rem)] font-semibold leading-[0.78] tracking-[-0.055em]">Choose your <em className="text-[#ec9aa6]">room.</em></h1><p className="mt-8 max-w-xl text-base leading-7 text-[#c5d3d2] sm:text-lg">Each campus world makes a different learning mood tangible: care, rights, social life, and digital play. The entire experience remains adult-only, non-explicit, consent-centred, and designed for privacy.</p></div>
            <div className="border border-[#d8bd82]/25 bg-[#152532]/86 p-5 backdrop-blur-sm sm:p-7"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8bd82]">Campus principle</p><p className="mt-4 font-display text-4xl leading-[0.88]">Agency is the <em className="text-[#ec9aa6]">infrastructure.</em></p><p className="mt-5 text-sm leading-6 text-[#bdd0cd]">Pause is always valid. Opt-in is always reversible. No facility asks learners to disclose private experiences in order to participate.</p></div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto grid max-w-[1440px] gap-3 md:grid-cols-2 xl:grid-cols-4">{campusFacilities.map((facility) => { const Icon = facilityIcons[facility.id]; const selected = facility.id === selectedFacility; const roomPath = `/campus/${facility.id}${previewMode ? "?preview=academy" : ""}`; return <article key={facility.id} className={`group relative min-h-[430px] overflow-hidden border transition duration-300 ${selected ? "border-[#df8997]" : "border-white/10 hover:border-[#d8bd82]/60"}`}><img src={facility.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]" /><div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,22,32,0.08),rgba(8,22,32,0.25)_38%,rgba(8,22,32,0.94)_100%)]" /><div className="relative flex h-full flex-col p-6"><span className="flex h-10 w-10 items-center justify-center border border-white/25 bg-[#0d1822]/65 text-[#d8bd82]"><Icon className="h-5 w-5" /></span><div className="mt-auto"><p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#d8bd82]">{facility.eyebrow}</p><h2 className="mt-2 font-display text-4xl leading-none">{facility.label}</h2><p className="mt-3 max-w-xs text-sm leading-6 text-[#cfdbd7]">{facility.description}</p><div className="mt-6 flex flex-wrap gap-x-4 gap-y-3"><button onClick={() => setLocation(roomPath)} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#f1d49b] transition hover:text-[#ec9aa6]">Enter room <ArrowUpRight className="h-3.5 w-3.5" /></button><button onClick={() => chooseFacility(facility.id)} className="border-b border-white/25 pb-0.5 text-[9px] font-bold uppercase tracking-[0.13em] text-[#cbd8d4] transition hover:border-[#d8bd82] hover:text-[#f1d49b]">Preview below</button></div></div></div></article>; })}</div></section>

      <section id="facility-detail" className="border-y border-white/10 bg-[#152532] px-5 py-14 sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center"><div className="relative aspect-[4/3] overflow-hidden border border-[#d8bd82]/25"><img src={activeFacility.image} alt={`${activeFacility.label} interior`} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(13,24,34,0.48),transparent_55%)]" /></div><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8bd82]">{activeFacility.eyebrow}</p><h2 className="mt-4 font-display text-6xl leading-[0.82] tracking-[-0.045em]">{activeFacility.label}</h2><p className="mt-6 max-w-2xl text-base leading-7 text-[#c8d5d2]">{activeFacility.description}</p><div className="mt-8 border-l-2 border-[#df8997] bg-[#0d1822]/50 px-5 py-4 text-sm leading-6 text-[#d7e1dc]">{activeFacility.note}</div><div className="mt-8 flex flex-wrap gap-2">{activeFacility.courseCodes.map((course) => <span key={course} className="border border-[#d8bd82]/30 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.13em] text-[#ead3a0]">{course}</span>)}</div><div className="mt-8 flex flex-wrap gap-4"><button onClick={() => setLocation(`/campus/${activeFacility.id}${previewMode ? "?preview=academy" : ""}`)} className="inline-flex items-center gap-2 bg-[#f0d59d] px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#152532] transition hover:bg-[#f8dfab] active:scale-[0.97]">Enter {activeFacility.label} <ArrowUpRight className="h-4 w-4" /></button><button onClick={() => setLocation(`/learn?facility=${encodeURIComponent(activeFacility.id)}${previewMode ? "&preview=academy" : ""}`)} className="inline-flex items-center gap-2 bg-[#df8997] px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#152532] transition hover:bg-[#eea6b1] active:scale-[0.97]">Open {activeFacility.courseLabel} <BookOpen className="h-4 w-4" /></button></div></div></div></section>

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto grid max-w-[1440px] gap-10 xl:grid-cols-[0.84fr_1.16fr]"><div><p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d8bd82]"><Gamepad2 className="h-3.5 w-3.5" /> Esports Arena · device boundary</p><h2 className="mt-5 font-display text-6xl leading-[0.82] tracking-[-0.05em]">Tournament culture,<br /><em className="text-[#ec9aa6]">without pressure.</em></h2><p className="mt-6 max-w-lg text-sm leading-6 text-[#c8d5d2]">The Arena is designed for adult, opt-in friendly play. A live personal-device provider is not enabled in this build: this interface establishes the consent, data-minimisation, time-bound session, and emergency-stop controls required before any integration can be activated.</p><div className="mt-8 border-y border-white/10 py-5 text-xs leading-5 text-[#b9cac6]"><strong className="text-[#f0d59d]">No activity logs.</strong> Device identifiers, personal settings, and session-level activity are not stored by the academy. A future connector must keep pairing credentials server-side and only for the active session.</div></div><div className="border border-[#d8bd82]/30 bg-[#152532] p-5 sm:p-7"><div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d8bd82]">Session access protocol</p><h3 className="mt-2 font-display text-4xl leading-none">Pairing consent</h3></div><LockKeyhole className="h-7 w-7 text-[#ec9aa6]" /></div><div className="mt-6 grid gap-3">{([ ["adultConfirmed", "I confirm that I am 18 years of age or older."], ["ownerConfirmed", "I control the device I choose to connect."], ["voluntaryConfirmed", "My participation is voluntary and I can stop at any time."], ["privacyConfirmed", "I understand that the academy should not store device or activity data."] ] as Array<[keyof DeviceConsentState, string]>).map(([key, label]) => <button key={key} onClick={() => toggleConsent(key)} className={`flex items-start gap-3 border p-4 text-left text-sm leading-5 transition ${deviceConsent[key] ? "border-[#89bdae] bg-[#19342f] text-[#e0f0ea]" : "border-white/10 bg-[#0d1822] text-[#c9d6d2] hover:border-[#d8bd82]/50"}`} aria-pressed={deviceConsent[key]}><span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border ${deviceConsent[key] ? "border-[#9fd6c2] bg-[#79ac9c] text-[#102722]" : "border-white/25"}`}>{deviceConsent[key] && <Check className="h-3.5 w-3.5" />}</span>{label}</button>)}</div><div className="mt-6 grid gap-3 sm:grid-cols-2"><div className={`border p-4 ${deviceSessionEligible ? "border-[#89bdae] bg-[#19342f]" : "border-white/10 bg-[#0d1822]"}`}><p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#d8bd82]">Pairing status</p><p className="mt-2 text-sm font-semibold text-[#f1f4f1]">{deviceSessionEligible ? "Consent complete · provider bridge required" : "Awaiting all four confirmations"}</p></div><button onClick={() => updateTournament("stop")} className="group border border-[#df8997]/65 bg-[#2d1e29] p-4 text-left transition hover:bg-[#3b2432]"><span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.17em] text-[#f0a4b4]"><CircleStop className="h-4 w-4" /> Emergency stop</span><p className="mt-2 text-sm font-semibold text-[#f6ecef]">Always available</p></button></div><div className="mt-5 border border-white/10 bg-[#0d1822] p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#d8bd82]">Arena lobby · local preview</p><p className="mt-2 text-sm font-semibold text-[#f3f7f4]">Quiet Queue · consent-first practice room</p></div><span className="border border-[#89bdae]/45 bg-[#19342f] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.13em] text-[#b9e2d4]">{tournamentStatus}</span></div><p className="mt-3 text-xs leading-5 text-[#c5d3d0]">{tournamentSessionMessage(tournamentStatus)}</p><div className="mt-4 grid gap-2 sm:grid-cols-3"><button onClick={() => updateTournament("start")} disabled={!deviceSessionEligible || tournamentStatus === "disconnected"} className="border border-[#d8bd82]/45 px-3 py-3 text-left text-[9px] font-bold uppercase tracking-[0.13em] text-[#f0d59d] transition hover:border-[#df8997] hover:text-[#ec9aa6] disabled:cursor-not-allowed disabled:opacity-40">{tournamentStatus === "paused" ? "Resume preview" : "Begin preview"}</button><button onClick={() => updateTournament("pause")} disabled={tournamentStatus !== "ready"} className="border border-white/15 px-3 py-3 text-left text-[9px] font-bold uppercase tracking-[0.13em] text-[#cbd9d5] transition hover:border-[#d8bd82]/50 disabled:cursor-not-allowed disabled:opacity-40">Pause</button><button onClick={() => updateTournament("disconnect")} className="border border-white/15 px-3 py-3 text-left text-[9px] font-bold uppercase tracking-[0.13em] text-[#cbd9d5] transition hover:border-[#df8997] hover:text-[#ec9aa6]">Disconnect</button></div></div><div className="mt-4 border-l-2 border-[#d8bd82] bg-[#0d1822] px-4 py-3 text-xs leading-5 text-[#c5d3d0]">{safetyNotice}</div><div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-bold uppercase tracking-[0.13em] text-[#bdcfca]"><span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[#89bdae]" />Session-only</span><span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[#89bdae]" />No coercion</span><span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[#89bdae]" />Stop-first</span></div></div></div></section>

      <footer className="border-t border-white/10 px-5 py-10 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-5 text-xs text-[#aebfbb] sm:flex-row sm:items-center"><p>fleshsesh | academy · adult learning with agency</p><button onClick={() => setLocation(eCampusHomePath)} className="inline-flex items-center gap-2 text-[#e3cc96] transition hover:text-[#ec9aa6]">Return to eCampus <ArrowUpRight className="h-3.5 w-3.5" /></button></div></footer>
    </main>
  );
}
