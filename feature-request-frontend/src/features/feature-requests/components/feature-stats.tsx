import { Card, CardContent } from "../../../components/ui/card"
import type { Feature } from "../types/feature.types"

type FeatureStatsProps = {
  features: Feature[]
  userIdentifier: string
}

export function FeatureStats({
  features,
  userIdentifier,
}: FeatureStatsProps) {
  const totalFeatures = features.length

  const myFeatures = features.filter(
    (feature) => feature.isOwner
  ).length

  const votedFeatures = features.filter(
    (feature) => feature.likedByUser
  ).length

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">סה״כ בקשות</p>
          <p className="mt-2 text-3xl font-bold">{totalFeatures}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">בקשות שלי</p>
          <p className="mt-2 text-3xl font-bold">{myFeatures}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">בקשות שהצבעתי</p>
          <p className="mt-2 text-3xl font-bold">{votedFeatures}</p>
        </CardContent>
      </Card>
    </div>
  )
}