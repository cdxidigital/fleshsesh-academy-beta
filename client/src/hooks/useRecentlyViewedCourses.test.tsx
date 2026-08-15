// @vitest-environment happy-dom
import React, { act, useEffect } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";
import { recentlyViewedStorageKey } from "@/lib/recentlyViewed";
import { useRecentlyViewedCourses } from "./useRecentlyViewedCourses";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let root: Root | undefined;
let host: HTMLDivElement | undefined;

afterEach(() => {
  act(() => root?.unmount());
  host?.remove();
  root = undefined;
  host = undefined;
  window.localStorage.clear();
});

function mountProbe(onChange: (codes: string[]) => void) {
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  function Probe() {
    const [codes] = useRecentlyViewedCourses();
    useEffect(() => { onChange(codes); }, [codes]);
    return null;
  }
  act(() => root?.render(<Probe />));
}

describe("useRecentlyViewedCourses browser storage synchronization", () => {
  it("updates code-only state for a valid designated StorageEvent", () => {
    const states: string[][] = [];
    mountProbe((codes) => states.push(codes));
    act(() => window.dispatchEvent(new StorageEvent("storage", { key: recentlyViewedStorageKey, newValue: '["FSH 302","invalid"]' })));
    expect(states.at(-1)).toEqual(["FSH 302"]);
  });

  it("does not update state for an unrelated StorageEvent", () => {
    const states: string[][] = [];
    mountProbe((codes) => states.push(codes));
    const initialCount = states.length;
    act(() => window.dispatchEvent(new StorageEvent("storage", { key: "unrelated_key", newValue: '["FSH 206"]' })));
    expect(states).toHaveLength(initialCount);
  });
});
