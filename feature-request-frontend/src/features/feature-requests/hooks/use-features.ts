import { useQuery } from "@tanstack/react-query"
import { getFeatures } from "../api/features.api"

export const useFeatures = (userIdentifier?: string) => {
  return useQuery({
    queryKey: ["features", userIdentifier],
    queryFn: () => getFeatures(userIdentifier),
  })
}