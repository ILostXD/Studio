import { CSSProperties, MouseEvent, useEffect, useRef, useState } from "react";
import { MoreHorizontal, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CAMELOT_MAP } from "@/lib/constants";
import { formatShortDate } from "@/lib/format";
import { cn } from "@/lib/cn";
import { CAMELOT_CLASS, MOOD_TAG_CLASS } from "@/lib/tag-classes";
import { normalizeTodos } from "@/lib/todos";
import type { Track } from "@/types/project";
import type { TrackTagVisibility } from "@/types/ui";

interface TrackRowProps {
  track: Track;
  index: number;
  canEdit: boolean;
  canListen: boolean;
  activeTrackId: string | null;
  isPlaying: boolean;
  visibility: TrackTagVisibility;
  onPlay: (trackId: string) => void;
  onOpenMenu: (trackId: string) => void;
  onTitleSave: (trackId: string, title: string) => void;
  onRowPlay: (trackId: string) => void;
}

export function TrackRow({
  track,
  index,
  canEdit,
  canListen,
  activeTrackId,
  isPlaying,
  visibility,
  onPlay,
  onOpenMenu,
  onTitleSave,
  onRowPlay,
}: TrackRowProps) {
  const isActiveTrack = activeTrackId === track.id;
  const todos = normalizeTodos(track.todos);
  const openTodoCount = todos.filter((todo) => !todo.done).length;
  const camelot = track.key ? CAMELOT_MAP[track.key] : null;
  const statusDotClass: Record<string, string> = {
    Idea: "bg-slate-400",
    Demo: "bg-sky-400",
    Recording: "bg-orange-400",
    Mixing: "bg-amber-300",
    Mastering: "bg-violet-400",
    Done: "bg-emerald-400",
  };

  const badges: string[] = [];
  if (visibility.contextBadges && track.notes) {
    badges.push("Notes");
  }
  if (visibility.contextBadges && track.lyrics) {
    badges.push("Lyrics");
  }
  if (visibility.contextBadges && todos.length) {
    badges.push(`Todos ${openTodoCount}/${todos.length}`);
  }

  const versionWrapRef = useRef<HTMLSpanElement | null>(null);
  const versionInnerRef = useRef<HTMLSpanElement | null>(null);
  const [isVersionScrolling, setIsVersionScrolling] = useState(false);
  const [versionMarqueeOffset, setVersionMarqueeOffset] = useState(0);

  useEffect(() => {
    if (!visibility.contextBadges || !track.originalName) {
      setIsVersionScrolling(false);
      setVersionMarqueeOffset(0);
      return;
    }

    const measure = () => {
      const wrapWidth = versionWrapRef.current?.clientWidth || 0;
      const innerWidth = versionInnerRef.current?.scrollWidth || 0;
      const overflow = innerWidth - wrapWidth;
      if (overflow > 4) {
        setIsVersionScrolling(true);
        setVersionMarqueeOffset(-(overflow + 8));
      } else {
        setIsVersionScrolling(false);
        setVersionMarqueeOffset(0);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [track.originalName, visibility.contextBadges]);

  const versionMarqueeStyle: CSSProperties | undefined = isVersionScrolling
    ? ({ "--marquee-offset": `${versionMarqueeOffset}px` } as CSSProperties)
    : undefined;

  const trackMeta: string[] = [];
  if (visibility.date) {
    trackMeta.push(formatShortDate(track.createdAt) || "No date");
  }
  if (visibility.bpm && track.bpm) {
    trackMeta.push(`${track.bpm} BPM`);
  }
  if (visibility.key && track.key) {
    trackMeta.push(track.key);
  }
  if (visibility.playCount && track.listenCount) {
    trackMeta.push(`${track.listenCount} plays`);
  }

  const onRowClick = (event: MouseEvent<HTMLElement>) => {
    if (!canListen) return;
    if (
      (event.target as HTMLElement).closest(
        "button,a,input,select,textarea,label",
      )
    ) {
      return;
    }
    onRowPlay(track.id);
  };

  return (
    <article
      className={cn(
        "grid grid-cols-[24px_1fr_34px_34px] items-center gap-2 border-b border-white/10 px-1 py-[11px] transition-[background-color,transform] duration-150",
        canListen && "cursor-pointer hover:translate-x-[2px] hover:bg-white/[0.025]",
        isActiveTrack && "border-accent/50 bg-accent/10",
      )}
      onClick={onRowClick}
    >
      <div
        className={cn(
          "font-mono text-center text-xs text-[#9b9b9b]",
          canEdit && "cursor-grab",
        )}
        title={canEdit ? "Drag to reorder" : undefined}
      >
        {index + 1}
      </div>

      <div className="min-w-0 space-y-1">
        {canEdit ? (
          <input
            defaultValue={track.title || ""}
            placeholder="Untitled track"
            className="h-auto w-fit max-w-full rounded-md border border-transparent bg-transparent p-0 text-xl font-bold leading-[1.05] text-text outline-none transition focus:border-accent/35 focus:bg-accent/10"
            onBlur={(event) => onTitleSave(track.id, event.target.value.trim())}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.currentTarget.blur();
              }
            }}
          />
        ) : (
          <p className="truncate text-xl font-bold leading-[1.05]">
            {track.title || "Untitled track"}
          </p>
        )}

        <div className="flex min-w-0 flex-wrap items-center gap-1.5 text-[11px] text-[#8a93a6]">
          {camelot && visibility.key ? (
            <span
              className={cn(
                "inline-flex h-5 min-w-7 items-center justify-center rounded-md border px-1.5 font-mono text-[11px] font-bold uppercase",
                CAMELOT_CLASS[camelot] || "border-line text-muted",
              )}
            >
              {camelot}
            </span>
          ) : null}
          {trackMeta.map((segment, segmentIndex) => (
            <span key={`${track.id}-${segment}`} className="inline-flex items-center gap-1.5">
              {segmentIndex > 0 ? <span className="text-[#737373]">•</span> : null}
              <span>{segment}</span>
            </span>
          ))}
        </div>

        {visibility.moodTags && track.moodTags.length ? (
          <div className="mt-0.5 flex flex-wrap gap-1">
            {track.moodTags.map((tag) => (
              <span
                key={`${track.id}-${tag}`}
                className={cn(
                  "rounded-full border px-1.5 py-0.5 text-[10px]",
                  MOOD_TAG_CLASS[tag] || "border-line text-muted",
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-0.5 flex min-w-0 items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1">
            {visibility.contextBadges && track.originalName ? (
              <span
                ref={versionWrapRef}
                className={cn(
                  "track-inline-version marquee-wrap",
                  isVersionScrolling && "is-scrolling",
                )}
                style={versionMarqueeStyle}
                title={track.originalName}
              >
                <span ref={versionInnerRef} className="marquee-inner">
                  {track.originalName}
                </span>
              </span>
            ) : null}
            {badges.map((badge) => (
              <Badge key={`${track.id}-${badge}`} variant="muted" className="border-white/15 bg-white/[0.02] px-1.5 py-0.5 text-[10px] text-[#9ea7bb]">
                {badge}
              </Badge>
            ))}
          </div>
          {visibility.status && track.trackStatus ? (
            <span className="inline-flex h-[19px] items-center gap-1 rounded-full border border-white/15 bg-white/[0.03] px-2 py-0 text-[10px] font-semibold tracking-[0.03em] text-[#bac2d2]">
              <span
                className={cn(
                  "h-[5px] w-[5px] rounded-full",
                  statusDotClass[track.trackStatus] || "bg-[#8690a4]",
                )}
              />
              {track.trackStatus}
            </span>
          ) : null}
        </div>
      </div>

      <Button
        size="icon"
        disabled={!canListen}
        className="h-[34px] w-[34px] rounded-full border-white/15 bg-black/40 p-0 text-[#d9dce6]"
        onClick={() => onPlay(track.id)}
        title={isActiveTrack && isPlaying ? "Pause track" : "Play track"}
      >
        {isActiveTrack && isPlaying ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>
      <Button
        size="icon"
        className="h-[34px] w-[34px] rounded-full border-white/15 bg-black/40 p-0 text-[#d9dce6]"
        onClick={() => onOpenMenu(track.id)}
        title="Track options"
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </article>
  );
}
