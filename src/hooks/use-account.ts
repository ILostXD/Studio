import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAccount,
  updateAccount,
  type UpdateAccountInput,
} from "@/api/auth";
import {
  createUser,
  deleteUser,
  listUsers,
  type CreateUserInput,
} from "@/api/users";
import { queryKeys } from "@/lib/query-keys";

export function useAccount() {
  return useQuery({
    queryKey: queryKeys.account,
    queryFn: getAccount,
  });
}

export function useUpdateAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateAccountInput) => updateAccount(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.account });
      await queryClient.invalidateQueries({ queryKey: queryKeys.session });
    },
  });
}

export function useUsers(enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: listUsers,
    enabled,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateUserInput) => createUser(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
}
