import type { CourseTransitionMedia } from "@/lib/courseMedia";

type MissionMediaCardProps = {
  courseTitle: string;
  media: CourseTransitionMedia;
};

export default function MissionMediaCard({ courseTitle, media }: MissionMediaCardProps) {
  return (
    <section aria-labelledby="first-mission-media-title" className="mt-5 overflow-hidden border border-white/10 bg-[#061018]/65">
      <div className="grid gap-0 sm:grid-cols-[1.15fr_.85fr]">
        <div className="relative bg-[#071720]">
          <video className="aspect-video h-full w-full object-cover motion-reduce:hidden" controls muted playsInline preload="metadata" poster={media.poster} aria-label={`Optional silent visual transition for ${courseTitle}`} aria-describedby="first-mission-video-description">
            <source src={media.video} type="video/mp4" />
            <img src={media.poster} alt={media.alt} className="aspect-video h-full w-full object-cover" />
          </video>
          <img src={media.poster} alt={media.alt} className="hidden aspect-video h-full w-full object-cover motion-reduce:block" />
        </div>
        <div className="p-4 sm:p-5">
          <p id="first-mission-media-title" className="text-[9px] font-bold uppercase tracking-[.16em] text-[#e6c887]">Optional visual transition</p>
          <h4 className="mt-3 font-display text-2xl leading-[.9] text-[#f5eee4]">{media.title}</h4>
          <p className="mt-3 text-[11px] leading-5 text-[#b9cbc6]">A silent eight-second visual pause between reading moments. It is not a tutorial or required step, never plays automatically, and creates no viewing or listening history.</p>
          <details className="mt-4 border-t border-white/10 pt-3">
            <summary className="cursor-pointer text-[9px] font-bold uppercase tracking-[.13em] text-[#f1dca4]">Transition description</summary>
            <p id="first-mission-video-description" className="mt-3 text-[11px] leading-5 text-[#b9cbc6]">{media.description}</p>
          </details>
          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="text-[9px] font-bold uppercase tracking-[.13em] text-[#e6c887]">Optional narrated walkthrough</p>
            <audio controls preload="metadata" className="mt-3 w-full" aria-label={`Optional narrated walkthrough for ${courseTitle}`}>
              <source src={media.walkthroughAudio} type="audio/mpeg" />
              Your browser does not support audio playback.
            </audio>
            <p className="mt-2 text-[10px] leading-5 text-[#9db1ac]">Press play for a short unit walkthrough. It never starts by itself.</p>
            <details className="mt-3 border-t border-white/10 pt-3">
              <summary className="cursor-pointer text-[9px] font-bold uppercase tracking-[.13em] text-[#f1dca4]">Read walkthrough transcript</summary>
              <p className="mt-3 text-[11px] leading-5 text-[#b9cbc6]">{media.walkthroughTranscript}</p>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
