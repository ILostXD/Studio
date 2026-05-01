import { apiRequest } from "@/api/client";
import type { ProjectResponse, ShareCreateResponse } from "@/types/project";
import type { ShareAccess } from "@/types/share";

export async function createShareLink(
  projectId: string,
  access: ShareAccess,
): Promise<ShareCreateResponse> {
  return apiRequest<ShareCreateResponse>(
    `/api/projects/${encodeURIComponent(projectId)}/share`,
    {
      method: "POST",
      body: { access },
    },
  );
}

export async function deleteShareLink(
  projectId: string,
  shareId: string,
): Promise<ProjectResponse> {
  return apiRequest<ProjectResponse>(
    `/api/projects/${encodeURIComponent(projectId)}/share/${encodeURIComponent(shareId)}`,
    {
      method: "DELETE",
    },
  );
}
