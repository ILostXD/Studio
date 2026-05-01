import { apiRequest } from "@/api/client";
import type { ProjectResponse } from "@/types/project";

export async function uploadCover(
  projectId: string,
  file: File,
): Promise<ProjectResponse> {
  const formData = new FormData();
  formData.append("cover", file);

  return apiRequest<ProjectResponse>(
    `/api/projects/${encodeURIComponent(projectId)}/cover`,
    {
      method: "POST",
      body: formData,
    },
  );
}

export async function selectCoverVersion(
  projectId: string,
  coverId: string,
): Promise<ProjectResponse> {
  return apiRequest<ProjectResponse>(
    `/api/projects/${encodeURIComponent(projectId)}/covers/${encodeURIComponent(coverId)}/select`,
    {
      method: "POST",
    },
  );
}

export async function deleteCoverVersion(
  projectId: string,
  coverId: string,
): Promise<ProjectResponse> {
  return apiRequest<ProjectResponse>(
    `/api/projects/${encodeURIComponent(projectId)}/covers/${encodeURIComponent(coverId)}`,
    {
      method: "DELETE",
    },
  );
}
