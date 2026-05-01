import { useEffect, useMemo, useRef, useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { buildDeadlineCountdown, clampNumber } from "@/lib/format";
import { useAutosave } from "@/hooks/use-autosave";
import type { ProjectDetails } from "@/types/project";
import type { UpdateProjectInput } from "@/api/projects";
import { CustomColorPicker } from "@/components/project/custom-color-picker";

const STREAMING_PLATFORMS = [
  { key: "spotify", label: "Spotify" },
  { key: "appleMusic", label: "Apple Music" },
  { key: "bandcamp", label: "Bandcamp" },
  { key: "tidal", label: "Tidal" },
  { key: "youtubeMusic", label: "YouTube Music" },
  { key: "soundCloud", label: "SoundCloud" },
] as const;

interface MetadataDialogProps {
  open: boolean;
  canEdit: boolean;
  project: ProjectDetails;
  onOpenChange: (open: boolean) => void;
  onSave: (input: UpdateProjectInput) => Promise<void>;
}

export function MetadataDialog({
  open,
  canEdit,
  project,
  onOpenChange,
  onSave,
}: MetadataDialogProps) {
  const [startDate, setStartDate] = useState(project.startDate || "");
  const [releaseDate, setReleaseDate] = useState(project.releaseDate || "");
  const [completionPercent, setCompletionPercent] = useState(
    project.completionPercent || 0,
  );
  const [starRating, setStarRating] = useState(project.starRating || 0);
  const [colorPalette, setColorPalette] = useState<string[]>(
    project.colorPalette || [],
  );
  const [streamingChecklist, setStreamingChecklist] = useState(
    project.streamingChecklist,
  );
  const [preSaveLink, setPreSaveLink] = useState(project.preSaveLink || "");
  const [distributorNotes, setDistributorNotes] = useState(
    project.distributorNotes || "",
  );
  const [dirty, setDirty] = useState(false);
  const [activePaletteIndex, setActivePaletteIndex] = useState<number | null>(
    null,
  );
  const [paletteAnchorRect, setPaletteAnchorRect] = useState<DOMRect | null>(
    null,
  );
  const swatchRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    setStartDate(project.startDate || "");
    setReleaseDate(project.releaseDate || "");
    setCompletionPercent(project.completionPercent || 0);
    setStarRating(project.starRating || 0);
    setColorPalette(project.colorPalette || []);
    setStreamingChecklist(project.streamingChecklist);
    setPreSaveLink(project.preSaveLink || "");
    setDistributorNotes(project.distributorNotes || "");
    setDirty(false);
    setActivePaletteIndex(null);
    setPaletteAnchorRect(null);
  }, [project]);

  useEffect(() => {
    if (!open) {
      setActivePaletteIndex(null);
      setPaletteAnchorRect(null);
    }
  }, [open]);

  useEffect(() => {
    if (activePaletteIndex === null) {
      return;
    }

    const updateAnchor = () => {
      const el = swatchRefs.current[activePaletteIndex];
      if (el) {
        setPaletteAnchorRect(el.getBoundingClientRect());
      }
    };

    updateAnchor();
    window.addEventListener("resize", updateAnchor);
    window.addEventListener("scroll", updateAnchor, true);
    return () => {
      window.removeEventListener("resize", updateAnchor);
      window.removeEventListener("scroll", updateAnchor, true);
    };
  }, [activePaletteIndex, colorPalette.length]);

  const payload = useMemo<UpdateProjectInput>(
    () => ({
      startDate: startDate || null,
      releaseDate: releaseDate || null,
      completionPercent,
      starRating,
      colorPalette,
      streamingChecklist,
      preSaveLink: preSaveLink.trim(),
      distributorNotes,
    }),
    [
      colorPalette,
      completionPercent,
      distributorNotes,
      preSaveLink,
      releaseDate,
      starRating,
      startDate,
      streamingChecklist,
    ],
  );

  const { flush } = useAutosave({
    value: payload,
    enabled: Boolean(open && canEdit && dirty),
    delayMs: 700,
    onSave: async (value) => {
      await onSave(value);
      setDirty(false);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Could not autosave metadata");
    },
  });

  const deadline = buildDeadlineCountdown(releaseDate || null);
  const deadlineToneClass = deadline
    ? deadline.tone === "green"
      ? "countdown-green"
      : deadline.tone === "yellow"
        ? "countdown-yellow"
        : deadline.tone === "red"
          ? "countdown-red"
          : "countdown-overdue"
    : "";

  const openColorPickerForIndex = (index: number) => {
    const target = swatchRefs.current[index];
    if (!target) {
      return;
    }
    setActivePaletteIndex(index);
    setPaletteAnchorRect(target.getBoundingClientRect());
  };

  const removePaletteColor = (index: number) => {
    setColorPalette((prev) => prev.filter((_, entryIndex) => entryIndex !== index));
    setDirty(true);
    if (activePaletteIndex === index) {
      setActivePaletteIndex(null);
      setPaletteAnchorRect(null);
      return;
    }

    if (activePaletteIndex !== null && activePaletteIndex > index) {
      setActivePaletteIndex(activePaletteIndex - 1);
    }
  };

  const handleDialogOpenChange = (nextOpen: boolean) => {
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

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="panel-sheet-wide w-[95vw] max-w-[640px]">
        <DialogHeader>
          <DialogTitle>Metadata</DialogTitle>
        </DialogHeader>

        <div className="max-h-[78vh] overflow-y-auto px-5 pb-5 pt-4 pr-3">
          <section className="meta-section">
            <div className="meta-date-field">
              <label className="meta-section-label">Start Date</label>
              <DatePicker
                value={startDate}
                disabled={!canEdit}
                className="metadata-date-input"
                onChange={(nextDate) => {
                  setStartDate(nextDate);
                  setDirty(true);
                }}
              />
            </div>
            <div className="meta-date-field">
              <label className="meta-section-label">Release Date</label>
              <DatePicker
                value={releaseDate}
                disabled={!canEdit}
                className="metadata-date-input"
                onChange={(nextDate) => {
                  setReleaseDate(nextDate);
                  setDirty(true);
                }}
              />
            </div>
            {deadline ? (
              <p className={`deadline-countdown ${deadlineToneClass}`}>{deadline.label}</p>
            ) : null}
          </section>

          <section className="meta-section">
            <label className="meta-section-label">Completion - {completionPercent}%</label>
            <div className="completion-track">
              <input
                type="range"
                min={0}
                max={100}
                value={completionPercent}
                disabled={!canEdit}
                onChange={(event) => {
                  const nextValue = clampNumber(Number(event.target.value), 0, 100);
                  setCompletionPercent(nextValue);
                  setDirty(true);
                }}
              />
              <input
                type="number"
                min={0}
                max={100}
                disabled={!canEdit}
                value={completionPercent}
                className="metadata-num-input"
                onChange={(event) => {
                  const nextValue = clampNumber(Number(event.target.value || 0), 0, 100);
                  setCompletionPercent(nextValue);
                  setDirty(true);
                }}
              />
            </div>
          </section>

          <section className="meta-section">
            <label className="meta-section-label">Rating</label>
            <div className="star-rating-widget">
              {Array.from({ length: 5 }).map((_, index) => {
                const star = index + 1;
                const active = star <= starRating;
                return (
                  <button
                    key={star}
                    type="button"
                    className={`star-btn ${active ? "active" : ""}`}
                    disabled={!canEdit}
                    onClick={() => {
                      setStarRating((prev) => (prev === star ? 0 : star));
                      setDirty(true);
                    }}
                    title={`${star} stars`}
                  >
                    <Star className="h-5 w-5 fill-current" />
                  </button>
                );
              })}
            </div>
          </section>

          <section className="meta-section">
            <label className="meta-section-label">Color Palette</label>
            <div className="color-palette-row">
              {colorPalette.map((color, index) => (
                <div key={`${color}-${index}`} className="palette-swatch-wrap">
                  <button
                    ref={(el) => {
                      swatchRefs.current[index] = el;
                    }}
                    type="button"
                    disabled={!canEdit}
                    className={`palette-swatch ${activePaletteIndex === index ? "cp-open" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => openColorPickerForIndex(index)}
                    title={color}
                  />
                  <button
                    type="button"
                    className="palette-remove-btn"
                    disabled={!canEdit}
                    onClick={() => removePaletteColor(index)}
                    aria-label="Remove color"
                  >
                    ×
                  </button>
                </div>
              ))}
              {canEdit && colorPalette.length < 5 ? (
                <button
                  type="button"
                  className="palette-add-btn"
                  onClick={() => {
                    const nextIndex = colorPalette.length;
                    setColorPalette((prev) => [...prev, "#a89eff"]);
                    setActivePaletteIndex(nextIndex);
                    setPaletteAnchorRect(null);
                    setDirty(true);
                  }}
                  aria-label="Add color"
                >
                  +
                </button>
              ) : null}
            </div>
          </section>

          <section className="meta-section">
            <label className="meta-section-label">Streaming Platforms</label>
            <div className="streaming-checklist">
              {STREAMING_PLATFORMS.map((platform) => (
                <label key={platform.key} className="stream-check-row">
                  <Checkbox
                    className="stream-checkbox"
                    checked={streamingChecklist[platform.key]}
                    disabled={!canEdit}
                    onCheckedChange={(checked) => {
                      setStreamingChecklist((prev) => ({
                        ...prev,
                        [platform.key]: checked === true,
                      }));
                      setDirty(true);
                    }}
                  />
                  <span>{platform.label}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="meta-section">
            <label className="meta-section-label">Pre-Save Link</label>
            <Input
              type="url"
              placeholder="https://..."
              disabled={!canEdit}
              value={preSaveLink}
              className="metadata-url-input"
              onChange={(event) => {
                setPreSaveLink(event.target.value);
                setDirty(true);
              }}
            />
          </section>

          <section className="meta-section">
            <label className="meta-section-label">Distributor Notes</label>
            <Textarea
              className="metadata-textarea"
              disabled={!canEdit}
              value={distributorNotes}
              placeholder="DistroKid / TuneCore details, ISRC codes, release admin notes..."
              onChange={(event) => {
                setDistributorNotes(event.target.value);
                setDirty(true);
              }}
            />
          </section>
        </div>

        <CustomColorPicker
          open={activePaletteIndex !== null}
          anchorRect={paletteAnchorRect}
          anchorElement={
            activePaletteIndex !== null ? swatchRefs.current[activePaletteIndex] : null
          }
          initialColor={
            activePaletteIndex !== null
              ? colorPalette[activePaletteIndex] || "#a89eff"
              : "#a89eff"
          }
          onCancel={() => {
            setActivePaletteIndex(null);
            setPaletteAnchorRect(null);
          }}
          onApply={(nextColor) => {
            if (activePaletteIndex === null) {
              return;
            }
            setColorPalette((prev) =>
              prev.map((entry, entryIndex) =>
                entryIndex === activePaletteIndex ? nextColor : entry,
              ),
            );
            setDirty(true);
            setActivePaletteIndex(null);
            setPaletteAnchorRect(null);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
