import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { shareAccessLabel, formatShortDate } from "@/lib/format";
import { normalizeTodos } from "@/lib/todos";
import { usePlayer } from "@/hooks/use-player";
import type { ProjectDetails } from "@/types/project";
import { projectAlbumMeta, toPlayerTrack } from "@/lib/player-mappers";

interface SharedProjectViewProps {
  token: string;
  project: ProjectDetails;
}

export function SharedProjectView({ token, project }: SharedProjectViewProps) {
  const navigate = useNavigate();
  const player = usePlayer();
  const canListen = Boolean(project.canListen);

  const queue = project.tracks || [];

  return (
    <section>
      <header className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-4xl tracking-[0.04em]">{project.title || "Shared Project"}</h1>
          <p className="text-sm text-muted">
            by {project.artist || "Unknown Artist"} • {shareAccessLabel(project.shareAccess)}
          </p>
        </div>
        <Button onClick={() => navigate("/")}>Open Studio</Button>
      </header>

      <section className="mb-6 grid gap-4 lg:grid-cols-[280px_1fr]">
        <Card className="overflow-hidden border-line bg-surface-2">
          {project.coverUrl ? (
            <img src={project.coverUrl} alt="Project cover" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full min-h-60 items-center justify-center text-sm text-muted">
              No cover
            </div>
          )}
        </Card>
        <Card className="border-line bg-surface p-4">
          <p className="text-sm text-muted">Status: {project.status || "In Progress"}</p>
          <p className="mt-2 whitespace-pre-wrap text-sm text-text/90">
            {project.description || ""}
          </p>
        </Card>
      </section>

      <section className="rounded-xl border border-line bg-surface p-4">
        <h2 className="mb-3 text-xl font-semibold">Tracks</h2>
        {!canListen ? (
          <p className="mb-3 text-sm text-muted">
            This link can view project data but cannot play audio.
          </p>
        ) : null}
        <div className="space-y-2">
          {queue.length ? (
            queue.map((track, index) => {
              const todos = normalizeTodos(track.todos);
              const openTodos = todos.filter((todo) => !todo.done).length;
              return (
                <article
                  key={track.id}
                  className="grid grid-cols-[40px_auto_1fr] gap-3 rounded-lg border border-line bg-surface-2 p-3"
                >
                  <div className="text-center text-sm text-muted">{index + 1}</div>
                  <Button
                    size="icon"
                    disabled={!canListen}
                    onClick={() => {
                      if (!canListen || !track.audioUrl) return;
                      player.playTrack({
                        track: toPlayerTrack(track),
                        queue: queue.map(toPlayerTrack),
                        index,
                        album: projectAlbumMeta(project),
                        sourceContext: { type: "share", token },
                      });
                    }}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {track.title || "Untitled track"}
                    </p>
                    <p className="truncate text-xs text-muted">
                      #{track.trackNumber ?? "-"} • {formatShortDate(track.createdAt) || "No date"} •{" "}
                      {track.originalName || ""}
                    </p>
                    <div className="mt-2 grid gap-2 text-xs text-muted md:grid-cols-3">
                      <p className="truncate">Notes: {track.notes || "-"}</p>
                      <p className="truncate">Lyrics: {track.lyrics || "-"}</p>
                      <p className="truncate">
                        Todos: {todos.length ? `${openTodos} open / ${todos.length} total` : "-"}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="rounded-lg border border-dashed border-line p-6 text-sm text-muted">
              No tracks available.
            </div>
          )}
        </div>
      </section>
    </section>
  );
}
