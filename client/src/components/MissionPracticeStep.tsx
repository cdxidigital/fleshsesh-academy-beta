import { ArrowUpRight, CheckCircle2 } from "lucide-react";

type MissionModule = {
  title: string;
  objective: string;
  summary: string;
  practice: string;
};

type MissionScenario = {
  setup: string;
  prompt: string;
  safeNextStep: string;
};

type MissionPracticeStepProps = {
  module: MissionModule;
  scenario: MissionScenario | null;
  scenarioOpen: boolean;
  coachPending: boolean;
  coachAnswer: string | null;
  onToggleScenario: () => void;
  onAskCoach: (prompt: string) => void;
  onComplete: () => void;
};

export default function MissionPracticeStep({
  module,
  scenario,
  scenarioOpen,
  coachPending,
  coachAnswer,
  onToggleScenario,
  onAskCoach,
  onComplete,
}: MissionPracticeStepProps) {
  const coachPrompts = [
    {
      label: "Explain",
      prompt: `Explain the mission topic "${module.title}" for an adult learner. Learning objective: "${module.objective}". Use plain general education and do not assume personal details. Keep the reply under 70 words, use no headings or lists, and end with one safe next action.`,
    },
    {
      label: "Show me",
      prompt: `Give one fictional, non-personal example that helps explain the mission topic "${module.title}". Do not request or infer personal details. Keep the reply under 70 words, use no headings or lists, and end with one safe next action.`,
    },
    {
      label: "Quiz me",
      prompt: `Give one short general knowledge-check question about "${module.title}". Do not ask about the learner's experience. Keep the reply under 70 words, use no headings or lists, and end with one safe next action.`,
    },
    {
      label: "Make it clearer",
      prompt: `Make the mission topic "${module.title}" clearer in one short plain-language explanation. Learning objective: "${module.objective}". Keep the reply under 70 words, use no headings or lists, and end with one safe next action.`,
    },
  ];

  return (
    <div className="mt-5 border-t border-white/10 pt-5">
      <p className="text-sm leading-6 text-[#d2dfdb]">{module.summary}</p>
      <p className="mt-4 text-xs leading-5 text-[#b9cbc6]">{module.practice}</p>

      <section className="mt-5 border border-white/10 bg-[#061018]/55 p-4">
        <p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#e6c887]">Your move · fictional scenario</p>
        <p className="mt-2 text-[11px] leading-5 text-[#b9cbc6]">Try one general question privately. Nothing is typed, sent, or saved here.</p>
        <button type="button" onClick={onToggleScenario} className="mt-4 inline-flex items-center gap-2 border-b border-[#e6c887]/60 pb-1 text-[9px] font-bold uppercase tracking-[.13em] text-[#f1dca4]">
          {scenarioOpen ? "Hide scenario" : "Show scenario"} <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
        {scenarioOpen && scenario && (
          <div className="mt-4 border-t border-white/10 pt-4 text-xs leading-5 text-[#d2dfdb]">
            <p>{scenario.setup}</p>
            <p className="mt-3 text-[#f1dca4]">{scenario.prompt}</p>
            <p className="mt-3 text-[10px] leading-5 text-[#9db1ac]">{scenario.safeNextStep}</p>
          </div>
        )}
      </section>

      <section className="mt-5 border-t border-white/10 pt-5">
        <p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#e6c887]">Need help?</p>
        <p className="mt-2 text-[11px] leading-5 text-[#b9cbc6]">Choose one short coach prompt. It stays inside this mission; no account or personal story is needed.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {coachPrompts.map((item) => (
            <button key={item.label} type="button" onClick={() => onAskCoach(item.prompt)} disabled={coachPending} className="border border-white/20 px-3 py-2 text-[9px] font-bold uppercase tracking-[.12em] text-[#f1dca4] hover:border-[#e6c887] disabled:opacity-50">
              {item.label}
            </button>
          ))}
        </div>
        {coachPending && <p aria-live="polite" className="mt-4 text-xs text-[#b9cbc6]">Coach is preparing a short explanation.</p>}
        {coachAnswer && <div aria-live="polite" className="mt-4 border-l-2 border-[#e49aa9] bg-[#102630] px-4 py-3 text-xs leading-5 text-[#dce9e5]">{coachAnswer}</div>}
      </section>

      <button type="button" onClick={onComplete} className="mt-5 inline-flex items-center gap-2 border border-[#e6c887]/55 px-4 py-3 text-[9px] font-bold uppercase tracking-[.13em] text-[#f1dca4] hover:border-[#e49aa9]">
        Finish this free mission <CheckCircle2 className="h-3.5 w-3.5" />
      </button>
      <p className="mt-4 text-[10px] leading-5 text-[#9db1ac]">Free, private, and unsaved.</p>
    </div>
  );
}
