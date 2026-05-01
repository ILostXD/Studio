import { useRef } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import type { ProjectDetails } from "@/types/project";

interface CoverManagerProps {
  project: ProjectDetails;
  canEdit: boolean;
  onUploadCover: (file: File) => Promise<void>;
  onSelectCover: (coverId: string) => Promise<void>;
  onDeleteCover: (coverId: string) => Promise<void>;
}

export function CoverManager({
  project,
  canEdit,
  onUploadCover,
  onSelectCover,
  onDeleteCover,
}: CoverManagerProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <button
        type="button"
        className="stage-cover w-full max-w-[380px] justify-self-center overflow-hidden rounded-2xl border border-line bg-[radial-gradient(circle_at_18%_20%,rgba(168,158,255,0.35),transparent_42%),linear-gradient(155deg,#101010,#030303)] transition hover:-translate-y-0.5 hover:border-accent disabled:cursor-default disabled:hover:translate-y-0 disabled:hover:border-line"
        disabled={!canEdit}
        onClick={() => {
          if (!canEdit) return;
          inputRef.current?.click();
        }}
      >
        {project.coverUrl ? (
          <img
            src={`${project.coverUrl}${project.activeCoverId ? `?v=${encodeURIComponent(project.activeCoverId)}` : ""}`}
            alt="Project cover"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex min-h-[380px] items-center justify-center px-4 text-sm text-muted">
            Click to upload cover
          </div>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        className="hidden"
        onChange={async (event) => {
          if (!canEdit) return;
          const file = event.target.files?.[0];
          if (!file) return;
          try {
            await onUploadCover(file);
            toast.success("Cover version uploaded");
          } catch (error) {
            toast.error(error instanceof Error ? error.message : "Cover upload failed");
          } finally {
            event.currentTarget.value = "";
          }
        }}
      />

      <div className="cover-switcher-wrap mt-3 w-full max-w-[380px]">
        <p className="cover-switcher-label mb-1.5 text-[11px] uppercase tracking-[0.05em] text-[#7f8798]">
          Cover Versions
        </p>
        <div className="cover-switcher flex gap-[7px] overflow-x-auto px-0.5 pb-1.5 pt-1">
          {project.coverVersions?.length ? (
            project.coverVersions.map((version) => {
              const isActive = version.id === project.activeCoverId;
              return (
                <div key={version.id} className="cover-thumb-wrap group relative shrink-0">
                  <button
                    type="button"
                    className={cn(
                      "cover-switcher-thumb h-[46px] w-[46px] overflow-hidden rounded-[10px] border border-white/15 bg-white/[0.02]",
                      isActive && "border-accent shadow-[0_0_0_1px_rgba(168,158,255,0.35)]",
                    )}
                    onClick={async () => {
                      if (!canEdit) return;
                      try {
                        await onSelectCover(version.id);
                      } catch (error) {
                        toast.error(error instanceof Error ? error.message : "Could not switch cover");
                      }
                    }}
                  >
                    <img src={version.coverUrl} alt="Cover version" className="h-full w-full object-cover" />
                  </button>
                  {canEdit ? (
                    <Button
                      size="icon"
                      variant="danger"
                      className="cover-thumb-delete absolute right-1 top-1 hidden h-4 w-4 rounded-full border-danger/70 bg-black/90 p-0 text-[#ff8a96] group-hover:flex"
                      onClick={async (event) => {
                        event.stopPropagation();
                        try {
                          await onDeleteCover(version.id);
                          toast.success("Cover deleted");
                        } catch (error) {
                          toast.error(error instanceof Error ? error.message : "Could not delete cover");
                        }
                      }}
                    >
                      <Trash2 className="h-2 w-2" />
                    </Button>
                  ) : null}
                </div>
              );
            })
          ) : (
            <p className="text-sm text-muted">No cover versions yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
