// @vitest-environment happy-dom
import React, { act, useEffect } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";
import { syllabusShelfStorageKey } from "@/lib/syllabusShelf";
import { useSyllabusShelf } from "./useSyllabusShelf";

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

function mountProbe(onChange: (codes: string[]) => void, onClearReady?: (clear: () => void) => void) {
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  function Probe() {
    const [codes, , clear] = useSyllabusShelf();
    useEffect(() => { onChange(codes); }, [codes]);
    useEffect(() => { onClearReady?.(clear); }, [clear, onClearReady]);
    return null;
  }
  act(() => root?.render(<Probe />));
}

describe("useSyllabusShelf browser storage synchronization", () => {
  it("updates shelf state for a valid designated StorageEvent", () => {
    const states: string[][] = [];
    mountProbe((codes) => states.push(codes));
    act(() => window.dispatchEvent(new StorageEvent("storage", { key: syllabusShelfStorageKey, newValue: '["FSH 302","invalid"]' })));
    expect(states.at(-1)).toEqual(["FSH 302"]);
  });

  it("does not update shelf state for an unrelated StorageEvent", () => {
    const states: string[][] = [];
    mountProbe((codes) => states.push(codes));
    const initialCount = states.length;
    act(() => window.dispatchEvent(new StorageEvent("storage", { key: "unrelated_key", newValue: '["FSH 206"]' })));
    expect(states).toHaveLength(initialCount);
  });

  it("clears only the private shelf codes from browser storage", () => {
    window.localStorage.setItem(syllabusShelfStorageKey, '["FSH 302"]');
    const states: string[][] = [];
    let clear: () => void = () => {};
    mountProbe((codes) => states.push(codes), (nextClear) => { clear = nextClear; });
    act(() => clear());
    expect(window.localStorage.getItem(syllabusShelfStorageKey)).toBeNull();
    expect(states.at(-1)).toEqual([]);
  });
});
