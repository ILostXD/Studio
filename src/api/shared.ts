import { apiRequest } from "@/api/client";
import type {
  MoodboardItem,
  ProjectResponse,
  StreamingChecklist,
  TodoItem,
  TrackPlayResponse,
} from "@/types/project";

export interface SharedUpdateProjectInput {
  title?: string;
  artist?: string;
  description?: string;
  status?: string;
  releaseDate?: string | null;
  startDate?: string | null;
  completionPercent?: number;
  starRating?: number;
  colorPalette?: string[];
  streamingChecklist?: StreamingChecklist;
  preSaveLink?: string;
  distributorNotes?: string;
  moodboardItems?: MoodboardItem[];
}

export interface SharedUpdateTrackInput {
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

export async function getSharedProject(token: string): Promise<ProjectResponse> {
  return apiRequest<ProjectResponse>(`/api/share/${encodeURIComponent(token)}`, {
    allowUnauthorized: true,
  });
}

export async function updateSharedProject(
  token: string,
  input: SharedUpdateProjectInput,
): Promise<ProjectResponse> {
  return apiRequest<ProjectResponse>(`/api/share/${encodeURIComponent(token)}/project`, {
    method: "PATCH",
    body: input,
  });
}

export async function updateSharedTrack(
  token: string,
  trackId: string,
  input: SharedUpdateTrackInput,
): Promise<ProjectResponse> {
  return apiRequest<ProjectResponse>(
    `/api/share/${encodeURIComponent(token)}/tracks/${encodeURIComponent(trackId)}`,
    {
      method: "PATCH",
      body: input,
    },
  );
}

export async function incrementSharedTrackPlayCount(
  token: string,
  trackId: string,
): Promise<TrackPlayResponse> {
  return apiRequest<TrackPlayResponse>(
    `/api/share/${encodeURIComponent(token)}/tracks/${encodeURIComponent(trackId)}/play`,
    {
      method: "POST",
    },
  );
}

export async function deleteSharedTrack(
  token: string,
  trackId: string,
): Promise<ProjectResponse> {
  return apiRequest<ProjectResponse>(
    `/api/share/${encodeURIComponent(token)}/tracks/${encodeURIComponent(trackId)}`,
    {
      method: "DELETE",
    },
  );
}

export async function uploadSharedCover(
  token: string,
  file: File,
): Promise<ProjectResponse> {
  const formData = new FormData();
  formData.append("cover", file);

  return apiRequest<ProjectResponse>(`/api/share/${encodeURIComponent(token)}/cover`, {
    method: "POST",
    body: formData,
  });
}

export async function selectSharedCoverVersion(
  token: string,
  coverId: string,
): Promise<ProjectResponse> {
  return apiRequest<ProjectResponse>(
    `/api/share/${encodeURIComponent(token)}/covers/${encodeURIComponent(coverId)}/select`,
    {
      method: "POST",
    },
  );
}

export async function uploadSharedTrackVersion(
  token: string,
  trackId: string,
  file: File,
): Promise<ProjectResponse> {
  const formData = new FormData();
  formData.append("track", file);

  return apiRequest<ProjectResponse>(
    `/api/share/${encodeURIComponent(token)}/tracks/${encodeURIComponent(trackId)}/versions`,
    {
      method: "POST",
      body: formData,
    },
  );
}

export async function selectSharedTrackVersion(
  token: string,
  trackId: string,
  versionId: string,
): Promise<ProjectResponse> {
  return apiRequest<ProjectResponse>(
    `/api/share/${encodeURIComponent(token)}/tracks/${encodeURIComponent(trackId)}/versions/${encodeURIComponent(versionId)}/select`,
    {
      method: "POST",
    },
  );
}

export async function deleteSharedTrackVersion(
  token: string,
  trackId: string,
  versionId: string,
): Promise<ProjectResponse> {
  return apiRequest<ProjectResponse>(
    `/api/share/${encodeURIComponent(token)}/tracks/${encodeURIComponent(trackId)}/versions/${encodeURIComponent(versionId)}`,
    {
      method: "DELETE",
    },
  );
}
