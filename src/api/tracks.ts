import { apiRequest } from "@/api/client";
import type { ProjectResponse, TodoItem, TrackPlayResponse } from "@/types/project";

export interface UpdateTrackInput {
  title?: string;
  notes?: string;
  lyrics?: string;
  todos?: TodoItem[];
  bpm?: number | null;
  key?: string | null;
  trackStatus?: string | null;
  moodTags?: string[];
  lufs?: number | null;
  peakDb?: number | null;
}

export async function uploadTracks(
  projectId: string,
  files: File[],
): Promise<ProjectResponse> {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("tracks", file);
  });

  return apiRequest<ProjectResponse>(
    `/api/projects/${encodeURIComponent(projectId)}/tracks`,
    {
      method: "POST",
      body: formData,
    },
  );
}

export async function reorderTracks(
  projectId: string,
  trackIds: string[],
): Promise<ProjectResponse> {
  return apiRequest<ProjectResponse>(
    `/api/projects/${encodeURIComponent(projectId)}/tracks/reorder`,
    {
      method: "PATCH",
      body: { trackIds },
    },
  );
}

export async function updateTrack(
  projectId: string,
  trackId: string,
  input: UpdateTrackInput,
): Promise<ProjectResponse> {
  return apiRequest<ProjectResponse>(
    `/api/projects/${encodeURIComponent(projectId)}/tracks/${encodeURIComponent(trackId)}`,
    {
      method: "PATCH",
      body: input,
    },
  );
}

export async function deleteTrack(
  projectId: string,
  trackId: string,
): Promise<ProjectResponse> {
  return apiRequest<ProjectResponse>(
    `/api/projects/${encodeURIComponent(projectId)}/tracks/${encodeURIComponent(trackId)}`,
    {
      method: "DELETE",
    },
  );
}

export async function incrementTrackPlayCount(
  projectId: string,
  trackId: string,
): Promise<TrackPlayResponse> {
  return apiRequest<TrackPlayResponse>(
    `/api/projects/${encodeURIComponent(projectId)}/tracks/${encodeURIComponent(trackId)}/play`,
    {
      method: "POST",
    },
  );
}

export async function uploadTrackVersion(
  projectId: string,
  trackId: string,
  file: File,
): Promise<ProjectResponse> {
  const formData = new FormData();
  formData.append("track", file);

  return apiRequest<ProjectResponse>(
    `/api/projects/${encodeURIComponent(projectId)}/tracks/${encodeURIComponent(trackId)}/versions`,
    {
      method: "POST",
      body: formData,
    },
  );
}

export async function selectTrackVersion(
  projectId: string,
  trackId: string,
  versionId: string,
): Promise<ProjectResponse> {
  return apiRequest<ProjectResponse>(
    `/api/projects/${encodeURIComponent(projectId)}/tracks/${encodeURIComponent(trackId)}/versions/${encodeURIComponent(versionId)}/select`,
    {
      method: "POST",
    },
  );
}

export async function deleteTrackVersion(
  projectId: string,
  trackId: string,
  versionId: string,
): Promise<ProjectResponse> {
  return apiRequest<ProjectResponse>(
    `/api/projects/${encodeURIComponent(projectId)}/tracks/${encodeURIComponent(trackId)}/versions/${encodeURIComponent(versionId)}`,
    {
      method: "DELETE",
    },
  );
}
