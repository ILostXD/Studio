import { apiRequest } from "@/api/client";
import type { AccountResponse, SessionResponse } from "@/types/project";

export async function getSession(): Promise<SessionResponse> {
  return apiRequest<SessionResponse>("/api/session", {
    allowUnauthorized: true,
  });
}

export interface LoginInput {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface SetupInput {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface UpdateAccountInput {
  username?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export async function setupFirstUser(input: SetupInput): Promise<AccountResponse> {
  return apiRequest<AccountResponse>("/api/setup", {
    method: "POST",
    body: input,
    allowUnauthorized: true,
  });
}

export async function login(input: LoginInput): Promise<AccountResponse> {
  return apiRequest<AccountResponse>("/api/login", {
    method: "POST",
    body: input,
    allowUnauthorized: true,
  });
}

export async function getAccount(): Promise<AccountResponse> {
  return apiRequest<AccountResponse>("/api/account");
}

export async function updateAccount(
  input: UpdateAccountInput,
): Promise<AccountResponse> {
  return apiRequest<AccountResponse>("/api/account", {
    method: "PATCH",
    body: input,
  });
}

export async function logout(): Promise<void> {
  await apiRequest("/api/logout", {
    method: "POST",
  });
}
