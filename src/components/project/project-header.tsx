import {
  Play,
  Shuffle,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { buildDeadlineCountdown, formatRuntime } from "@/lib/format";
import type { ProjectDetails } from "@/types/project";

interface ProjectHeaderProps {
  project: ProjectDetails;
  canEdit: boolean;
  canListen: boolean;
  onSaveTitle: (title: string) => void;
  onSaveArtist: (artist: string) => void;
  onPlayAll: () => void;
  onShufflePlay: () => void;
}

export function ProjectHeader({
  project,
  canEdit,
  canListen,
  onSaveTitle,
  onSaveArtist,
  onPlayAll,
  onShufflePlay,
}: ProjectHeaderProps) {
  const trackCount = project.tracks.length;
  const trackCountLabel = trackCount === 1 ? "1 track" : `${trackCount} tracks`;
  const countdown = buildDeadlineCountdown(project.releaseDate);
  const artistInputRef = useRef<HTMLInputElement | null>(null);
  const artistMeasureRef = useRef<HTMLSpanElement | null>(null);

  const syncArtistInputWidth = (value: string) => {
    const input = artistInputRef.current;
    const measure = artistMeasureRef.current;
    if (!input || !measure) {
      return;
    }

    const probeText = value || input.placeholder || " ";
    measure.textContent = probeText;
    const measuredWidth = Math.ceil(measure.getBoundingClientRect().width) + 2;
    input.style.width = `${Math.max(18, measuredWidth)}px`;
  };

  useEffect(() => {
    if (!canEdit) {
      return;
    }
    syncArtistInputWidth(project.artist || "");
  }, [canEdit, project.artist]);

  return (
    <section className="project-head mb-1 flex items-start justify-between gap-[18px] max-[680px]:flex-col">
      <div className="min-w-0">
        {canEdit ? (
          <input
            defaultValue={project.title || ""}
            className="h-auto w-full border border-transparent bg-transparent p-0 text-[clamp(28px,3.8vw,38px)] font-bold leading-[1.05] tracking-[0.01em] text-text outline-none transition focus:border-accent/35 focus:bg-accent/10"
            placeholder="Project title"
            onBlur={(event) => onSaveTitle(event.target.value.trim())}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.currentTarget.blur();
              }
            }}
          />
        ) : (
          <h1 className="text-[clamp(28px,3.8vw,38px)] font-bold leading-[1.05] tracking-[0.01em]">
            {project.title || "Untitled Project"}
          </h1>
        )}

        <div className="project-stats-row mt-1.5 flex flex-wrap items-center gap-2 text-[15px] text-[#aeb4c0]">
          {canEdit ? (
            <>
              <input
                ref={artistInputRef}
                defaultValue={project.artist || ""}
                className="h-auto max-w-full min-w-[18px] rounded-md border border-transparent bg-transparent p-0 text-[15px] text-[#aeb4c0] outline-none transition focus:border-accent/35 focus:bg-accent/10"
                placeholder="Artist"
                onInput={(event) => syncArtistInputWidth(event.currentTarget.value)}
                onBlur={(event) => onSaveArtist(event.target.value.trim())}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.currentTarget.blur();
                  }
                }}
              />
              <span
                ref={artistMeasureRef}
                aria-hidden="true"
                className="pointer-events-none absolute -left-[9999px] top-0 whitespace-pre border border-transparent p-0 text-[15px] leading-normal"
              />
            </>
          ) : (
            <span>{project.artist || "Unknown Artist"}</span>
          )}
          <span className="text-[#737373]">•</span>
          <span className="text-[13px] text-[#a2a8b3]">{trackCountLabel}</span>
          <span className="text-[#737373]">•</span>
          <span className="text-[13px] text-[#a2a8b3]">{formatRuntime(project.totalRuntimeSeconds || 0)}</span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {project.colorPalette?.map((color, index) => (
            <span
              key={`${color}-${index}`}
              className="h-5 w-5 rounded-full border border-white/30"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
          {countdown ? (
            <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] text-muted">
              {countdown.label}
            </span>
          ) : null}
        </div>
      </div>

      <div className="project-main-controls flex items-center gap-2">
        <Button
          size="icon"
          disabled={!canListen}
          onClick={onShufflePlay}
          title="Shuffle queue"
          className="h-9 w-9 rounded-full border-white/10 bg-white/[0.03] text-[#e2e2e2]"
        >
          <Shuffle className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="primary"
          disabled={!canListen}
          onClick={onPlayAll}
          title="Play from start"
          className="h-9 w-9 rounded-full border-white/20 bg-white/90 text-black hover:bg-white"
        >
          <Play className="h-4 w-4 fill-current" />
        </Button>
      </div>
    </section>
  );
}
