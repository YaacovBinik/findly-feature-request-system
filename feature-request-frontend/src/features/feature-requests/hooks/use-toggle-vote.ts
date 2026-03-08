import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toggleVote } from "../api/features.api"

export function useToggleVote(userIdentifier: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (featureId: string) => toggleVote(featureId, userIdentifier),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["features", userIdentifier],
      })
    },
  })
}