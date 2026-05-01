import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSession,
  login,
  logout,
  setupFirstUser,
  type LoginInput,
  type SetupInput,
} from "@/api/auth";
import { queryKeys } from "@/lib/query-keys";

export function useSession() {
  return useQuery({
    queryKey: queryKeys.session,
    queryFn: getSession,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: LoginInput) => login(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.session });
      await queryClient.invalidateQueries({ queryKey: queryKeys.account });
    },
  });
}

export function useSetupFirstUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: SetupInput) => setupFirstUser(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.session });
      await queryClient.invalidateQueries({ queryKey: queryKeys.account });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.session });
      queryClient.removeQueries({ queryKey: queryKeys.account });
      queryClient.removeQueries({ queryKey: queryKeys.users });
    },
  });
}
