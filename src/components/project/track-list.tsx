import { useState } from "react";
import { TrackRow } from "@/components/project/track-row";
import type { Track } from "@/types/project";
import type { TrackTagVisibility } from "@/types/ui";

interface TrackListProps {
  tracks: Track[];
  canEdit: boolean;
  canListen: boolean;
  activeTrackId: string | null;
  isPlaying: boolean;
  visibility: TrackTagVisibility;
  onPlay: (trackId: string) => void;
  onRowPlay: (trackId: string) => void;
  onOpenMenu: (trackId: string) => void;
  onTitleSave: (trackId: string, title: string) => void;
  onReorder: (trackIds: string[]) => void;
}

export function TrackList({
  tracks,
  canEdit,
  canListen,
  activeTrackId,
  isPlaying,
  visibility,
  onPlay,
  onRowPlay,
  onOpenMenu,
  onTitleSave,
  onReorder,
}: TrackListProps) {
  const [draggedTrackId, setDraggedTrackId] = useState<string | null>(null);

  if (!tracks.length) {
    return (
      <div className="rounded-[14px] border border-dashed border-line-bright bg-white/[0.02] p-[26px] text-sm text-muted">
        No tracks uploaded yet. Add WAV, MP3, or FLAC files.
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {tracks.map((track, index) => (
        <div
          key={track.id}
          draggable={canEdit}
          onDragStart={() => setDraggedTrackId(track.id)}
          onDragOver={(event) => {
            if (!canEdit || !draggedTrackId || draggedTrackId === track.id) {
              return;
            }
            event.preventDefault();
          }}
          onDrop={(event) => {
            event.preventDefault();
            if (!canEdit || !draggedTrackId || draggedTrackId === track.id) {
              return;
            }

            const nextTracks = [...tracks];
            const sourceIndex = nextTracks.findIndex((entry) => entry.id === draggedTrackId);
            const targetIndex = nextTracks.findIndex((entry) => entry.id === track.id);
            if (sourceIndex < 0 || targetIndex < 0) return;
            const [movedTrack] = nextTracks.splice(sourceIndex, 1);
            nextTracks.splice(targetIndex, 0, movedTrack);
            onReorder(nextTracks.map((entry) => entry.id));
            setDraggedTrackId(null);
          }}
          onDragEnd={() => setDraggedTrackId(null)}
        >
          <TrackRow
            track={track}
            index={index}
            canEdit={canEdit}
            canListen={canListen}
            activeTrackId={activeTrackId}
            isPlaying={isPlaying}
            visibility={visibility}
            onPlay={onPlay}
            onOpenMenu={onOpenMenu}
            onTitleSave={onTitleSave}
            onRowPlay={onRowPlay}
          />
        </div>
      ))}
    </div>
  );
}
