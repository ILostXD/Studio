import {
  TRACK_TAG_VISIBILITY_DEFAULTS,
  UI_SETTINGS_STORAGE_KEY,
} from "@/lib/constants";
import type { TrackTagVisibility } from "@/types/ui";

export function normalizeTrackTagVisibility(value: unknown): TrackTagVisibility {
  const source = value && typeof value === "object" ? (value as Record<string, unknown>) : {};

  return {
    date:
      typeof source.date === "boolean"
        ? source.date
        : TRACK_TAG_VISIBILITY_DEFAULTS.date,
    bpm:
      typeof source.bpm === "boolean"
        ? source.bpm
        : TRACK_TAG_VISIBILITY_DEFAULTS.bpm,
    key:
      typeof source.key === "boolean"
        ? source.key
        : TRACK_TAG_VISIBILITY_DEFAULTS.key,
    playCount:
      typeof source.playCount === "boolean"
        ? source.playCount
        : TRACK_TAG_VISIBILITY_DEFAULTS.playCount,
    status:
      typeof source.status === "boolean"
        ? source.status
        : TRACK_TAG_VISIBILITY_DEFAULTS.status,
    moodTags:
      typeof source.moodTags === "boolean"
        ? source.moodTags
        : TRACK_TAG_VISIBILITY_DEFAULTS.moodTags,
    contextBadges:
      typeof source.contextBadges === "boolean"
        ? source.contextBadges
        : TRACK_TAG_VISIBILITY_DEFAULTS.contextBadges,
  };
}

export function loadUiSettings(): TrackTagVisibility {
  try {
    const raw = window.localStorage.getItem(UI_SETTINGS_STORAGE_KEY);
    if (!raw) {
      return { ...TRACK_TAG_VISIBILITY_DEFAULTS };
    }
    const parsed = JSON.parse(raw) as { trackTagVisibility?: unknown };
    return normalizeTrackTagVisibility(parsed.trackTagVisibility);
  } catch {
    return { ...TRACK_TAG_VISIBILITY_DEFAULTS };
  }
}

export function saveUiSettings(visibility: TrackTagVisibility): void {
  try {
    const payload = {
      trackTagVisibility: normalizeTrackTagVisibility(visibility),
    };
    window.localStorage.setItem(UI_SETTINGS_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage errors.
  }
}
