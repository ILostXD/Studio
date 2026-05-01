import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { ProjectWorkspace } from "@/components/project/project-workspace";
import { useProject } from "@/hooks/use-project";

export function ProjectPage() {
  const params = useParams<{ projectId: string }>();
  const projectId = params.projectId || "";
  const projectQuery = useProject(projectId);

  if (projectQuery.isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading project...
      </div>
    );
  }

  if (projectQuery.isError || !projectQuery.data?.project) {
    return (
      <div className="rounded-xl border border-line bg-surface p-5">
        <h2 className="text-lg font-semibold">Studio</h2>
        <p className="mt-2 text-sm text-muted">
          {projectQuery.error instanceof Error
            ? projectQuery.error.message
            : "Project not found"}
        </p>
      </div>
    );
  }

  return (
    <ProjectWorkspace
      project={projectQuery.data.project}
      context={{ type: "owner", projectId }}
      showOwnerActions
    />
  );
}
