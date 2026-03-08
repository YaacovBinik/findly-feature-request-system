import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFeature } from "../api/features.api";

export function useDeleteFeature(userIdentifier?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (featureId: string) =>
      deleteFeature(featureId, userIdentifier ?? ""),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["features", userIdentifier],
      });
    },
  });
}
