import { apiRequest } from "@/api/client";
import type { AccountResponse, UsersListResponse } from "@/types/project";

export interface CreateUserInput {
  username: string;
  password: string;
  confirmPassword: string;
}

export async function listUsers(): Promise<UsersListResponse> {
  return apiRequest<UsersListResponse>("/api/users");
}

export async function createUser(input: CreateUserInput): Promise<AccountResponse> {
  return apiRequest<AccountResponse>("/api/users", {
    method: "POST",
    body: input,
  });
}

export async function deleteUser(userId: string): Promise<void> {
  await apiRequest(`/api/users/${encodeURIComponent(userId)}`, {
    method: "DELETE",
  });
}
