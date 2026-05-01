import { useEffect, useRef } from "react";
import {
  ListMusic,
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/cn";
import { clampNumber, formatSeconds } from "@/lib/format";
import { usePlayer } from "@/hooks/use-player";

export function PlayerBar() {
  const navigate = useNavigate();
  const player = usePlayer();
  const hasTrack = Boolean(player.track);
  const volumeWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const volumeWrap = volumeWrapRef.current;
    if (!volumeWrap) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      if (!hasTrack || event.deltaY === 0) {
        return;
      }

      event.preventDefault();

      const unitScale =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 24
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? 120
            : 1;
      const pixelDelta = event.deltaY * unitScale;
      const nextVolume = clampNumber(player.volume - pixelDelta * 0.0008, 0, 1);

      if (Math.abs(nextVolume - player.volume) > 0.0005) {
        player.setVolume(nextVolume);
      }
    };

    volumeWrap.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      volumeWrap.removeEventListener("wheel", handleWheel);
    };
  }, [hasTrack, player.setVolume, player.volume]);

  const loopIcon =
    player.loop === "one" ? (
      <Repeat1 className="h-4 w-4" />
    ) : (
      <Repeat className="h-4 w-4" />
    );

  return (
    <section
      className={cn(
        "player-shell pointer-events-none fixed bottom-[46px] left-1/2 z-50 w-[min(860px,calc(100vw-22px))] -translate-x-1/2 transition-[opacity,transform] duration-300",
        hasTrack ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      )}
    >
      <div
        className={cn(
          "player",
          hasTrack ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div className="player-main">
          <button
            type="button"
            disabled={!hasTrack}
            className="player-track text-left disabled:cursor-default"
            onClick={() => {
              if (!player.sourceContext) return;
              if (player.sourceContext.type === "project") {
                navigate(`/project/${encodeURIComponent(player.sourceContext.projectId)}`);
              } else {
                navigate(`/share/${encodeURIComponent(player.sourceContext.token)}`);
              }
            }}
          >
            <div
              className={cn(
                "player-cover-art",
                player.album?.coverUrl && "has-image",
                player.isPlaying && "is-playing",
              )}
            >
              {player.album?.coverUrl ? (
                <img
                  src={`${player.album.coverUrl}${player.album.activeCoverId ? `?v=${encodeURIComponent(player.album.activeCoverId)}` : ""}`}
                  alt="Cover"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{(player.album?.title || "Studio").charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="player-album-title truncate">
                {player.album?.title || ""}
              </p>
              <p className="player-track-title truncate">
                {player.track?.title || player.track?.originalName || "Select a track to play"}
              </p>
              <p className="player-track-subtitle truncate">
                {player.album?.artist || "Unknown Artist"}
              </p>
            </div>
          </button>

          <div className="player-waveform-wrap">
            <div
              ref={(el) => player.registerWaveformContainer(el)}
              className="waveform player-waveform"
            />
          </div>

          <div className="player-tail">
            <span className="player-time font-mono">
              {formatSeconds(player.currentTime)} / {formatSeconds(player.duration)}
            </span>

            <button
              type="button"
              disabled={!hasTrack}
              onClick={player.playPrevious}
              aria-label="Previous track"
              title="Previous track"
              className="player-btn"
            >
              <SkipBack className="h-[15px] w-[15px]" />
            </button>
            <button
              type="button"
              disabled={!hasTrack}
              onClick={player.playPause}
              aria-label="Play or pause"
              title="Play or pause"
              className="player-btn primary player-btn-main"
            >
              {player.isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              disabled={!hasTrack}
              onClick={player.playNext}
              aria-label="Next track"
              title="Next track"
              className="player-btn"
            >
              <SkipForward className="h-[15px] w-[15px]" />
            </button>
            <button
              type="button"
              disabled={!hasTrack}
              aria-label="Queue"
              className={cn(
                "player-btn",
                player.queueOpen && "is-active",
              )}
              onClick={player.toggleQueueOpen}
              title="Queue"
            >
              <ListMusic className="h-[15px] w-[15px]" />
            </button>
            <button
              type="button"
              disabled={!hasTrack}
              aria-label="Shuffle"
              className={cn(
                "player-btn",
                player.shuffle && "is-active",
              )}
              onClick={player.toggleShuffle}
              title={player.shuffle ? "Shuffle: on" : "Shuffle: off"}
            >
              <Shuffle className="h-[15px] w-[15px]" />
            </button>
            <button
              type="button"
              disabled={!hasTrack}
              aria-label={`Loop: ${player.loop}`}
              className={cn(
                "player-btn",
                player.loop !== "none" && "is-active",
              )}
              onClick={() => {
                const modes: Array<"none" | "all" | "one"> = ["none", "all", "one"];
                const currentIndex = modes.indexOf(player.loop);
                player.setLoop(modes[(currentIndex + 1) % modes.length]);
              }}
              title={`Loop: ${player.loop}`}
            >
              {loopIcon}
            </button>
            <div ref={volumeWrapRef} className="player-volume">
              <button
                type="button"
                disabled={!hasTrack}
                onClick={player.toggleMute}
                aria-label="Mute or unmute"
                className="player-btn player-volume-btn"
                title={player.volume > 0 ? "Mute" : "Unmute"}
              >
                {player.volume > 0 ? (
                  <Volume2 className="h-[15px] w-[15px]" />
                ) : (
                  <VolumeX className="h-[15px] w-[15px]" />
                )}
              </button>
              <div className="player-volume-popover">
                <input
                  aria-label="Volume"
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={player.volume}
                  disabled={!hasTrack}
                  onChange={(event) => player.setVolume(Number(event.target.value))}
                  className="player-volume-slider"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {hasTrack ? (
        <div className={cn("player-queue-popover", player.queueOpen && "is-open")}>
          <p className="player-queue-header">Queue</p>
          <div className="player-queue-list max-h-60 overflow-y-auto">
            {player.queue.map((item, itemIndex) => (
              <button
                key={`${item.id}-${itemIndex}`}
                type="button"
                className={cn(
                  "player-queue-item",
                  itemIndex === player.index && "is-active",
                )}
                onClick={() => {
                  player.playByIndex(itemIndex);
                  player.closeQueue();
                }}
              >
                <span className="player-queue-num">{itemIndex + 1}</span>
                <span className="player-queue-name">
                  {item.title || item.originalName || "Untitled"}
                </span>
              </button>
            ))}
            {player.queue.length === 0 ? (
              <p className="player-queue-empty">No tracks in queue</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
