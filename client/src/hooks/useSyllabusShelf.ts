import { useEffect, useState } from "react";
import { normalizeSyllabusShelf, syllabusShelfStorageKey, toggleSyllabusCourse } from "@/lib/syllabusShelf";

export function parseSyllabusShelfStorage(raw: string | null): string[] {
  try {
    return normalizeSyllabusShelf(JSON.parse(raw ?? "[]"));
  } catch {
    return [];
  }
}

export function useSyllabusShelf() {
  const [shelfCodes, setShelfCodes] = useState<string[]>([]);
  useEffect(() => {
    const sync = (raw: string | null) => setShelfCodes(parseSyllabusShelfStorage(raw));
    sync(window.localStorage.getItem(syllabusShelfStorageKey));
    const onStorage = (event: StorageEvent) => {
      if (event.key === syllabusShelfStorageKey) sync(event.newValue);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  const toggleShelf = (courseCode: string) => setShelfCodes((current) => {
    const next = toggleSyllabusCourse(current, courseCode);
    window.localStorage.setItem(syllabusShelfStorageKey, JSON.stringify(next));
    return next;
  });
  return [shelfCodes, toggleShelf] as const;
}
