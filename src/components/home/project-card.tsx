import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatRuntime } from "@/lib/format";
import type { ProjectSummary } from "@/types/project";

interface ProjectCardProps {
  project: ProjectSummary;
  onOpen: (projectId: string) => void;
}

function Stars({ rating }: { rating: number }) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="card-rating">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={`card-star ${index < filled ? "filled" : ""}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const trackLabel =
    project.trackCount === 1 ? "1 track" : `${project.trackCount || 0} tracks`;
  const completionPercent = Math.max(
    0,
    Math.min(100, Math.round(project.completionPercent || 0)),
  );

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => onOpen(project.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(project.id);
        }
      }}
      className="project-card group block h-fit self-start overflow-hidden rounded-[18px] border-line bg-[#040404] transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-[3px] hover:border-accent hover:shadow-[0_14px_30px_rgba(0,0,0,0.55)]"
    >
      <div className="relative aspect-square w-full overflow-hidden border-b border-line bg-[radial-gradient(circle_at_22%_20%,rgba(168,158,255,0.36),transparent_40%),linear-gradient(150deg,#101010,#020202)]">
        {project.coverUrl ? (
          <img
            src={project.coverUrl}
            alt={`${project.title} cover`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : null}
        <Badge className="absolute bottom-2.5 right-2.5 rounded-full border-accent/50 bg-black/70 px-2 py-1 text-[12px] text-accent" variant="muted">
          {project.status || "In Progress"}
        </Badge>
      </div>
      <div className="space-y-1 p-3">
        <h3 className="truncate text-[17px] font-semibold leading-tight">{project.title || "Untitled Project"}</h3>
        <p className="truncate text-base leading-none text-[#c7c7c7]">{project.artist || "Unknown Artist"}</p>
        <p className="font-mono text-[13px] text-muted">
          {trackLabel} • {formatRuntime(project.totalRuntimeSeconds || 0)}
        </p>
        {project.starRating > 0 ? <Stars rating={project.starRating} /> : null}
      </div>
      <div className="card-progress-wrap" aria-hidden>
        <div
          className="card-progress-bar"
          style={{ width: `${completionPercent}%` }}
        />
      </div>
    </Card>
  );
}
