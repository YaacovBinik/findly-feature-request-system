import { Badge } from "../../../components/ui/badge"
import { Card, CardContent } from "../../../components/ui/card"
import type { Feature } from "../types/feature.types"
import { VoteButton } from "./vote-button"

type FeatureCardProps = {
  feature: Feature
  userIdentifier: string
}

export function FeatureCard({
  feature,
  userIdentifier,
}: FeatureCardProps) {
  return (
    <Card className="rounded-2xl border-border/60 shadow-sm">
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex items-center gap-2">
            <h3 className="text-xl font-semibold text-foreground">
              {feature.title}
            </h3>

            {feature.isOwner && (
              <Badge variant="secondary" className="rounded-full">
                שלי
              </Badge>
            )}
          </div>

          <p className="mb-4 text-sm leading-6 text-muted-foreground">
            {feature.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>{feature.likedByUser ? "כבר הצבעת" : "עדיין לא הצבעת"}</span>
            <span>•</span>
            <span>
              {feature.votes} {feature.votes === 1 ? "הצבעה" : "הצבעות"}
            </span>
          </div>
        </div>

        <div className="shrink-0">
          <VoteButton
            featureId={feature.id}
            votes={feature.votes}
            likedByUser={feature.likedByUser}
            isOwner={feature.isOwner}
            userIdentifier={userIdentifier}
          />
        </div>
      </CardContent>
    </Card>
  )
}