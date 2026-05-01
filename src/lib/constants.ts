import type { ShareAccess } from "@/types/share";
import type { TrackTagVisibility } from "@/types/ui";

export const STATUS_OPTIONS = ["In Progress", "Mastering", "Done"] as const;

export const TRACK_STATUS_OPTIONS = [
  "Idea",
  "Demo",
  "Recording",
  "Mixing",
  "Mastering",
  "Done",
] as const;

export const TRACK_STATUS_COLORS: Record<string, string> = {
  Idea: "#6e6e8a",
  Demo: "#4a9eff",
  Recording: "#ff8c42",
  Mixing: "#f5c518",
  Mastering: "#a89eff",
  Done: "#3ecf8e",
};

export const MOOD_TAG_OPTIONS = [
  "Dark",
  "Energetic",
  "Melancholic",
  "Hype",
  "Chill",
  "Aggressive",
  "Euphoric",
  "Nostalgic",
] as const;

export const MOOD_TAG_COLORS: Record<string, string> = {
  Dark: "#5a4a6e",
  Energetic: "#ff5e3a",
  Melancholic: "#4a7ebd",
  Hype: "#ff3cac",
  Chill: "#38b2ac",
  Aggressive: "#e53e3e",
  Euphoric: "#d69e2e",
  Nostalgic: "#744210",
};

export const MUSICAL_KEYS = [
  "C Major",
  "C Minor",
  "C# Major",
  "C# Minor",
  "D Major",
  "D Minor",
  "D# Major",
  "D# Minor",
  "E Major",
  "E Minor",
  "F Major",
  "F Minor",
  "F# Major",
  "F# Minor",
  "G Major",
  "G Minor",
  "G# Major",
  "G# Minor",
  "A Major",
  "A Minor",
  "A# Major",
  "A# Minor",
  "B Major",
  "B Minor",
] as const;

export const CAMELOT_MAP: Record<string, string> = {
  "C Major": "8B",
  "C Minor": "5A",
  "C# Major": "3B",
  "C# Minor": "12A",
  "D Major": "10B",
  "D Minor": "7A",
  "D# Major": "5B",
  "D# Minor": "2A",
  "E Major": "12B",
  "E Minor": "9A",
  "F Major": "7B",
  "F Minor": "4A",
  "F# Major": "2B",
  "F# Minor": "11A",
  "G Major": "9B",
  "G Minor": "6A",
  "G# Major": "4B",
  "G# Minor": "1A",
  "A Major": "11B",
  "A Minor": "8A",
  "A# Major": "6B",
  "A# Minor": "3A",
  "B Major": "1B",
  "B Minor": "10A",
};

export const CAMELOT_COLORS: Record<string, string> = {
  "1A": "#3ecfb8",
  "1B": "#3abfaa",
  "2A": "#5dd87c",
  "2B": "#52cc6e",
  "3A": "#a0d84a",
  "3B": "#b4e040",
  "4A": "#e8d03a",
  "4B": "#f0c828",
  "5A": "#f0a030",
  "5B": "#e89020",
  "6A": "#e86040",
  "6B": "#e05038",
  "7A": "#e84878",
  "7B": "#d83868",
  "8A": "#c840c8",
  "8B": "#b830b8",
  "9A": "#9040e0",
  "9B": "#8030d0",
  "10A": "#5060e8",
  "10B": "#4050d8",
  "11A": "#3898d8",
  "11B": "#30a8e0",
  "12A": "#30bce0",
  "12B": "#30ccd4",
};

export const SHARE_ACCESS_OPTIONS: Array<{
  value: ShareAccess;
  label: string;
}> = [
  { value: "listen", label: "See + Listen" },
  { value: "view", label: "See Only" },
  { value: "edit", label: "See + Edit + Listen" },
];

export const TRACK_TAG_VISIBILITY_DEFAULTS: TrackTagVisibility = {
  date: true,
  bpm: true,
  key: true,
  playCount: true,
  status: true,
  moodTags: true,
  contextBadges: true,
};

export const TRACK_TAG_VISIBILITY_FIELDS = [
  {
    key: "date",
    label: "Track date",
    description: "Show the date tag in each track row",
  },
  {
    key: "bpm",
    label: "BPM tag",
    description: "Show BPM inline tags",
  },
  {
    key: "key",
    label: "Key + Camelot tag",
    description: "Show musical key and Camelot badge",
  },
  {
    key: "playCount",
    label: "Play count tag",
    description: "Show listen count tags",
  },
  {
    key: "status",
    label: "Status tag",
    description: "Show track status pill",
  },
  {
    key: "moodTags",
    label: "Mood tags",
    description: "Show mood chips below metadata",
  },
  {
    key: "contextBadges",
    label: "Context badges",
    description: "Show version, notes, lyrics, and todos badges",
  },
] as const;

export const UI_SETTINGS_STORAGE_KEY = "studio.uiSettings.v1";

export const HOME_SORT_OPTIONS = [
  { key: "updatedAt", label: "Last Modified", dir: "desc" },
  { key: "createdAt", label: "Date Created", dir: "desc" },
  { key: "title", label: "Title A→Z", dir: "asc" },
  { key: "artist", label: "Artist A→Z", dir: "asc" },
  { key: "status", label: "Status", dir: "asc" },
  { key: "completionPercent", label: "% Complete", dir: "desc" },
  { key: "starRating", label: "Star Rating", dir: "desc" },
  { key: "releaseDate", label: "Release Date", dir: "asc" },
  { key: "startDate", label: "Start Date", dir: "asc" },
] as const;
