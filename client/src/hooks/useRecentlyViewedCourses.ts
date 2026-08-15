import { useCallback, useEffect, useState } from "react";
import {
  normalizeRecentlyViewedCourses,
  recentlyViewedStorageKey,
  recordRecentlyViewedCourse,
} from "@/lib/recentlyViewed";

export function parseRecentlyViewedStorage(raw: string | null): string[] {
  try {
    return normalizeRecentlyViewedCourses(JSON.parse(raw ?? "[]"));
  } catch {
    return [];
  }
}

export function parseRecentlyViewedStorageEvent(key: string | null, newValue: string | null): string[] | null {
  return key === recentlyViewedStorageKey ? parseRecentlyViewedStorage(newValue) : null;
}

export function useRecentlyViewedCourses() {
  const [courseCodes, setCourseCodes] = useState<string[]>([]);

  useEffect(() => {
    const sync = (raw: string | null) => setCourseCodes(parseRecentlyViewedStorage(raw));
    sync(window.localStorage.getItem(recentlyViewedStorageKey));
    const onStorage = (event: StorageEvent) => {
      const next = parseRecentlyViewedStorageEvent(event.key, event.newValue);
      if (next) setCourseCodes(next);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const recordCourse = useCallback((courseCode: string) => {
    setCourseCodes((current) => {
      const next = recordRecentlyViewedCourse(current, courseCode);
      window.localStorage.setItem(recentlyViewedStorageKey, JSON.stringify(next));
      return next;
    });
  }, []);

  return [courseCodes, recordCourse] as const;
}
