import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createFeature } from "../api/features.api"

export function useCreateFeature(userIdentifier: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createFeature,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["features", userIdentifier],
      })
    },
  })
}