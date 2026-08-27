import { ArrowUpRight } from "lucide-react";
import { curriculumEndGoal, curriculumPathways, journeyStages } from "@/lib/curriculumJourney";

type AtlasPathwayIntroProps = {
  activeLevel: string;
  onBrowse: () => void;
  onSelectLevel: (level: string) => void;
};

export default function AtlasPathwayIntro({ activeLevel, onBrowse, onSelectLevel }: AtlasPathwayIntroProps) {
  return <section className="border-y border-white/10 bg-[#071720] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
    <div className="mx-auto max-w-[1500px]">
      <div className="grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#e6c887]">Choose your way in</p>
          <h2 className="mt-5 max-w-xl font-display text-6xl leading-[.78] tracking-[-.055em]">Start with<br /><em className="text-[#e49aa9]">one direction.</em></h2>
          <p className="mt-7 max-w-xl text-sm leading-6 text-[#c6d5d1]">{curriculumEndGoal.description}</p>
          <button type="button" onClick={onBrowse} className="mt-6 inline-flex items-center gap-2 border border-[#e6c887]/55 px-4 py-3 text-[9px] font-bold uppercase tracking-[.13em] text-[#f1dca4] hover:border-[#e49aa9]">Browse all units <ArrowUpRight className="h-3.5 w-3.5" /></button>
        </div>
        <aside className="border border-[#e6c887]/40 bg-[#0b1c26] p-6 sm:p-8">
          <p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#e6c887]">Pick an outcome</p>
          <p className="mt-3 text-xs leading-5 text-[#b8cbc5]">Both routes stay self-paced and non-credentialed. Choose one start point; you can browse everything later.</p>
          <div className="mt-5 grid gap-3">
            {curriculumPathways.map((pathway) => <button key={pathway.id} type="button" onClick={() => onSelectLevel(pathway.entryLevel)} className="border border-white/15 bg-[#061018]/70 p-4 text-left transition hover:border-[#e49aa9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e6c887]">
              <span className="text-[9px] font-bold uppercase tracking-[.14em] text-[#e49aa9]">{pathway.label}</span>
              <span className="mt-2 block font-display text-2xl leading-[.9] text-[#f5eee4]">{pathway.title}</span>
              <span className="mt-3 block text-[11px] leading-5 text-[#c4d3cf]">{pathway.description}</span>
              <span className="mt-4 inline-flex text-[9px] font-bold uppercase tracking-[.14em] text-[#f1dca4]">Begin at level {pathway.entryLevel} <ArrowUpRight className="ml-2 h-3.5 w-3.5" /></span>
            </button>)}
          </div>
        </aside>
      </div>
      <ol className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {journeyStages.map((stage, index) => <li key={stage.level}><button type="button" onClick={() => onSelectLevel(stage.level)} aria-pressed={activeLevel === stage.level} className={`h-full w-full border bg-[#0b1c26] p-5 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e6c887] ${activeLevel === stage.level ? "border-[#e49aa9] bg-[#241923]" : "border-white/10 hover:border-[#e6c887]/60"}`}><p className="text-[9px] font-bold uppercase tracking-[.15em] text-[#e49aa9]">{String(index + 1).padStart(2, "0")} · level {stage.level}</p><h3 className="mt-4 font-display text-3xl leading-[.86] text-[#f5eee4]">{stage.title}</h3><p className="mt-4 text-xs leading-5 text-[#c4d3cf]">{stage.purpose}</p><span className="mt-5 inline-flex text-[9px] font-bold uppercase tracking-[.15em] text-[#f1dca4]">View level {stage.level} <ArrowUpRight className="ml-2 h-3.5 w-3.5" /></span></button></li>)}
      </ol>
    </div>
  </section>;
}
