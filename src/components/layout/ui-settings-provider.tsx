import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { TRACK_TAG_VISIBILITY_DEFAULTS } from "@/lib/constants";
import { loadUiSettings, saveUiSettings } from "@/lib/ui-settings";
import type { TrackTagVisibility } from "@/types/ui";

interface UiSettingsContextValue {
  trackTagVisibility: TrackTagVisibility;
  setTrackTagVisibility: (next: TrackTagVisibility) => void;
  resetTrackTagVisibility: () => void;
}

const UiSettingsContext = createContext<UiSettingsContextValue | null>(null);

export function UiSettingsProvider({ children }: { children: ReactNode }) {
  const [trackTagVisibility, setTrackTagVisibilityState] = useState<TrackTagVisibility>(
    () => loadUiSettings(),
  );

  const setTrackTagVisibility = (next: TrackTagVisibility) => {
    setTrackTagVisibilityState(next);
    saveUiSettings(next);
  };

  const resetTrackTagVisibility = () => {
    const defaults = { ...TRACK_TAG_VISIBILITY_DEFAULTS };
    setTrackTagVisibilityState(defaults);
    saveUiSettings(defaults);
  };

  const value = useMemo(
    () => ({
      trackTagVisibility,
      setTrackTagVisibility,
      resetTrackTagVisibility,
    }),
    [trackTagVisibility],
  );

  return (
    <UiSettingsContext.Provider value={value}>
      {children}
    </UiSettingsContext.Provider>
  );
}

export function useUiSettingsStore() {
  const context = useContext(UiSettingsContext);
  if (!context) {
    throw new Error("useUiSettingsStore must be used inside UiSettingsProvider");
  }
  return context;
}
