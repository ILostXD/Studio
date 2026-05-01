export const queryKeys = {
  session: ["session"] as const,
  account: ["account"] as const,
  users: ["users"] as const,
  projects: ["projects"] as const,
  project: (projectId: string) => ["project", projectId] as const,
  sharedProject: (token: string) => ["shared-project", token] as const,
};
