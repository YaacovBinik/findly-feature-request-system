import { Card, CardContent } from "../../../components/ui/card";
import type { Feature } from "../types/feature.types";
import { VoteButton } from "./vote-button";

type FeatureCardProps = {
  feature: Feature;
  userIdentifier: string;
};

export function FeatureCard({ feature, userIdentifier }: FeatureCardProps) {
  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-4 p-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{feature.title}</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {feature.description}
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <span>{feature.likedByUser ? "עשית לייק" : "עוד לא הצבעת"}</span>
            <span>•</span>
            <span>{feature.isOwner ? "שלך" : "של משתמש אחר"}</span>
          </div>
        </div>

        <VoteButton
          featureId={feature.id}
          votes={feature.votes}
          likedByUser={feature.likedByUser}
          isOwner={feature.isOwner}
          userIdentifier={userIdentifier}
        />
      </CardContent>
    </Card>
  );
}
