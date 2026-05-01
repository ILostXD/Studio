import { useEffect, useState } from "react";
import { TRACK_TAG_VISIBILITY_DEFAULTS } from "@/lib/constants";
import { loadUiSettings, saveUiSettings } from "@/lib/ui-settings";
import type { TrackTagVisibility } from "@/types/ui";

export function useUiSettings() {
  const [trackTagVisibility, setTrackTagVisibility] = useState<TrackTagVisibility>(
    () => ({ ...TRACK_TAG_VISIBILITY_DEFAULTS }),
  );

  useEffect(() => {
    setTrackTagVisibility(loadUiSettings());
  }, []);

  const updateTrackTagVisibility = (next: TrackTagVisibility) => {
    setTrackTagVisibility(next);
    saveUiSettings(next);
  };

  return {
    trackTagVisibility,
    updateTrackTagVisibility,
  };
}
