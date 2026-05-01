export interface TrackTagVisibility {
  date: boolean;
  bpm: boolean;
  key: boolean;
  playCount: boolean;
  status: boolean;
  moodTags: boolean;
  contextBadges: boolean;
}

export interface UiSettings {
  trackTagVisibility: TrackTagVisibility;
}
