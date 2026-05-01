import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSharedProject,
  type SharedUpdateProjectInput,
  updateSharedProject,
} from "@/api/shared";
import { queryKeys } from "@/lib/query-keys";

export function useSharedProject(token: string) {
  return useQuery({
    queryKey: queryKeys.sharedProject(token),
    queryFn: () => getSharedProject(token),
    enabled: Boolean(token),
  });
}

export function useUpdateSharedProject(token: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: SharedUpdateProjectInput) =>
      updateSharedProject(token, input),
    onSuccess: async (payload) => {
      queryClient.setQueryData(queryKeys.sharedProject(token), payload);
    },
  });
}
