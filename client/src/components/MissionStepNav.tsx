import { missionStages, type MissionStageId } from "@/lib/missionFlow";

type MissionStepNavProps = {
  current: MissionStageId;
  onChange: (stage: MissionStageId) => void;
};

export default function MissionStepNav({ current, onChange }: MissionStepNavProps) {
  return (
    <nav aria-label="First mission steps" className="mt-5 border-y border-white/10 py-4">
      <ol className="grid gap-2 sm:grid-cols-4">
        {missionStages.map((stage, index) => {
          const active = stage.id === current;
          return (
            <li key={stage.id}>
              <button
                type="button"
                onClick={() => onChange(stage.id)}
                aria-current={active ? "step" : undefined}
                className={`w-full border px-3 py-3 text-left transition ${
                  active
                    ? "border-[#e49aa9] bg-[#3a2230] text-[#fff4f6]"
                    : "border-white/10 bg-[#061018]/45 text-[#b9cbc6] hover:border-[#e6c887]/60"
                }`}
              >
                <span className="block text-[8px] font-bold uppercase tracking-[.15em] text-[#e6c887]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 block text-[10px] font-bold uppercase tracking-[.11em]">{stage.label}</span>
                <span className="mt-1 block text-[9px] leading-4 opacity-80">{stage.hint}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
