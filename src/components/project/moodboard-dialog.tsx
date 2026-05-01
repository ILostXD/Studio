import { FormEvent, useMemo, useState } from "react";
import { ExternalLink, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { parseMoodboardEmbed, normalizeUrl, buildMoodboardItem } from "@/lib/moodboard";
import type { MoodboardItem, ProjectDetails } from "@/types/project";
import type { UpdateProjectInput } from "@/api/projects";

interface MoodboardDialogProps {
  open: boolean;
  project: ProjectDetails;
  canEdit: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (input: UpdateProjectInput) => Promise<void>;
}

export function MoodboardDialog({
  open,
  project,
  canEdit,
  onOpenChange,
  onSave,
}: MoodboardDialogProps) {
  const [referenceArtist, setReferenceArtist] = useState("");
  const [referenceTitle, setReferenceTitle] = useState("");
  const [referenceUrl, setReferenceUrl] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");

  const items = useMemo(() => project.moodboardItems || [], [project.moodboardItems]);
  const references = items.filter((item) => item.type === "reference");
  const embeds = items.filter((item) => item.type === "embed");

  const persistItems = async (nextItems: MoodboardItem[], message: string) => {
    await onSave({ moodboardItems: nextItems });
    toast.success(message);
  };

  const addReference = async (event: FormEvent) => {
    event.preventDefault();
    if (!canEdit) return;

    const artist = referenceArtist.trim();
    const title = referenceTitle.trim();
    const rawUrl = referenceUrl.trim();
    const url = rawUrl ? normalizeUrl(rawUrl) : "";
    if (!artist || !title) {
      toast.error("Artist and track title are required");
      return;
    }
    if (rawUrl && !url) {
      toast.error("Enter a valid URL");
      return;
    }

    try {
      await persistItems(
        [buildMoodboardItem("reference", { artist, title, url }), ...items],
        "Reference track added",
      );
      setReferenceArtist("");
      setReferenceTitle("");
      setReferenceUrl("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not add reference");
    }
  };

  const addEmbed = async (event: FormEvent) => {
    event.preventDefault();
    if (!canEdit) return;

    const url = normalizeUrl(embedUrl);
    const embed = parseMoodboardEmbed(url);
    if (!embed) {
      toast.error("Use a YouTube or SoundCloud URL");
      return;
    }

    try {
      await persistItems(
        [
          buildMoodboardItem("embed", {
            url,
            provider: embed.provider,
          }),
          ...items,
        ],
        "Inspiration added",
      );
      setEmbedUrl("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not add inspiration");
    }
  };

  const removeItem = async (itemId: string) => {
    if (!canEdit) return;
    try {
      await persistItems(
        items.filter((item) => item.id !== itemId),
        "Moodboard item deleted",
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete item");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="panel-sheet-moodboard w-[95vw] max-w-[1080px]">
        <DialogHeader>
          <DialogTitle>Moodboard</DialogTitle>
        </DialogHeader>

        <div className="moodboard-panel-body max-h-[75vh] overflow-y-auto pr-3">
          <div className="moodboard-panel-content">
            <section className="moodboard-palette">
              {project.colorPalette?.length ? (
                project.colorPalette.map((color, index) => (
                  <span
                    key={`${color}-${index}`}
                    className="moodboard-palette-swatch"
                    style={{ backgroundColor: color }}
                    data-color={color}
                  >
                    <span className="sr-only">{color}</span>
                  </span>
                ))
              ) : (
                <p className="moodboard-empty">No palette yet.</p>
              )}
            </section>

            <section className="moodboard-layout">
              <div className="moodboard-column">
                <div className="moodboard-section-head">
                  <h2>Reference Tracks</h2>
                </div>
                <form className="moodboard-form" onSubmit={addReference}>
                <Input
                  placeholder="Artist"
                  maxLength={140}
                  disabled={!canEdit}
                  value={referenceArtist}
                  onChange={(event) => setReferenceArtist(event.target.value)}
                />
                <Input
                  placeholder="Track title"
                  maxLength={180}
                  disabled={!canEdit}
                  value={referenceTitle}
                  onChange={(event) => setReferenceTitle(event.target.value)}
                />
                <Input
                  placeholder="https://..."
                  type="url"
                  maxLength={600}
                  disabled={!canEdit}
                  value={referenceUrl}
                  onChange={(event) => setReferenceUrl(event.target.value)}
                />
                  <Button
                    disabled={!canEdit}
                    className="moodboard-add-button h-10 w-full hover:translate-y-0"
                  >
                    + Add
                  </Button>
                </form>
                <div className="reference-list">
                  {references.length ? (
                    references.map((item) => (
                      <article
                        key={item.id}
                        className="reference-row"
                      >
                        <div className="reference-main">
                          <p className="reference-title">{item.title || "Untitled reference"}</p>
                          <p className="reference-artist">{item.artist || "Unknown artist"}</p>
                        </div>
                        <div className="reference-actions">
                          {item.url ? (
                            <Button
                              size="icon"
                              asChild
                              className="reference-open-button hover:translate-y-0"
                            >
                              <a href={item.url} target="_blank" rel="noreferrer">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          ) : null}
                          <Button
                            size="icon"
                            variant="danger"
                            className="moodboard-delete-button hover:translate-y-0"
                            disabled={!canEdit}
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </article>
                    ))
                  ) : (
                    <p className="moodboard-empty">No reference tracks yet.</p>
                  )}
                </div>
              </div>

              <div className="moodboard-column">
                <div className="moodboard-section-head">
                  <h2>Inspiration Board</h2>
                </div>
                <form className="moodboard-form moodboard-form-inline" onSubmit={addEmbed}>
                  <Input
                    type="url"
                    placeholder="YouTube or SoundCloud URL"
                    maxLength={600}
                    disabled={!canEdit}
                    value={embedUrl}
                    onChange={(event) => setEmbedUrl(event.target.value)}
                  />
                  <Button
                    disabled={!canEdit}
                    className="moodboard-add-button h-10 px-4 hover:translate-y-0"
                  >
                    + Add
                  </Button>
                </form>
                <div className="embed-grid">
                  {embeds.length ? (
                    embeds.map((item) => {
                      const embed = parseMoodboardEmbed(item.url);
                      if (!embed) {
                        return (
                          <article
                            key={item.id}
                            className="embed-card embed-card-invalid"
                          >
                            <p className="embed-invalid-copy">Unsupported URL</p>
                            <Button
                              size="icon"
                              variant="danger"
                              className="moodboard-delete-button hover:translate-y-0"
                              disabled={!canEdit}
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </article>
                        );
                      }
                      return (
                        <article
                          key={item.id}
                          className="embed-card"
                          data-provider={embed.provider}
                        >
                          <iframe
                            src={embed.embedUrl}
                            title={`${embed.provider} inspiration`}
                            loading="lazy"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            allowFullScreen
                          />
                          <div className="embed-card-actions">
                            <Button size="icon" asChild className="icon-button hover:translate-y-0">
                              <a href={item.url} target="_blank" rel="noreferrer">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                            <Button
                              size="icon"
                              variant="danger"
                              className="moodboard-delete-button hover:translate-y-0"
                              disabled={!canEdit}
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </article>
                      );
                    })
                  ) : (
                    <p className="moodboard-empty">No inspiration links yet.</p>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
