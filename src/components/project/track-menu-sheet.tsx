import { useEffect, useMemo, useState } from "react";
import {
  Play,
  Plus,
  Trash2,
  Upload,
  Volume2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
  CAMELOT_MAP,
  MOOD_TAG_OPTIONS,
  MUSICAL_KEYS,
  TRACK_STATUS_OPTIONS,
} from "@/lib/constants";
import { analyzeAudio } from "@/lib/audio-analysis";
import { cn } from "@/lib/cn";
import { formatFileSize, formatSeconds } from "@/lib/format";
import { CAMELOT_CLASS, MOOD_TAG_CLASS } from "@/lib/tag-classes";
import { buildLocalId, normalizeTodos, sanitizeTodoText } from "@/lib/todos";
import { useAutosave } from "@/hooks/use-autosave";
import type { Track, TodoItem } from "@/types/project";
import type { UpdateTrackInput } from "@/api/tracks";

interface TrackMenuSheetProps {
  open: boolean;
  track: Track | null;
  canEdit: boolean;
  canListen: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveTrack: (trackId: string, input: UpdateTrackInput) => Promise<void>;
  onDeleteTrack: (trackId: string) => Promise<void>;
  onPlayTrack: (trackId: string) => void;
  onUploadVersion: (trackId: string, file: File) => Promise<void>;
  onSelectVersion: (trackId: string, versionId: string) => Promise<void>;
  onDeleteVersion: (trackId: string, versionId: string) => Promise<void>;
}

export function TrackMenuSheet({
  open,
  track,
  canEdit,
  canListen,
  onOpenChange,
  onSaveTrack,
  onDeleteTrack,
  onPlayTrack,
  onUploadVersion,
  onSelectVersion,
  onDeleteVersion,
}: TrackMenuSheetProps) {
  const [notes, setNotes] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [todoInput, setTodoInput] = useState("");
  const [bpm, setBpm] = useState<number | null>(null);
  const [key, setKey] = useState<string | null>(null);
  const [trackStatus, setTrackStatus] = useState<string | null>(null);
  const [moodTags, setMoodTags] = useState<string[]>([]);
  const [lufs, setLufs] = useState<number | null>(null);
  const [peakDb, setPeakDb] = useState<number | null>(null);
  const [dirty, setDirty] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadingVersion, setUploadingVersion] = useState(false);

  useEffect(() => {
    if (!track) {
      return;
    }
    setNotes(track.notes || "");
    setLyrics(track.lyrics || "");
    setTodos(normalizeTodos(track.todos));
    setTodoInput("");
    setBpm(track.bpm ?? null);
    setKey(track.key ?? null);
    setTrackStatus(track.trackStatus ?? null);
    setMoodTags(track.moodTags || []);
    setLufs(track.lufs ?? null);
    setPeakDb(track.peakDb ?? null);
    setDirty(false);
  }, [track]);

  const payload = useMemo<UpdateTrackInput | null>(() => {
    if (!track) {
      return null;
    }
    return {
      notes: notes.slice(0, 4000),
      lyrics: lyrics.slice(0, 12000),
      todos: normalizeTodos(todos),
      bpm,
      key,
      trackStatus,
      moodTags,
      lufs,
      peakDb,
    };
  }, [bpm, key, lufs, lyrics, moodTags, notes, peakDb, todos, track]);

  const { flush } = useAutosave({
    value: payload,
    enabled: Boolean(track && canEdit && open && dirty && payload),
    delayMs: 700,
    onSave: async (value) => {
      if (!track || !value) return;
      await onSaveTrack(track.id, value);
      setDirty(false);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Could not autosave track changes");
    },
  });

  const handleSheetOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      onOpenChange(true);
      return;
    }

    if (!canEdit || !dirty) {
      onOpenChange(false);
      return;
    }

    void flush()
      .then(() => {
        onOpenChange(false);
      })
      .catch(() => {});
  };

  if (!track) {
    return null;
  }

  const activeVersionId = track.activeVersionId;
  const canDeleteVersions = (track.versions || []).length > 1;
  const camelotCode = key ? CAMELOT_MAP[key] : null;

  const updateDirty = () => setDirty(true);

  const handleAnalyze = async () => {
    if (!track.audioUrl) {
      toast.error("No audio file available to analyze");
      return;
    }

    setAnalyzing(true);
    try {
      const result = await analyzeAudio(track.audioUrl);
      setLufs(result.lufs);
      setPeakDb(result.peakDb);
      setBpm((prev) => (prev === null ? result.bpm : prev));
      setKey((prev) => (prev === null ? result.key : prev));
      setDirty(true);
      toast.success("Audio analysis complete");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Analysis failed");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleSheetOpenChange}>
      <SheetContent className="track-menu-sheet">
        <header className="track-menu-header">
          <div className="track-menu-headings">
            <h3>{track.title || track.originalName || "Untitled track"}</h3>
            <p>
              {track.trackNumber !== null ? `#${track.trackNumber} • ` : ""}
              {track.originalName || ""}
            </p>
          </div>
        </header>

        <div className="track-menu-actions">
          <Button
            variant="default"
            disabled={!canListen}
            onClick={() => onPlayTrack(track.id)}
            className="track-menu-play"
          >
            <Play className="h-3.5 w-3.5" />
            Play
          </Button>
          <span className="track-listen-count">Autosaves changes</span>
        </div>

        <section className="track-menu-field">
          <div className="flex items-center justify-between">
            <label>Versions</label>
            {canEdit ? (
              <label className="track-menu-todo-add inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-[#0b0b0b] px-3 py-1.5 text-sm hover:border-accent hover:text-accent">
                <Upload className="h-4 w-4" />
                Upload
                <input
                  type="file"
                  accept=".wav,.mp3,.flac"
                  className="hidden"
                  disabled={uploadingVersion}
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    try {
                      setUploadingVersion(true);
                      await onUploadVersion(track.id, file);
                      toast.success("Track version uploaded");
                    } catch (error) {
                      toast.error(error instanceof Error ? error.message : "Could not upload version");
                    } finally {
                      event.currentTarget.value = "";
                      setUploadingVersion(false);
                    }
                  }}
                />
              </label>
            ) : null}
          </div>
          <div className="track-version-list">
            {track.versions?.length ? (
              track.versions.map((version) => {
                const isActive = version.id === activeVersionId;
                return (
                  <div
                    key={version.id}
                    className={cn("version-row", isActive && "active")}
                  >
                    <div className="version-main">
                      <p className="version-title">{version.originalName || "Untitled version"}</p>
                      <p className="version-meta">
                        {formatSeconds(version.durationSeconds)} • {formatFileSize(version.sizeBytes)}
                      </p>
                    </div>
                    <div className="version-actions">
                      <Button
                        size="sm"
                        disabled={!canEdit}
                        className="version-use-button rounded-full"
                        onClick={async () => {
                          try {
                            await onSelectVersion(track.id, version.id);
                            toast.success("Switched track version");
                          } catch (error) {
                            toast.error(error instanceof Error ? error.message : "Could not switch version");
                          }
                        }}
                      >
                        {isActive ? "Active" : "Use"}
                      </Button>
                      <Button
                        size="icon"
                        variant="danger"
                        className="version-delete-button rounded-full"
                        disabled={!canEdit || !canDeleteVersions}
                        onClick={async () => {
                          try {
                            await onDeleteVersion(track.id, version.id);
                            toast.success("Track version deleted");
                          } catch (error) {
                            toast.error(error instanceof Error ? error.message : "Could not delete version");
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="todo-empty">No versions yet.</p>
            )}
          </div>
        </section>

        <section className="track-meta-row">
          <div className="track-meta-col">
            <label>BPM</label>
            <Input
              type="number"
              min={1}
              max={999}
              className="track-num-input"
              value={bpm ?? ""}
              disabled={!canEdit}
              onChange={(event) => {
                setBpm(event.target.value === "" ? null : Number(event.target.value));
                updateDirty();
              }}
            />
          </div>
          <div className="track-meta-col">
            <label>Key</label>
            <div className="track-key-row">
              <Select
                value={key ?? "__empty__"}
                disabled={!canEdit}
                onValueChange={(nextValue) => {
                  setKey(nextValue === "__empty__" ? null : nextValue);
                  updateDirty();
                }}
              >
                <SelectTrigger className={cn("track-key-select", !key && "is-empty")}>
                  <SelectValue placeholder="—" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-line bg-[rgba(10,10,12,0.98)]">
                  <SelectItem value="__empty__">
                    —
                  </SelectItem>
                  {MUSICAL_KEYS.map((musicKey) => (
                    <SelectItem key={musicKey} value={musicKey}>
                      {musicKey}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {camelotCode ? (
                <span
                  className={cn(
                    "camelot-badge",
                    CAMELOT_CLASS[camelotCode] || "border-line text-muted",
                  )}
                >
                  {camelotCode}
                </span>
              ) : null}
            </div>
          </div>
        </section>

        <section className="track-meta-row">
          <div className="track-meta-col">
            <label>Status</label>
            <Select
              value={trackStatus ?? "__empty__"}
              disabled={!canEdit}
              onValueChange={(nextValue) => {
                setTrackStatus(nextValue === "__empty__" ? null : nextValue);
                updateDirty();
              }}
            >
              <SelectTrigger className={cn("track-status-select", !trackStatus && "is-empty")}>
                <SelectValue placeholder="—" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-line bg-[rgba(10,10,12,0.98)]">
                <SelectItem value="__empty__">
                  —
                </SelectItem>
                {TRACK_STATUS_OPTIONS.map((statusOption) => (
                  <SelectItem key={statusOption} value={statusOption}>
                    {statusOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="track-meta-col">
            <label>Play Count</label>
            <p className="track-listen-count">
              Played {track.listenCount || 0} time{(track.listenCount || 0) !== 1 ? "s" : ""}
            </p>
          </div>
        </section>

        <section className="track-menu-field">
          <label>Mood Tags</label>
          <div className="mood-tags-wrap">
            {MOOD_TAG_OPTIONS.map((tag) => {
              const active = moodTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  disabled={!canEdit}
                  onClick={() => {
                    setMoodTags((prev) =>
                      prev.includes(tag)
                        ? prev.filter((value) => value !== tag)
                        : [...prev, tag],
                    );
                    updateDirty();
                  }}
                  className={cn(
                    "mood-chip",
                    active && "active",
                    active ? MOOD_TAG_CLASS[tag] || "border-accent/50 bg-accent/20 text-accent" : "",
                  )}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </section>

        <section className="track-menu-field">
          <div className="flex items-center justify-between">
            <label>Analysis</label>
            <Button
              size="sm"
              disabled={!canEdit || analyzing}
              className="track-menu-todo-add rounded-full px-3"
              onClick={handleAnalyze}
            >
              <Volume2 className="h-4 w-4" />
              {analyzing ? "Analyzing..." : lufs !== null ? "Re-analyze" : "Analyze"}
            </Button>
          </div>
          <div className="lufs-display">
            {lufs !== null ? (
              <span className="lufs-value">LUFS {lufs} dBFS</span>
            ) : null}
            {peakDb !== null ? (
              <span className="lufs-value">Peak {peakDb} dBFS</span>
            ) : null}
            {lufs === null && peakDb === null ? (
              <span className="lufs-empty">Not analyzed</span>
            ) : null}
          </div>
        </section>

        <section className="track-menu-field">
          <label>Notes</label>
          <Textarea
            value={notes}
            disabled={!canEdit}
            placeholder="Session notes"
            className="track-menu-notes"
            onChange={(event) => {
              setNotes(event.target.value);
              updateDirty();
            }}
          />
        </section>

        <section className="track-menu-field">
          <label>Lyrics</label>
          <Textarea
            value={lyrics}
            disabled={!canEdit}
            placeholder="Lyrics with line breaks"
            className="track-menu-lyrics"
            onChange={(event) => {
              setLyrics(event.target.value);
              updateDirty();
            }}
          />
        </section>

        <section className="track-menu-field">
          <div className="track-menu-todo-head">
            <label>Todos</label>
            <Button
              size="sm"
              disabled={!canEdit}
              className="track-menu-todo-add rounded-full"
              onClick={() => {
                const text = sanitizeTodoText(todoInput);
                if (!text) return;
                setTodos((prev) => [
                  ...prev,
                  {
                    id: buildLocalId("todo"),
                    text,
                    done: false,
                  },
                ]);
                setTodoInput("");
                updateDirty();
              }}
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
          <div className="track-menu-todo-add-row">
            <Input
              value={todoInput}
              disabled={!canEdit}
              placeholder="Add todo item"
              maxLength={220}
              onChange={(event) => setTodoInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  const text = sanitizeTodoText(todoInput);
                  if (!text) return;
                  setTodos((prev) => [
                    ...prev,
                    {
                      id: buildLocalId("todo"),
                      text,
                      done: false,
                    },
                  ]);
                  setTodoInput("");
                  updateDirty();
                }
              }}
            />
          </div>
          <div className="track-menu-todo-list">
            {todos.length ? (
              todos.map((todo, todoIndex) => (
                <div
                  key={todo.id}
                  className={cn("todo-row", todo.done && "done")}
                >
                  <button
                    type="button"
                    className="todo-toggle"
                    disabled={!canEdit}
                    onClick={() => {
                      setTodos((prev) =>
                        prev.map((entry, entryIndex) =>
                          entryIndex === todoIndex
                            ? { ...entry, done: !entry.done }
                            : entry,
                        ),
                      );
                      updateDirty();
                    }}
                  >
                    <span className="icon-svg">✓</span>
                  </button>
                  <Input
                    value={todo.text}
                    disabled={!canEdit}
                    maxLength={220}
                    className="todo-text-input"
                    onChange={(event) => {
                      setTodos((prev) =>
                        prev.map((entry, entryIndex) =>
                          entryIndex === todoIndex
                            ? { ...entry, text: sanitizeTodoText(event.target.value) }
                            : entry,
                        ),
                      );
                      updateDirty();
                    }}
                  />
                  <Button
                    size="icon"
                    variant="danger"
                    className="todo-remove-button"
                    disabled={!canEdit}
                    onClick={() => {
                      setTodos((prev) =>
                        prev.filter((_, entryIndex) => entryIndex !== todoIndex),
                      );
                      updateDirty();
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            ) : (
              <p className="todo-empty">No todos yet.</p>
            )}
          </div>
        </section>

        <footer className="track-menu-footer">
          <Button
            variant="danger"
            className="track-menu-delete"
            disabled={!canEdit}
            onClick={async () => {
              try {
                await onDeleteTrack(track.id);
                onOpenChange(false);
              } catch (error) {
                toast.error(error instanceof Error ? error.message : "Could not delete track");
              }
            }}
          >
            <Trash2 className="h-4 w-4" />
            Delete Track
          </Button>
        </footer>
      </SheetContent>
    </Sheet>
  );
}
