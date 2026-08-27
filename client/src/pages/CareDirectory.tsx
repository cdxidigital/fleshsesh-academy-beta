import { ArrowLeft, ArrowUpRight, ExternalLink, ShieldCheck } from "lucide-react";
import { careResources } from "@/lib/careNavigation";

const primaryLockup = "/manus-storage/fleshsesh-academy-lockup-primary_c4730d25.png";

export default function CareDirectory() {
  return (
    <main className="min-h-screen bg-[#061018] text-[#edf3f0]">
      <header className="border-b border-white/10 bg-[#061018]/95 px-5 py-2 backdrop-blur sm:px-8 sm:py-3 lg:px-12">
        <div className="relative mx-auto flex min-h-[68px] max-w-[1500px] items-center justify-between sm:grid sm:min-h-[96px] sm:grid-cols-[1fr_auto_1fr] sm:gap-3">
          <a href="/" aria-label="Return to eCampus home" className="relative z-10 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[.14em] text-[#e6c887] transition-colors hover:text-[#f1dca4] sm:text-[10px] sm:tracking-[.18em]"><ArrowLeft className="h-3.5 w-3.5" /><span className="sm:hidden">eCampus</span><span className="hidden sm:inline">eCampus home</span></a>
          <img src={primaryLockup} alt="fleshsesh | academy" className="pointer-events-none absolute left-1/2 h-[46px] w-[142px] -translate-x-1/2 object-cover object-center sm:static sm:h-[72px] sm:w-[240px] sm:translate-x-0" />
          <p className="relative z-10 text-right text-[9px] font-bold uppercase tracking-[.14em] text-[#b9cac6] sm:justify-self-end sm:text-[10px] sm:tracking-[.18em]"><span className="sm:hidden">Care</span><span className="hidden sm:inline">Care navigation</span></p>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_78%_0%,rgba(228,154,169,.16),transparent_35%),linear-gradient(135deg,#061018_0%,#0b2029_100%)] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[.22em] text-[#e6c887]">Care layer · Australia</p>
            <h1 className="max-w-3xl font-serif text-5xl leading-[.92] text-[#f6f1ea] sm:text-6xl lg:text-7xl">Find support<br /><em className="font-normal text-[#e49aa9]">without explaining.</em></h1>
          </div>
          <div className="border-l border-[#e6c887]/50 pl-5 text-sm leading-7 text-[#c8d4d0] sm:text-base">
            <p>This directory points to public Australian support and service finders. It does not diagnose, assess, collect a story, or replace emergency or professional care.</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[.14em] text-[#f1dca4]">Nothing you choose here is saved to fleshsesh | academy.</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-8 flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-[#e6c887]" /><p className="text-xs font-bold uppercase tracking-[.18em] text-[#e6c887]">Choose a next step, not a disclosure</p></div>
          <div className="grid gap-4 md:grid-cols-2">
            {careResources.map((resource) => (
              <article key={resource.id} className="group flex min-h-[252px] flex-col border border-white/10 bg-[#0b1c26] p-6 transition-colors hover:border-[#e6c887]/55 sm:p-8">
                <p className="text-[10px] font-bold uppercase tracking-[.19em] text-[#e49aa9]">{resource.label}</p>
                <h2 className="mt-4 max-w-md font-serif text-3xl leading-[1.02] text-[#f6f1ea]">{resource.title}</h2>
                <p className="mt-4 max-w-xl text-sm leading-6 text-[#b9cac6]">{resource.description}</p>
                <div className="mt-auto pt-7">
                  <a href={resource.href} target={resource.href.startsWith("https") ? "_blank" : undefined} rel={resource.href.startsWith("https") ? "noopener noreferrer" : undefined} className="inline-flex items-center gap-2 border border-[#e6c887] px-4 py-3 text-[10px] font-bold uppercase tracking-[.15em] text-[#f1dca4] transition-colors hover:bg-[#e6c887] hover:text-[#061018]">{resource.action}{resource.href.startsWith("https") ? <ExternalLink className="h-3.5 w-3.5" /> : <ArrowUpRight className="h-3.5 w-3.5" />}</a>
                  <p className="mt-4 text-xs leading-5 text-[#829691]">{resource.note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#07151e] px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#e6c887]">The boundary</p><p className="mt-3 max-w-2xl text-sm leading-6 text-[#b9cac6]">fleshsesh | academy is an adult-learning platform. These external resources are offered for navigation only; they are not a clinical, emergency, legal, or crisis service.</p></div>
          <a href="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#f1dca4] hover:text-[#e49aa9]">Return to eCampus <ArrowUpRight className="h-3.5 w-3.5" /></a>
        </div>
      </section>
    </main>
  );
}
