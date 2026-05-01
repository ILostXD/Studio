import { apiRequest } from "@/api/client";
import type {
  MoodboardItem,
  ProjectDetails,
  ProjectListResponse,
  ProjectResponse,
  StreamingChecklist,
} from "@/types/project";

export interface CreateProjectInput {
  title: string;
  artist: string;
  description: string;
  status: string;
}

export interface UpdateProjectInput {
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

export async function listProjects(): Promise<ProjectListResponse> {
  return apiRequest<ProjectListResponse>("/api/projects");
}

export async function createProject(
  input: CreateProjectInput,
): Promise<ProjectResponse> {
  return apiRequest<ProjectResponse>("/api/projects", {
    method: "POST",
    body: input,
  });
}

export async function getProject(projectId: string): Promise<ProjectResponse> {
  return apiRequest<ProjectResponse>(
    `/api/projects/${encodeURIComponent(projectId)}`,
  );
}

export async function updateProject(
  projectId: string,
  input: UpdateProjectInput,
): Promise<ProjectResponse> {
  return apiRequest<ProjectResponse>(
    `/api/projects/${encodeURIComponent(projectId)}`,
    {
      method: "PATCH",
      body: input,
    },
  );
}

export async function deleteProject(projectId: string): Promise<void> {
  await apiRequest(`/api/projects/${encodeURIComponent(projectId)}`, {
    method: "DELETE",
  });
}

export function projectSummaryFromDetails(project: ProjectDetails) {
  return {
    id: project.id,
    title: project.title,
    artist: project.artist,
    description: project.description,
    status: project.status,
    coverUrl: project.coverUrl,
    trackCount: Array.isArray(project.tracks) ? project.tracks.length : 0,
    totalRuntimeSeconds: Number(project.totalRuntimeSeconds) || 0,
    shareUrl: project.shareUrl,
    shareLinks: Array.isArray(project.shareLinks) ? project.shareLinks : [],
    completionPercent: project.completionPercent || 0,
    starRating: project.starRating || 0,
    startDate: project.startDate || null,
    releaseDate: project.releaseDate || null,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}
