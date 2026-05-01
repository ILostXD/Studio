import type { ShareAccess, ShareLink, ShareSession } from "./share";

export interface TodoItem {
  id: string;
  text: string;
  done: boolean;
}

export interface TrackVersion {
  id: string;
  originalName: string;
  durationSeconds: number | null;
  sizeBytes: number | null;
  createdAt: string;
  updatedAt: string;
  audioUrl?: string;
}

export interface Track {
  id: string;
  title: string;
  trackNumber: number | null;
  originalName: string;
  durationSeconds: number | null;
  sizeBytes: number | null;
  audioUrl?: string;
  notes: string;
  lyrics: string;
  todos: TodoItem[];
  createdAt: string;
  updatedAt: string;
  order: number;
  versions: TrackVersion[];
  versionCount: number;
  activeVersionId: string | null;
  bpm: number | null;
  key: string | null;
  trackStatus: string | null;
  moodTags: string[];
  listenCount: number;
  lufs: number | null;
  peakDb: number | null;
}

export interface CoverVersion {
  id: string;
  coverUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface StreamingChecklist {
  spotify: boolean;
  appleMusic: boolean;
  bandcamp: boolean;
  tidal: boolean;
  youtubeMusic: boolean;
  soundCloud: boolean;
}

export interface MoodboardReferenceItem {
  id: string;
  type: "reference";
  artist: string;
  title: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface MoodboardEmbedItem {
  id: string;
  type: "embed";
  url: string;
  provider: "youtube" | "soundcloud";
  createdAt: string;
  updatedAt: string;
}

export type MoodboardItem = MoodboardReferenceItem | MoodboardEmbedItem;

export interface ProjectSummary {
  id: string;
  title: string;
  artist: string;
  description: string;
  status: string;
  coverUrl: string | null;
  trackCount: number;
  totalRuntimeSeconds: number;
  shareUrl: string | null;
  shareLinks: ShareLink[];
  completionPercent: number;
  starRating: number;
  startDate: string | null;
  releaseDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectDetails extends ProjectSummary, Partial<ShareSession> {
  tracks: Track[];
  coverVersions: CoverVersion[];
  activeCoverId: string | null;
  colorPalette: string[];
  streamingChecklist: StreamingChecklist;
  preSaveLink: string;
  distributorNotes: string;
  moodboardItems: MoodboardItem[];
  shareAccess?: ShareAccess;
}

export interface SessionResponse {
  authenticated: boolean;
  user: AuthUser | null;
  needsSetup: boolean;
}

export interface AuthUser {
  id: string;
  username: string;
  createdAt: string;
  isAdmin: boolean;
}

export interface AccountResponse {
  user: AuthUser;
}

export interface UsersListResponse {
  users: AuthUser[];
}

export interface ProjectListResponse {
  projects: ProjectSummary[];
}

export interface ProjectResponse {
  project: ProjectDetails;
}

export interface ShareCreateResponse extends ProjectResponse {
  shareLink: ShareLink;
}

export interface TrackPlayResponse {
  listenCount: number;
}
