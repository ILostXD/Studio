import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { ProjectWorkspace } from "@/components/project/project-workspace";
import { SharedProjectView } from "@/components/shared/shared-project-view";
import { useSharedProject } from "@/hooks/use-shared-project";

export function SharedPage() {
  const params = useParams<{ token: string }>();
  const token = params.token || "";
  const sharedQuery = useSharedProject(token);

  if (sharedQuery.isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading shared project...
      </div>
    );
  }

  if (sharedQuery.isError || !sharedQuery.data?.project) {
    return (
      <div className="rounded-xl border border-line bg-surface p-5">
        <h2 className="text-lg font-semibold">Studio</h2>
        <p className="mt-2 text-sm text-muted">
          {sharedQuery.error instanceof Error
            ? sharedQuery.error.message
            : "Share link not found"}
        </p>
      </div>
    );
  }

  const project = sharedQuery.data.project;
  if (project.canEdit) {
    return (
      <ProjectWorkspace
        project={project}
        context={{ type: "share", token, projectId: project.id }}
        showOwnerActions={false}
      />
    );
  }

  return <SharedProjectView token={token} project={project} />;
}
