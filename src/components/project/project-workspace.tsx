import { useMemo, useRef, useState } from "react";
import { ArrowLeft, LogOut, Settings, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CoverManager } from "@/components/project/cover-manager";
import { MetadataDialog } from "@/components/project/metadata-dialog";
import { MoodboardDialog } from "@/components/project/moodboard-dialog";
import { ProjectHeader } from "@/components/project/project-header";
import { ProjectNotesDialog } from "@/components/project/project-notes-dialog";
import { ProjectTools } from "@/components/project/project-tools";
import { ShareDialog } from "@/components/project/share-dialog";
import { TrackList } from "@/components/project/track-list";
import { TrackMenuSheet } from "@/components/project/track-menu-sheet";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/components/layout/confirm-provider";
import { useUiSettingsStore } from "@/components/layout/ui-settings-provider";
import { usePlayer } from "@/hooks/use-player";
import { useDeleteProject } from "@/hooks/use-project";
import {
  type ProjectRouteContext,
  useProjectActions,
} from "@/hooks/use-project-actions";
import { projectAlbumMeta, toPlayerTrack } from "@/lib/player-mappers";
import type { ProjectDetails, Track } from "@/types/project";
import { useLogout } from "@/hooks/use-session";

interface ProjectWorkspaceProps {
  project: ProjectDetails;
  context: ProjectRouteContext;
  showOwnerActions: boolean;
}

export function ProjectWorkspace({
  project,
  context,
  showOwnerActions,
}: ProjectWorkspaceProps) {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const { trackTagVisibility } = useUiSettingsStore();
  const player = usePlayer();
  const logoutMutation = useLogout();
  const deleteProjectMutation = useDeleteProject(project.id);
  const actions = useProjectActions(context);

  const trackInputRef = useRef<HTMLInputElement | null>(null);
  const [activeTrackMenuId, setActiveTrackMenuId] = useState<string | null>(null);
  const [notesOpen, setNotesOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [metadataOpen, setMetadataOpen] = useState(false);
  const [moodboardOpen, setMoodboardOpen] = useState(false);

  const canEdit = context.type === "owner" ? true : Boolean(project.canEdit);
  const canListen = context.type === "owner" ? true : Boolean(project.canListen);

  const queue = useMemo(() => project.tracks.map(toPlayerTrack), [project.tracks]);
  const activeTrack = useMemo(
    () => project.tracks.find((track) => track.id === activeTrackMenuId) || null,
    [activeTrackMenuId, project.tracks],
  );

  const playTrackById = (trackId: string) => {
    const index = project.tracks.findIndex((track) => track.id === trackId);
    if (index < 0) return;
    const selectedTrack = queue[index];
    if (!selectedTrack?.audioUrl) {
      toast.error("This link cannot play audio");
      return;
    }

    player.playTrack({
      track: selectedTrack,
      queue,
      index,
      album: projectAlbumMeta(project),
      sourceContext:
        context.type === "owner"
          ? { type: "project", projectId: context.projectId }
          : { type: "share", token: context.token },
      onTrackStart: (id) => {
        actions.incrementPlayMutation.mutate(id);
      },
    });
  };

  const playAll = () => {
    if (!canListen) {
      toast.error("This share link cannot play audio");
      return;
    }
    if (!project.tracks.length) {
      toast.error("No tracks available");
      return;
    }

    const firstTrack = queue[0];
    player.playTrack({
      track: firstTrack,
      queue,
      index: 0,
      album: projectAlbumMeta(project),
      sourceContext:
        context.type === "owner"
          ? { type: "project", projectId: context.projectId }
          : { type: "share", token: context.token },
      onTrackStart: (id) => {
        actions.incrementPlayMutation.mutate(id);
      },
    });
  };

  const shufflePlay = () => {
    if (!canListen) {
      toast.error("This share link cannot play audio");
      return;
    }
    if (!project.tracks.length) {
      toast.error("No tracks available");
      return;
    }
    const randomIndex = Math.floor(Math.random() * queue.length);
    player.playTrack({
      track: queue[randomIndex],
      queue,
      index: randomIndex,
      album: projectAlbumMeta(project),
      sourceContext:
        context.type === "owner"
          ? { type: "project", projectId: context.projectId }
          : { type: "share", token: context.token },
      onTrackStart: (id) => {
        actions.incrementPlayMutation.mutate(id);
      },
    });
    toast.success("Shuffle queue ready");
  };

  const saveTrackTitle = async (trackId: string, title: string) => {
    if (!canEdit) return;
    try {
      await actions.updateTrackMutation.mutateAsync({
        trackId,
        input: {
          title: title || "Untitled track",
        },
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save changes");
    }
  };

  const selectedTrack =
    project.tracks.find((track) => track.id === activeTrackMenuId) || null;

  return (
    <section className="mx-auto flex min-h-0 w-full max-w-[1120px] flex-1 flex-col">
      <header className="mb-11 flex items-center justify-between px-[22px] mx-[calc(-1*clamp(52px,11vw,168px)+22px)]">
        <Button
          size="icon"
          onClick={() => navigate("/")}
          aria-label="Back to library"
          className="h-9 w-9 rounded-full border-white/10 bg-[rgba(20,20,20,0.84)] text-[#e6e6e6] hover:bg-accent/15 [&>svg]:-translate-x-px"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        {showOwnerActions ? (
          <div className="flex items-center gap-2.5">
            <Button
              size="icon"
              onClick={() => navigate("/settings")}
              aria-label="Settings"
              className="h-9 w-9 rounded-full border-white/10 bg-[rgba(20,20,20,0.84)] text-[#e6e6e6] hover:bg-accent/15"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="danger"
              onClick={async () => {
                const ok = await confirm(
                  `Delete "${project.title || "this project"}" and all its tracks/covers?`,
                  "Delete Project",
                );
                if (!ok) return;
                try {
                  await deleteProjectMutation.mutateAsync();
                  if (
                    player.sourceContext?.type === "project" &&
                    player.sourceContext.projectId === project.id
                  ) {
                    player.stop();
                  }
                  toast.success("Project deleted");
                  navigate("/");
                } catch (error) {
                  toast.error(error instanceof Error ? error.message : "Could not delete project");
                }
              }}
              aria-label="Delete project"
              className="h-9 w-9 rounded-full border-danger/40 bg-[rgba(20,20,20,0.84)] text-danger hover:bg-danger/15"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              onClick={async () => {
                try {
                  await logoutMutation.mutateAsync();
                  navigate("/login");
                } catch (error) {
                  toast.error(error instanceof Error ? error.message : "Could not log out");
                }
              }}
              aria-label="Log out"
              className="h-9 w-9 rounded-full border-white/10 bg-[rgba(20,20,20,0.84)] text-[#e6e6e6] hover:bg-accent/15"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : null}
      </header>

      <section className="grid min-h-0 flex-1 grid-cols-[minmax(240px,400px)_minmax(320px,1fr)] items-start gap-[clamp(22px,4vw,48px)] overflow-visible max-[980px]:grid-cols-1">
        <div className="cover-stack flex min-h-0 flex-col items-center gap-2.5 max-[980px]:items-start">
          <CoverManager
            project={project}
            canEdit={canEdit}
            onUploadCover={async (file) => {
              await actions.uploadCoverMutation.mutateAsync(file);
            }}
            onSelectCover={async (coverId) => {
              await actions.selectCoverMutation.mutateAsync(coverId);
            }}
            onDeleteCover={async (coverId) => {
              await actions.deleteCoverMutation.mutateAsync(coverId);
            }}
          />
        </div>
        <div className="project-column flex min-h-0 max-h-full flex-col gap-[18px] overflow-y-auto pb-[170px] pr-1 max-[980px]:overflow-visible max-[980px]:pr-0">
          <ProjectHeader
            project={project}
            canEdit={canEdit}
            canListen={canListen}
            onSaveTitle={async (title) => {
              if (!canEdit) return;
              try {
                await actions.updateProjectMutation.mutateAsync({
                  title: title || "Untitled Project",
                });
              } catch (error) {
                toast.error(error instanceof Error ? error.message : "Failed to save project");
              }
            }}
            onSaveArtist={async (artist) => {
              if (!canEdit) return;
              try {
                await actions.updateProjectMutation.mutateAsync({
                  artist: artist || "Unknown Artist",
                });
              } catch (error) {
                toast.error(error instanceof Error ? error.message : "Failed to save artist");
              }
            }}
            onPlayAll={playAll}
            onShufflePlay={shufflePlay}
          />

          <ProjectTools
            canEdit={canEdit}
            showOwnerActions={showOwnerActions}
            status={project.status || "In Progress"}
            onStatusChange={async (status) => {
              if (!canEdit) return;
              try {
                await actions.updateProjectMutation.mutateAsync({ status });
              } catch (error) {
                toast.error(error instanceof Error ? error.message : "Failed to save status");
              }
            }}
            onUploadTracks={() => {
              trackInputRef.current?.click();
            }}
            onOpenNotes={() => setNotesOpen(true)}
            onOpenShare={() => setShareOpen(true)}
            onOpenMetadata={() => setMetadataOpen(true)}
            onOpenMoodboard={() => setMoodboardOpen(true)}
          />

          <input
            ref={trackInputRef}
            type="file"
            accept=".wav,.mp3,.flac"
            multiple
            className="hidden"
            onChange={async (event) => {
              if (!canEdit || context.type !== "owner") return;
              const files = Array.from(event.target.files || []);
              if (!files.length) return;
              try {
                await actions.uploadTracksMutation.mutateAsync(files);
                toast.success("Tracks uploaded");
              } catch (error) {
                toast.error(error instanceof Error ? error.message : "Track upload failed");
              } finally {
                event.currentTarget.value = "";
              }
            }}
          />

          <section className="space-y-2">
            <h2 className="text-xs uppercase tracking-[0.06em] text-[#7c7c7c]">Tracklist</h2>
            <TrackList
              tracks={project.tracks}
              canEdit={canEdit}
              canListen={canListen}
              activeTrackId={player.track?.id || null}
              isPlaying={player.isPlaying}
              visibility={trackTagVisibility}
              onPlay={playTrackById}
              onRowPlay={playTrackById}
              onOpenMenu={(trackId) => setActiveTrackMenuId(trackId)}
              onTitleSave={saveTrackTitle}
              onReorder={async (trackIds) => {
                if (!canEdit || context.type !== "owner") return;
                try {
                  await actions.reorderTracksMutation.mutateAsync(trackIds);
                } catch (error) {
                  toast.error(error instanceof Error ? error.message : "Failed to reorder tracks");
                }
              }}
            />
          </section>
        </div>
      </section>

      <TrackMenuSheet
        open={Boolean(activeTrackMenuId)}
        track={selectedTrack}
        canEdit={canEdit}
        canListen={canListen}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            setActiveTrackMenuId(null);
          }
        }}
        onSaveTrack={async (trackId, input) => {
          await actions.updateTrackMutation.mutateAsync({ trackId, input });
        }}
        onDeleteTrack={async (trackId) => {
          const ok = await confirm("Delete this track from the project?", "Delete Track");
          if (!ok) return;
          await actions.deleteTrackMutation.mutateAsync(trackId);
          setActiveTrackMenuId(null);
          toast.success("Track deleted");
        }}
        onPlayTrack={playTrackById}
        onUploadVersion={async (trackId, file) => {
          await actions.uploadTrackVersionMutation.mutateAsync({ trackId, file });
        }}
        onSelectVersion={async (trackId, versionId) => {
          await actions.selectTrackVersionMutation.mutateAsync({ trackId, versionId });
          const updatedTrack =
            project.tracks.find((entry) => entry.id === trackId) || (activeTrack as Track | null);
          if (player.track?.id === trackId && updatedTrack) {
            playTrackById(trackId);
          }
        }}
        onDeleteVersion={async (trackId, versionId) => {
          const ok = await confirm("Delete this track version?", "Delete Version");
          if (!ok) return;
          await actions.deleteTrackVersionMutation.mutateAsync({ trackId, versionId });
          const updatedTrack =
            project.tracks.find((entry) => entry.id === trackId) || (activeTrack as Track | null);
          if (player.track?.id === trackId && updatedTrack) {
            playTrackById(trackId);
          }
        }}
      />

      <ProjectNotesDialog
        open={notesOpen}
        notes={project.description || ""}
        canEdit={canEdit}
        onOpenChange={setNotesOpen}
        onSave={async (description) => {
          await actions.updateProjectMutation.mutateAsync({ description });
        }}
      />

      {showOwnerActions ? (
        <ShareDialog
          open={shareOpen}
          project={project}
          onOpenChange={setShareOpen}
          onCreateShare={async (access) => {
            const payload = await actions.createShareMutation.mutateAsync(access);
            return payload.shareLink?.shareUrl || null;
          }}
          onDeleteShare={async (shareId) => {
            await actions.deleteShareMutation.mutateAsync(shareId);
          }}
        />
      ) : null}

      <MetadataDialog
        open={metadataOpen}
        canEdit={canEdit}
        project={project}
        onOpenChange={setMetadataOpen}
        onSave={async (input) => {
          await actions.updateProjectMutation.mutateAsync(input);
        }}
      />

      {showOwnerActions ? (
        <MoodboardDialog
          open={moodboardOpen}
          project={project}
          canEdit={canEdit}
          onOpenChange={setMoodboardOpen}
          onSave={async (input) => {
            await actions.updateProjectMutation.mutateAsync(input);
          }}
        />
      ) : null}

      {!showOwnerActions ? (
        <div className="mt-4">
          <Button variant="ghost" onClick={() => navigate("/")}>
            Open Studio
          </Button>
        </div>
      ) : null}
    </section>
  );
}
