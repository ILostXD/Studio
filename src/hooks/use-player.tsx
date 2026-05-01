import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { toast } from "sonner";
import WaveSurfer from "wavesurfer.js";
import { clampNumber } from "@/lib/format";

export type PlayerLoopMode = "none" | "all" | "one";

export interface PlayerTrack {
  id: string;
  title: string;
  originalName: string;
  audioUrl?: string;
  trackNumber: number | null;
  notes: string;
  lyrics: string;
}

export interface PlayerAlbumMeta {
  title: string;
  artist: string;
  coverUrl: string | null;
  activeCoverId: string | null;
}

export type PlayerSourceContext =
  | { type: "project"; projectId: string }
  | { type: "share"; token: string };

interface PlayerContextValue {
  wavesurferRef: RefObject<WaveSurfer | null>;
  track: PlayerTrack | null;
  queue: PlayerTrack[];
  index: number;
  album: PlayerAlbumMeta | null;
  sourceContext: PlayerSourceContext | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  loop: PlayerLoopMode;
  shuffle: boolean;
  queueOpen: boolean;
  registerWaveformContainer: (el: HTMLDivElement | null) => void;
  playTrack: (args: {
    track: PlayerTrack;
    queue: PlayerTrack[];
    index: number;
    album: PlayerAlbumMeta;
    sourceContext: PlayerSourceContext;
    onTrackStart?: (trackId: string) => void;
  }) => void;
  playByIndex: (nextIndex: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  playPause: () => void;
  stop: () => void;
  setVolume: (next: number) => void;
  toggleMute: () => void;
  setLoop: (next: PlayerLoopMode) => void;
  toggleShuffle: () => void;
  toggleQueueOpen: () => void;
  closeQueue: () => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [containerNode, setContainerNode] = useState<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const preloadAudioRef = useRef<HTMLAudioElement | null>(null);
  const autoplayOnReadyRef = useRef(false);
  const onTrackStartRef = useRef<((trackId: string) => void) | undefined>();
  const loadAbortRef = useRef<AbortController | null>(null);
  const queueRef = useRef<PlayerTrack[]>([]);
  const indexRef = useRef(-1);
  const loopRef = useRef<PlayerLoopMode>("none");
  const volumeRef = useRef(1);

  const [track, setTrack] = useState<PlayerTrack | null>(null);
  const [queue, setQueue] = useState<PlayerTrack[]>([]);
  const [index, setIndex] = useState(-1);
  const [album, setAlbum] = useState<PlayerAlbumMeta | null>(null);
  const [sourceContext, setSourceContext] = useState<PlayerSourceContext | null>(
    null,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [loop, setLoop] = useState<PlayerLoopMode>("none");
  const [shuffle, setShuffle] = useState(false);
  const [queueOpen, setQueueOpen] = useState(false);

  queueRef.current = queue;
  indexRef.current = index;
  loopRef.current = loop;
  volumeRef.current = volume;

  const playByIndexRef = useRef<(nextIndex: number) => void>(() => {});
  const preloadNextTrackRef = useRef<() => void>(() => {});

  const setVolume = useCallback((next: number) => {
    const normalized = clampNumber(next, 0, 1);
    setVolumeState(normalized);
    if (normalized > 0) {
      setPreviousVolume(normalized);
    }
    wavesurferRef.current?.setVolume(normalized);
  }, []);

  const preloadNextTrack = useCallback(() => {
    if (!preloadAudioRef.current || queue.length === 0) {
      return;
    }

    let nextIndex = -1;
    if (shuffle && queue.length > 1) {
      nextIndex = (index + 1) % queue.length;
    } else {
      nextIndex = index + 1;
      if (nextIndex >= queue.length) {
        if (loop === "all") {
          nextIndex = 0;
        } else {
          return;
        }
      }
    }

    const nextTrack = queue[nextIndex];
    if (!nextTrack?.audioUrl) {
      return;
    }
    if (preloadAudioRef.current.src !== nextTrack.audioUrl) {
      preloadAudioRef.current.src = nextTrack.audioUrl;
      preloadAudioRef.current.load();
    }
  }, [index, loop, queue, shuffle]);
  preloadNextTrackRef.current = preloadNextTrack;

  const loadIntoWaveSurfer = useCallback(
    async (wavesurfer: WaveSurfer, audioUrl: string) => {
      loadAbortRef.current?.abort();
      const controller = new AbortController();
      loadAbortRef.current = controller;

      try {
        const response = await fetch(audioUrl, {
          credentials: "include",
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Audio request failed (${response.status})`);
        }
        const blob = await response.blob();
        if (controller.signal.aborted) {
          return;
        }
        await wavesurfer.loadBlob(blob);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }
        // Fallback to URL loading in case blob loading is unsupported by the source.
        try {
          await wavesurfer.load(audioUrl);
        } catch {
          toast.error("Could not load track audio");
          console.error("Could not load track audio", error);
        }
      } finally {
        if (loadAbortRef.current === controller) {
          loadAbortRef.current = null;
        }
      }
    },
    [],
  );

  const playTrack = useCallback(
    ({
      track: nextTrack,
      queue: nextQueue,
      index: nextIndex,
      album: nextAlbum,
      sourceContext: nextSourceContext,
      onTrackStart,
    }: {
      track: PlayerTrack;
      queue: PlayerTrack[];
      index: number;
      album: PlayerAlbumMeta;
      sourceContext: PlayerSourceContext;
      onTrackStart?: (trackId: string) => void;
    }) => {
      const wavesurfer = wavesurferRef.current;
      if (!wavesurfer || !nextTrack.audioUrl) {
        return;
      }

      if (
        track &&
        track.id === nextTrack.id &&
        track.audioUrl === nextTrack.audioUrl
      ) {
        wavesurfer.playPause();
        return;
      }

      onTrackStartRef.current = onTrackStart;
      onTrackStartRef.current?.(nextTrack.id);

      setQueue(nextQueue);
      setIndex(nextIndex);
      setTrack(nextTrack);
      setAlbum(nextAlbum);
      setSourceContext(nextSourceContext);
      setCurrentTime(0);
      setDuration(0);
      autoplayOnReadyRef.current = true;
      void loadIntoWaveSurfer(wavesurfer, nextTrack.audioUrl);
      setQueueOpen(false);
    },
    [loadIntoWaveSurfer, track],
  );

  const playByIndex = useCallback(
    (nextIndex: number) => {
      if (!queue.length) {
        return;
      }

      let normalized = nextIndex;
      if (normalized < 0) {
        normalized = queue.length - 1;
      }
      if (normalized >= queue.length) {
        normalized = 0;
      }

      const nextTrack = queue[normalized];
      if (!nextTrack || !album || !sourceContext) {
        return;
      }

      playTrack({
        track: nextTrack,
        queue,
        index: normalized,
        album,
        sourceContext,
        onTrackStart: onTrackStartRef.current,
      });
    },
    [album, playTrack, queue, sourceContext],
  );

  playByIndexRef.current = playByIndex;

  const playNext = useCallback(() => {
    if (queue.length === 0) {
      return;
    }

    if (shuffle && queue.length > 1) {
      let randomIndex = index;
      while (randomIndex === index) {
        randomIndex = Math.floor(Math.random() * queue.length);
      }
      playByIndex(randomIndex);
      return;
    }

    playByIndex(index + 1);
  }, [index, playByIndex, queue.length, shuffle]);

  const playPrevious = useCallback(() => {
    const wavesurfer = wavesurferRef.current;
    if (!track || !wavesurfer) {
      return;
    }
    const playbackTime = wavesurfer.getCurrentTime();
    if (playbackTime < 2) {
      if (index <= 0) {
        wavesurfer.pause();
        return;
      }
      playByIndex(index - 1);
      return;
    }
    wavesurfer.seekTo(0);
  }, [index, playByIndex, track]);

  const playPause = useCallback(() => {
    wavesurferRef.current?.playPause();
  }, []);

  const stop = useCallback(() => {
    loadAbortRef.current?.abort();
    wavesurferRef.current?.stop();
    setTrack(null);
    setQueue([]);
    setIndex(-1);
    setCurrentTime(0);
    setDuration(0);
    setQueueOpen(false);
  }, []);

  const toggleMute = useCallback(() => {
    if (volume <= 0.001) {
      setVolume(previousVolume || 0.85);
      return;
    }
    setPreviousVolume(volume);
    setVolume(0);
  }, [previousVolume, setVolume, volume]);

  const toggleShuffle = useCallback(() => {
    setShuffle((prev) => !prev);
  }, []);

  const toggleQueueOpen = useCallback(() => {
    setQueueOpen((prev) => !prev);
  }, []);

  const closeQueue = useCallback(() => {
    setQueueOpen(false);
  }, []);

  const registerWaveformContainer = useCallback((el: HTMLDivElement | null) => {
    setContainerNode(el);
  }, []);

  useEffect(() => {
    preloadAudioRef.current = new Audio();
    preloadAudioRef.current.preload = "auto";
    return () => {
      loadAbortRef.current?.abort();
      if (preloadAudioRef.current) {
        preloadAudioRef.current.pause();
        preloadAudioRef.current.src = "";
      }
    };
  }, []);

  useEffect(() => {
    if (!containerNode || wavesurferRef.current) {
      return;
    }

    const playerAudioEl = document.createElement("audio");
    playerAudioEl.preload = "auto";

    const wave = WaveSurfer.create({
      container: containerNode,
      media: playerAudioEl,
      backend: "MediaElement",
      waveColor: "rgba(255, 255, 255, 0.18)",
      progressColor: "#A89EFF",
      cursorColor: "#d9d4ff",
      barWidth: 1.2,
      barGap: 1.2,
      barRadius: 2,
      height: 30,
      normalize: true,
      hideScrollbar: true,
    });

    wavesurferRef.current = wave;
    wave.setVolume(volumeRef.current);

    const onCanPlay = () => {
      if (autoplayOnReadyRef.current) {
        autoplayOnReadyRef.current = false;
        playerAudioEl.volume = clampNumber(volumeRef.current, 0, 1);
        void playerAudioEl.play();
      }
    };

    playerAudioEl.addEventListener("canplay", onCanPlay);

    const unReady = wave.on("ready", () => {
      setDuration(wave.getDuration());
      if (autoplayOnReadyRef.current) {
        autoplayOnReadyRef.current = false;
        void wave.play();
      }
      wave.setVolume(volumeRef.current);
      preloadNextTrackRef.current();
    });
    const unPlay = wave.on("play", () => setIsPlaying(true));
    const unPause = wave.on("pause", () => setIsPlaying(false));
    const unTimeUpdate = wave.on("timeupdate", (time) => setCurrentTime(time));
    const unAudioProcess = wave.on("audioprocess", () =>
      setCurrentTime(wave.getCurrentTime()),
    );
    const unInteraction = wave.on("interaction", () =>
      setCurrentTime(wave.getCurrentTime()),
    );
    const unFinish = wave.on("finish", () => {
      if (loopRef.current === "one") {
        wave.seekTo(0);
        void wave.play();
        return;
      }
      if (loopRef.current === "all") {
        playByIndexRef.current(indexRef.current + 1);
        return;
      }
      const nextIndex = indexRef.current + 1;
      if (nextIndex < queueRef.current.length) {
        playByIndexRef.current(nextIndex);
      }
    });
    const unError = wave.on("error", (error) => {
      console.error("WaveSurfer error:", error);
    });

    return () => {
      playerAudioEl.removeEventListener("canplay", onCanPlay);
      unReady();
      unPlay();
      unPause();
      unTimeUpdate();
      unAudioProcess();
      unInteraction();
      unFinish();
      unError();
      wave.destroy();
      wavesurferRef.current = null;
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    };
  }, [containerNode]);

  useEffect(() => {
    wavesurferRef.current?.setVolume(volume);
  }, [volume]);

  const value = useMemo<PlayerContextValue>(
    () => ({
      wavesurferRef,
      track,
      queue,
      index,
      album,
      sourceContext,
      isPlaying,
      currentTime,
      duration,
      volume,
      loop,
      shuffle,
      queueOpen,
      registerWaveformContainer,
      playTrack,
      playByIndex,
      playNext,
      playPrevious,
      playPause,
      stop,
      setVolume,
      toggleMute,
      setLoop,
      toggleShuffle,
      toggleQueueOpen,
      closeQueue,
    }),
    [
      album,
      closeQueue,
      currentTime,
      duration,
      index,
      isPlaying,
      loop,
      playByIndex,
      playNext,
      playPause,
      playPrevious,
      playTrack,
      queue,
      queueOpen,
      registerWaveformContainer,
      setVolume,
      shuffle,
      sourceContext,
      stop,
      toggleMute,
      toggleQueueOpen,
      toggleShuffle,
      track,
      volume,
    ],
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used inside PlayerProvider");
  }
  return context;
}
