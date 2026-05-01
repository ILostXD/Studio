import type { PlayerTrack } from "@/hooks/use-player";
import type { ProjectDetails, Track } from "@/types/project";

export function toPlayerTrack(track: Track): PlayerTrack {
  return {
    id: track.id,
    title: track.title,
    originalName: track.originalName,
    audioUrl: track.audioUrl,
    trackNumber: track.trackNumber,
    notes: track.notes,
    lyrics: track.lyrics,
  };
}

export function projectAlbumMeta(project: ProjectDetails) {
  return {
    title: project.title || "Untitled Project",
    artist: project.artist || "Unknown Artist",
    coverUrl: project.coverUrl || null,
    activeCoverId: project.activeCoverId || null,
  };
}
