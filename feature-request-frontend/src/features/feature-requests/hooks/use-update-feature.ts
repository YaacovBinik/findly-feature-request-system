import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFeature } from "../api/features.api";

type UpdateFeatureInput = {
  id: string;
  title: string;
  description: string;
  creatorIdentifier: string;
};

export function useUpdateFeature(userIdentifier?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: UpdateFeatureInput) =>
      updateFeature(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["features", userIdentifier],
      });
    },
  });
}