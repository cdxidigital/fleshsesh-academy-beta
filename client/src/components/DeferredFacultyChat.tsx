import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { AIChatBoxProps } from "./AIChatBox";

const LazyAIChatBox = lazy(() => import("./AIChatBox").then((module) => ({ default: module.AIChatBox })));

export function DeferredFacultyChat(props: AIChatBoxProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (!("IntersectionObserver" in window)) {
      setReady(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setReady(true);
      observer.disconnect();
    }, { rootMargin: "480px 0px" });

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return <div ref={hostRef}>{ready ? <Suspense fallback={<FacultyChatLoadingState />}><LazyAIChatBox {...props} /></Suspense> : <FacultyChatLoadingState />}</div>;
}

function FacultyChatLoadingState() {
  return <div className="flex h-[350px] items-center justify-center border border-white/10 bg-[#0b1c26] px-6 text-center" aria-live="polite"><p className="max-w-xs text-xs leading-5 text-[#b9cac6]">Opening the safeguarded faculty studio when it is in view. No message, learner record, or personal data is sent while the studio prepares.</p></div>;
}
