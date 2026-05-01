import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { HomeToolbar } from "@/components/home/home-toolbar";
import { ProjectCard } from "@/components/home/project-card";
import { useCreateProject, useProjects } from "@/hooks/use-projects";
import { useLogout } from "@/hooks/use-session";
import {
  sortProjects,
  type HomeSort,
  type HomeSortDirection,
  type HomeSortKey,
} from "@/lib/project-sorting";

export function HomePage() {
  const navigate = useNavigate();
  const projectsQuery = useProjects();
  const createProjectMutation = useCreateProject();
  const logoutMutation = useLogout();

  const [sort, setSort] = useState<HomeSort>({
    key: "updatedAt",
    dir: "desc",
  });

  const sortedProjects = useMemo(() => {
    const projects = projectsQuery.data?.projects || [];
    return sortProjects(projects, sort);
  }, [projectsQuery.data?.projects, sort]);

  const onCreateProject = async () => {
    try {
      const payload = await createProjectMutation.mutateAsync({
        title: "Untitled Project",
        artist: "Unknown Artist",
        description: "",
        status: "In Progress",
      });
      navigate(`/project/${encodeURIComponent(payload.project.id)}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create project");
    }
  };

  const onLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      navigate("/login");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not log out");
    }
  };

  const onSortChange = (key: HomeSortKey, defaultDir: HomeSortDirection) => {
    setSort((prev) => {
      if (prev.key === key) {
        return { key, dir: prev.dir === "asc" ? "desc" : "asc" };
      }
      return { key, dir: defaultDir };
    });
  };

  if (projectsQuery.isLoading) {
    return <p className="text-sm text-muted">Loading projects...</p>;
  }

  if (projectsQuery.isError) {
    return (
      <div className="rounded-xl border border-line bg-surface p-5">
        <h2 className="text-lg font-semibold">Studio</h2>
        <p className="mt-2 text-sm text-muted">
          {projectsQuery.error instanceof Error
            ? projectsQuery.error.message
            : "Could not load projects"}
        </p>
      </div>
    );
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <HomeToolbar
        sort={sort}
        onSortChange={onSortChange}
        onCreateProject={onCreateProject}
        onOpenSettings={() => navigate("/settings")}
        onLogout={onLogout}
      />

      <section className="grid flex-1 auto-rows-max grid-cols-[repeat(auto-fill,minmax(220px,1fr))] content-start items-start gap-[18px] overflow-x-hidden overflow-y-auto pb-[170px] pr-1">
        {sortedProjects.length ? (
          sortedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={(projectId) => navigate(`/project/${encodeURIComponent(projectId)}`)}
            />
          ))
        ) : (
          <div className="rounded-[14px] border border-dashed border-line-bright bg-white/[0.02] p-[26px] text-sm text-muted">
            No projects yet. Create one to start uploading tracks.
          </div>
        )}
      </section>
    </section>
  );
}
