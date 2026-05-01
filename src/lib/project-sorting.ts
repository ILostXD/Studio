import type { ProjectSummary } from "@/types/project";

export type HomeSortKey =
  | "updatedAt"
  | "createdAt"
  | "title"
  | "artist"
  | "status"
  | "completionPercent"
  | "starRating"
  | "releaseDate"
  | "startDate";

export type HomeSortDirection = "asc" | "desc";

export interface HomeSort {
  key: HomeSortKey;
  dir: HomeSortDirection;
}

export function sortProjects(
  projects: ProjectSummary[],
  sort: HomeSort,
): ProjectSummary[] {
  const { key, dir } = sort;
  const list = [...projects];

  list.sort((a, b) => {
    const av = a[key];
    const bv = b[key];

    const aNull = av == null || av === "";
    const bNull = bv == null || bv === "";
    if (aNull && bNull) return 0;
    if (aNull) return 1;
    if (bNull) return -1;

    if (typeof av === "number" && typeof bv === "number") {
      return dir === "asc" ? av - bv : bv - av;
    }

    const left = String(av).toLowerCase();
    const right = String(bv).toLowerCase();
    if (left < right) return dir === "asc" ? -1 : 1;
    if (left > right) return dir === "asc" ? 1 : -1;
    return 0;
  });

  return list;
}
