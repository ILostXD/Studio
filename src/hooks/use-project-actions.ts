import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCoverVersion, selectCoverVersion, uploadCover } from "@/api/covers";
import { type UpdateProjectInput, updateProject } from "@/api/projects";
import {
  deleteShareLink,
  createShareLink,
} from "@/api/shares";
import {
  deleteSharedTrack,
  incrementSharedTrackPlayCount,
  selectSharedCoverVersion,
  selectSharedTrackVersion,
  type SharedUpdateProjectInput,
  type SharedUpdateTrackInput,
  updateSharedProject,
  updateSharedTrack,
  uploadSharedCover,
  uploadSharedTrackVersion,
  deleteSharedTrackVersion,
} from "@/api/shared";
import {
  deleteTrack,
  deleteTrackVersion,
  incrementTrackPlayCount,
  reorderTracks,
  selectTrackVersion,
  type UpdateTrackInput,
  updateTrack,
  uploadTrackVersion,
  uploadTracks,
} from "@/api/tracks";
import { queryKeys } from "@/lib/query-keys";
import type { ProjectResponse } from "@/types/project";
import type { ShareAccess } from "@/types/share";

export type ProjectRouteContext =
  | { type: "owner"; projectId: string }
  | { type: "share"; token: string; projectId: string };

function useProjectPayloadSync(context: ProjectRouteContext) {
  const queryClient = useQueryClient();

  return async (payload: ProjectResponse) => {
    if (context.type === "owner") {
      queryClient.setQueryData(queryKeys.project(context.projectId), payload);
    } else {
      queryClient.setQueryData(queryKeys.sharedProject(context.token), payload);
    }
    await queryClient.invalidateQueries({ queryKey: queryKeys.projects });
  };
}

export function useProjectActions(context: ProjectRouteContext) {
  const syncPayload = useProjectPayloadSync(context);

  const updateProjectMutation = useMutation({
    mutationFn: async (input: UpdateProjectInput | SharedUpdateProjectInput) => {
      if (context.type === "owner") {
        return updateProject(context.projectId, input as UpdateProjectInput);
      }
      return updateSharedProject(context.token, input as SharedUpdateProjectInput);
    },
    onSuccess: syncPayload,
  });

  const updateTrackMutation = useMutation({
    mutationFn: async ({
      trackId,
      input,
    }: {
      trackId: string;
      input: UpdateTrackInput | SharedUpdateTrackInput;
    }) => {
      if (context.type === "owner") {
        return updateTrack(context.projectId, trackId, input as UpdateTrackInput);
      }
      return updateSharedTrack(context.token, trackId, input as SharedUpdateTrackInput);
    },
    onSuccess: syncPayload,
  });

  const deleteTrackMutation = useMutation({
    mutationFn: async (trackId: string) => {
      if (context.type === "owner") {
        return deleteTrack(context.projectId, trackId);
      }
      return deleteSharedTrack(context.token, trackId);
    },
    onSuccess: syncPayload,
  });

  const reorderTracksMutation = useMutation({
    mutationFn: async (trackIds: string[]) => reorderTracks(context.projectId, trackIds),
    onSuccess: syncPayload,
  });

  const uploadTracksMutation = useMutation({
    mutationFn: async (files: File[]) => uploadTracks(context.projectId, files),
    onSuccess: syncPayload,
  });

  const uploadCoverMutation = useMutation({
    mutationFn: async (file: File) => {
      if (context.type === "owner") {
        return uploadCover(context.projectId, file);
      }
      return uploadSharedCover(context.token, file);
    },
    onSuccess: syncPayload,
  });

  const selectCoverMutation = useMutation({
    mutationFn: async (coverId: string) => {
      if (context.type === "owner") {
        return selectCoverVersion(context.projectId, coverId);
      }
      return selectSharedCoverVersion(context.token, coverId);
    },
    onSuccess: syncPayload,
  });

  const deleteCoverMutation = useMutation({
    mutationFn: async (coverId: string) => deleteCoverVersion(context.projectId, coverId),
    onSuccess: syncPayload,
  });

  const uploadTrackVersionMutation = useMutation({
    mutationFn: async ({ trackId, file }: { trackId: string; file: File }) => {
      if (context.type === "owner") {
        return uploadTrackVersion(context.projectId, trackId, file);
      }
      return uploadSharedTrackVersion(context.token, trackId, file);
    },
    onSuccess: syncPayload,
  });

  const selectTrackVersionMutation = useMutation({
    mutationFn: async ({
      trackId,
      versionId,
    }: {
      trackId: string;
      versionId: string;
    }) => {
      if (context.type === "owner") {
        return selectTrackVersion(context.projectId, trackId, versionId);
      }
      return selectSharedTrackVersion(context.token, trackId, versionId);
    },
    onSuccess: syncPayload,
  });

  const deleteTrackVersionMutation = useMutation({
    mutationFn: async ({
      trackId,
      versionId,
    }: {
      trackId: string;
      versionId: string;
    }) => {
      if (context.type === "owner") {
        return deleteTrackVersion(context.projectId, trackId, versionId);
      }
      return deleteSharedTrackVersion(context.token, trackId, versionId);
    },
    onSuccess: syncPayload,
  });

  const incrementPlayMutation = useMutation({
    mutationFn: async (trackId: string) => {
      if (context.type === "owner") {
        return incrementTrackPlayCount(context.projectId, trackId);
      }
      return incrementSharedTrackPlayCount(context.token, trackId);
    },
  });

  const createShareMutation = useMutation({
    mutationFn: async (access: ShareAccess) => createShareLink(context.projectId, access),
    onSuccess: syncPayload,
  });

  const deleteShareMutation = useMutation({
    mutationFn: async (shareId: string) => deleteShareLink(context.projectId, shareId),
    onSuccess: syncPayload,
  });

  return {
    updateProjectMutation,
    updateTrackMutation,
    deleteTrackMutation,
    reorderTracksMutation,
    uploadTracksMutation,
    uploadCoverMutation,
    selectCoverMutation,
    deleteCoverMutation,
    uploadTrackVersionMutation,
    selectTrackVersionMutation,
    deleteTrackVersionMutation,
    incrementPlayMutation,
    createShareMutation,
    deleteShareMutation,
  };
}
