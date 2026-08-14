import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
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

const pathways = [
  { code: "01", title: "Body literacy", course: "FSH 101", hours: "12 hrs", copy: "Foundational anatomy, variation, life stages and help-seeking literacy.", accent: "from-[#b54464] via-[#ec779b] to-[#f5d9cb]", tag: "Foundations" },
  { code: "02", title: "Consent & boundaries", course: "FSH 102", hours: "10 hrs", copy: "Build language for requests, uncertainty, changing minds and respectful repair.", accent: "from-[#dfb56b] via-[#f3d39e] to-[#c05d6e]", tag: "Essential" },
  { code: "03", title: "Intimacy & communication", course: "FSH 203", hours: "12 hrs", copy: "Pleasure literacy, self-compassion and communication without pressure or entitlement.", accent: "from-[#7c2740] via-[#e46891] to-[#f1a9af]", tag: "Applied" },
  { code: "04", title: "Digital safety", course: "FSH 206", hours: "10 hrs", copy: "Digital consent, privacy, incident response and practical online boundaries.", accent: "from-[#1e1a24] via-[#91536a] to-[#e7c487]", tag: "Applied" },
];

const faculty = [
  { initials: "MS", name: "Dr. Mira Sen", role: "Clinical Professor", focus: "Foundations & health literacy", color: "bg-[#d67693]" },
  { initials: "AR", name: "Alex Rivera", role: "Peer Educator", focus: "Consent & communication", color: "bg-[#c69a56]" },
  { initials: "JO", name: "Jo Vale", role: "Intimacy Tutor", focus: "Pleasure & self-knowledge", color: "bg-[#7f4355]" },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const previewMode = import.meta.env.DEV && new URLSearchParams(window.location.search).get("preview") === "academy";
  const [ageConfirmed, setAgeConfirmed] = useState(previewMode);
  const [ageChecked, setAgeChecked] = useState(false);
  const [ageDeclined, setAgeDeclined] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!previewMode) {
      setAgeConfirmed(window.localStorage.getItem("fleshsesh_academy_age_confirmed_v1") === "true");
    }
  }, [previewMode]);

  const grantAccess = () => {
    if (!ageChecked) return;
    window.localStorage.setItem("fleshsesh_academy_age_confirmed_v1", "true");
    setAgeConfirmed(true);
    setAgeDeclined(false);
  };

  const resetAgeGate = () => {
    window.localStorage.removeItem("fleshsesh_academy_age_confirmed_v1");
    setAgeChecked(false);
    setAgeConfirmed(false);
    setAgeDeclined(false);
  };

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 3600);
  };

  return (
    <div className="min-h-screen bg-[#0b090b] text-[#f6eee2] selection:bg-[#e86f98] selection:text-[#190d13]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[84px] flex-col items-center border-r border-white/10 bg-[#0a080a] lg:flex">
        <button onClick={() => scrollToSection("top")} className="mt-6 h-12 w-12 overflow-hidden rounded-full ring-1 ring-[#e4bd78]/40 transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#ee6f9a]" aria-label="Back to top">
          <img src={emblem} alt="fleshsesh academy emblem" className="h-full w-full object-cover" />
        </button>
        <div className="mt-8 h-28 w-px bg-gradient-to-b from-[#e4bd78] via-[#e4bd78]/30 to-transparent" />
        <nav className="mt-6 flex flex-1 flex-col items-center gap-7" aria-label="Primary navigation">
          {[
            { label: "Curriculum", target: "curriculum", icon: BookOpen },
            { label: "Faculty", target: "faculty", icon: GraduationCap },
            { label: "Care", target: "care", icon: HeartHandshake },
          ].map(({ label, target, icon: Icon }) => (
            <button key={label} onClick={() => scrollToSection(target)} className="group relative text-[#a79b92] transition hover:text-[#f2c684] focus:outline-none focus:text-[#f2c684]" aria-label={label}>
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
              <span className="pointer-events-none absolute left-9 top-1/2 hidden -translate-y-1/2 whitespace-nowrap border border-[#e4bd78]/20 bg-[#171115] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f5e8d4] shadow-xl group-hover:block">{label}</span>
            </button>
          ))}
        </nav>
        <button onClick={resetAgeGate} className="mb-6 text-[#a79b92] transition hover:text-[#ee6f9a] focus:outline-none focus:text-[#ee6f9a]" aria-label="Reconfirm age access">
          <ShieldCheck className="h-[18px] w-[18px]" strokeWidth={1.6} />
        </button>
      </aside>

      <main className="lg:ml-[84px]">
        <header id="top" className="relative z-30 flex h-[72px] items-center justify-between border-b border-white/10 px-5 sm:px-8 lg:px-12">
          <button onClick={() => scrollToSection("top")} className="flex items-center gap-3 text-left lg:hidden">
            <img src={emblem} alt="fleshsesh academy" className="h-9 w-9 rounded-full object-cover ring-1 ring-[#e4bd78]/40" />
            <span className="font-display text-2xl font-semibold tracking-tight">fleshsesh</span>
          </button>
          <div className="hidden items-baseline gap-3 lg:flex">
            <span className="font-display text-[29px] font-semibold tracking-tight">fleshsesh</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#d8b36d]">academy</span>
          </div>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main links">
            <button onClick={() => scrollToSection("curriculum")} className="text-xs font-medium text-[#cbbfb6] transition hover:text-white">Curriculum</button>
            <button onClick={() => scrollToSection("faculty")} className="text-xs font-medium text-[#cbbfb6] transition hover:text-white">Faculty</button>
            <button onClick={() => scrollToSection("care")} className="text-xs font-medium text-[#cbbfb6] transition hover:text-white">Support</button>
          </nav>
          <div className="hidden items-center gap-4 md:flex">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#cabcae]"><ShieldCheck className="h-3.5 w-3.5 text-[#e7bd76]" /> 18+ learning space</span>
            <button onClick={() => showNotice("Member access is being prepared for the next platform phase.")} className="border-b border-[#e4bd78]/80 pb-1 text-xs font-semibold text-[#f1d494] transition hover:border-[#ee6f9a] hover:text-[#ee6f9a]">Member access</button>
          </div>
          <button onClick={() => setMenuOpen((open) => !open)} className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-[#f6eee2] md:hidden" aria-label="Toggle navigation" aria-expanded={menuOpen}>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          {menuOpen && (
            <div className="absolute left-0 right-0 top-[71px] border-b border-white/10 bg-[#100c10] p-5 shadow-2xl md:hidden">
              <div className="grid gap-3 text-sm">
                {[ ["Curriculum", "curriculum"], ["Faculty", "faculty"], ["Support", "care"] ].map(([label, target]) => (
                  <button key={label} onClick={() => { scrollToSection(target); setMenuOpen(false); }} className="flex items-center justify-between border-b border-white/10 py-3 text-left text-[#f6eee2]">{label}<ChevronRight className="h-4 w-4 text-[#e4bd78]" /></button>
                ))}
                <button onClick={() => { showNotice("Member access is being prepared for the next platform phase."); setMenuOpen(false); }} className="mt-2 bg-[#ed7299] px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.13em] text-[#1a0d13]">Member access</button>
              </div>
            </div>
          )}
        </header>

        <section className="relative overflow-hidden px-5 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:min-h-[690px] lg:px-12 lg:pb-24 lg:pt-20">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -right-[10%] top-[5%] h-[460px] w-[460px] rounded-full bg-[#bd365e]/20 blur-[120px]" />
            <div className="absolute right-[11%] top-[12%] h-[430px] w-[430px] rotate-[16deg] rounded-[42%_58%_48%_52%/58%_36%_64%_42%] border border-[#f0b5c4]/20 bg-gradient-to-br from-[#f3a1b7]/65 via-[#a21642]/40 to-transparent shadow-[0_0_150px_rgba(220,78,117,0.25)]" />
            <div className="absolute right-[28%] top-[42%] h-64 w-64 rotate-[-25deg] rounded-[52%_48%_57%_43%/45%_57%_43%_55%] border border-[#f6d6df]/20 bg-gradient-to-tl from-[#460617]/80 via-[#dc5478]/40 to-[#f5c5d0]/20 blur-[1px]" />
            <div className="absolute right-[5%] top-[30%] h-[2px] w-[44%] rotate-[-4deg] bg-gradient-to-r from-transparent via-[#e4bd78]/80 to-transparent shadow-[0_0_15px_rgba(228,189,120,0.7)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_30%,rgba(228,189,120,0.08),transparent_22%),linear-gradient(90deg,#0b090b_10%,rgba(11,9,11,0.9)_46%,rgba(11,9,11,0.16)_100%)]" />
            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:40px_40px]" />
          </div>
          <div className="relative grid max-w-[1280px] gap-12 lg:grid-cols-[minmax(0,1fr)_290px] lg:items-end">
            <div className="max-w-[780px]">
              <div className="rise-in inline-flex items-center gap-3 border-y border-[#e4bd78]/35 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#e9c987]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ee6f9a]" /> Adult-only learning house
              </div>
              <h1 className="rise-in-delay mt-7 font-display text-[clamp(3.5rem,8vw,7.5rem)] font-semibold leading-[0.83] tracking-[-0.052em] text-[#fbf5ec]">
                Learn the language<br />of <em className="font-display font-medium text-[#f18aab]">your agency.</em>
              </h1>
              <p className="rise-in-delay mt-8 max-w-xl text-base leading-7 text-[#cfc2b8] sm:text-lg">
                Thoughtful, evidence-informed education for adult learners navigating bodies, boundaries, relationships and digital life — without shame, pressure or performance.
              </p>
              <div className="rise-in-delay mt-10 flex flex-wrap items-center gap-4">
                <button onClick={() => scrollToSection("curriculum")} className="group inline-flex items-center gap-3 bg-[#ef779d] px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] text-[#210d15] transition duration-200 hover:bg-[#f8a7be] active:scale-[0.97]">
                  Explore curriculum <ArrowDownRight className="h-4 w-4 transition group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
                <button onClick={() => scrollToSection("care")} className="inline-flex items-center gap-2 border-b border-[#e4bd78]/60 pb-1 text-xs font-semibold text-[#f1d494] transition hover:border-[#ee6f9a] hover:text-[#ee6f9a]">How the academy protects your space <ArrowUpRight className="h-3.5 w-3.5" /></button>
              </div>
            </div>
            <div className="relative border-l border-[#e4bd78]/35 pl-5 lg:pb-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#d7b979]">The 2026/27 guide</p>
              <p className="mt-3 font-display text-3xl leading-[0.95] text-[#f5ece2]">A complete curriculum for clarity, care and connection.</p>
              <button onClick={() => scrollToSection("pathway")} className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#f18aab] transition hover:text-[#f5d09a]">See the learning architecture <ChevronRight className="h-4 w-4" /></button>
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

        <section id="pathway" className="border-y border-[#e4bd78]/20 bg-[#f1e7d8] px-5 py-10 text-[#1c1517] sm:px-8 lg:px-12 lg:py-14">
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

        <section id="curriculum" className="bg-[#110d10] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
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
                      <button onClick={() => showNotice(`${course.course} preview materials will be available in the member learning space.`)} className="inline-flex items-center gap-2 text-xs font-semibold text-[#f3d49b] transition hover:text-[#ee80a3]">View route <ArrowUpRight className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8 flex flex-col justify-between gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center">
              <p className="max-w-xl text-xs leading-5 text-[#91827a]">The course guide is designed for adult learners and contains educational, non-diagnostic content. Some modules may provide a content note or an alternative route.</p>
              <button onClick={() => showNotice("The full 2026/27 course catalogue is being staged for member access.")} className="inline-flex shrink-0 items-center gap-2 border-b border-[#e4bd78]/60 pb-1 text-xs font-semibold text-[#f3d49b] transition hover:border-[#ee6f9a] hover:text-[#ee6f9a]">Open complete course catalogue <ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
        </section>

        <section id="faculty" className="relative overflow-hidden bg-[#d77d98] px-5 py-16 text-[#251016] sm:px-8 lg:px-12 lg:py-24">
          <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full border-[55px] border-[#f3bea9]/45 blur-[2px]" />
          <div className="pointer-events-none absolute right-[10%] top-0 h-[340px] w-[340px] rounded-full bg-[#fbdbc1]/40 blur-[80px]" />
          <div className="relative mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#743348]">Guidance without assumption</p>
              <h2 className="mt-4 max-w-md font-display text-5xl font-semibold leading-[0.9] tracking-[-0.045em] sm:text-6xl">Learn with<br /><em>specialist voices.</em></h2>
              <p className="mt-7 max-w-md text-sm leading-6 text-[#512638]">AI lecturers are instructional personas with defined scopes, clear boundaries and human escalation routes. They are never presented as a substitute for individual clinical care.</p>
              <button onClick={() => showNotice("Faculty profiles and office-hour formats are being prepared for the next release.")} className="mt-8 inline-flex items-center gap-2 border-b border-[#5a2940]/60 pb-1 text-xs font-bold text-[#452033] transition hover:border-[#f8e0af] hover:text-[#f8e0af]">Meet the faculty <ArrowUpRight className="h-3.5 w-3.5" /></button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {faculty.map((person) => (
                <article key={person.name} className="group min-h-[280px] border border-[#633248]/30 bg-[#2a121c]/95 p-5 text-[#f8eee6] transition duration-200 hover:-translate-y-1 hover:bg-[#351521]">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${person.color} font-display text-lg font-semibold text-[#2a0e18] ring-4 ring-[#2a121c]`}>{person.initials}</div>
                  <div className="mt-24">
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#e9bf79]">{person.role}</p>
                    <h3 className="mt-2 font-display text-3xl leading-[0.92]">{person.name}</h3>
                    <p className="mt-3 text-[11px] leading-5 text-[#d7c2b8]">{person.focus}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="care" className="bg-[#f1e7d8] px-5 py-16 text-[#201619] sm:px-8 lg:px-12 lg:py-24">
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
              <p className="mt-6 max-w-xl text-sm leading-6 text-[#cbbab1]">Take a quiet self-placement route, explore foundations, or return when the academy is ready to open its member learning environment.</p>
            </div>
            <div className="flex flex-col justify-end gap-3">
              <button onClick={() => showNotice("The self-placement experience is part of the next member-space release.")} className="group flex items-center justify-between bg-[#ef779d] px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.14em] text-[#260e17] transition hover:bg-[#f6a3b9] active:scale-[0.97]">Find your starting point <Compass className="h-4 w-4 transition group-hover:rotate-12" /></button>
              <button onClick={() => showNotice("This video introduction will be available in the academy launch sequence.")} className="group flex items-center justify-between border border-white/15 px-5 py-4 text-left text-xs font-bold uppercase tracking-[0.14em] text-[#f6eee2] transition hover:border-[#e4bd78] hover:text-[#f1d494] active:scale-[0.97]">Watch the academy introduction <Play className="h-4 w-4 fill-current" /></button>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 bg-[#0a080a] px-5 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3"><img src={emblem} alt="fleshsesh academy emblem" className="h-8 w-8 rounded-full object-cover opacity-90" /><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c3b5aa]">fleshsesh academy <span className="ml-2 text-[#806d66]">© 2026</span></p></div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-semibold text-[#91827a]"><button onClick={() => showNotice("The learner agreement will be published with member access.")} className="transition hover:text-[#e4bd78]">Learner agreement</button><button onClick={() => showNotice("Accessibility preferences will be available in the member learning space.")} className="transition hover:text-[#e4bd78]">Accessibility</button><button onClick={resetAgeGate} className="transition hover:text-[#e4bd78]">Age verification</button></div>
          </div>
        </footer>
      </main>

      {!ageConfirmed && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#060506]/95 p-4 backdrop-blur-xl sm:p-8" role="dialog" aria-modal="true" aria-labelledby="age-gate-title">
          <div className="gate-enter relative w-full max-w-[860px] overflow-hidden border border-[#e4bd78]/35 bg-[#100b0f] shadow-[0_30px_100px_rgba(0,0,0,.7)]">
            <div className="absolute inset-y-0 right-0 hidden w-[46%] overflow-hidden border-l border-[#e4bd78]/20 sm:block">
              <div className="absolute -right-20 top-10 h-[390px] w-[390px] rotate-[20deg] rounded-[48%_52%_62%_38%/44%_60%_40%_56%] border border-[#f7d4dd]/30 bg-gradient-to-tr from-[#440214] via-[#d0436c] to-[#ffc0ce] opacity-80 shadow-[0_0_80px_rgba(229,102,142,.35)]" />
              <div className="absolute left-4 top-[46%] h-px w-[115%] -rotate-[8deg] bg-[#e4bd78] shadow-[0_0_20px_rgba(228,189,120,.9)]" />
              <p className="absolute bottom-8 left-8 max-w-[230px] font-display text-3xl leading-[0.9] text-[#faeee6]">A private threshold for adult learning.</p>
            </div>
            <div className="relative max-w-[520px] p-7 sm:p-11">
              <img src={emblem} alt="fleshsesh academy emblem" className="h-14 w-14 rounded-full object-cover ring-1 ring-[#e4bd78]/50" />
              {!ageDeclined ? (
                <>
                  <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.22em] text-[#e4bd78]">Age verification</p>
                  <h2 id="age-gate-title" className="mt-4 font-display text-5xl font-semibold leading-[0.86] tracking-[-0.04em] text-[#fff8ee] sm:text-6xl">This is a space<br />for <em className="text-[#f38eac]">adults.</em></h2>
                  <p className="mt-6 max-w-md text-sm leading-6 text-[#cdbdb2]">fleshsesh academy provides evidence-informed sexual-wellness education for learners aged 18 and over. Entering means you confirm you meet the age requirement in your location.</p>
                  <label className="mt-8 flex cursor-pointer items-start gap-3 border-y border-white/10 py-4 text-sm leading-5 text-[#eee2d6]">
                    <input type="checkbox" checked={ageChecked} onChange={(event) => setAgeChecked(event.target.checked)} className="mt-0.5 h-4 w-4 accent-[#ee6f9a]" />
                    <span>I confirm that I am <strong>18 years of age or older</strong> and understand that this is an educational, adult-only platform.</span>
                  </label>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button onClick={grantAccess} disabled={!ageChecked} className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#ef779d] px-5 text-xs font-bold uppercase tracking-[0.14em] text-[#250d16] transition enabled:hover:bg-[#f7a4bb] enabled:active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-35">Enter the academy <ArrowUpRight className="h-4 w-4" /></button>
                    <button onClick={() => setAgeDeclined(true)} className="min-h-12 px-3 text-xs font-semibold text-[#baaaa0] transition hover:text-[#f0cc8d]">I am not 18+ / leave this space</button>
                  </div>
                  <p className="mt-6 flex items-start gap-2 text-[10px] leading-4 text-[#93827a]"><ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d6af68]" /> Your selection is saved locally in this browser. No identity document is requested by this introductory gateway.</p>
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
