import { Users, ThumbsUp, ClipboardList } from "lucide-react";
import type { Feature } from "../../types/feature.types";
import { FeatureStatCard } from "./feature-stat-card";

type FeatureStatsProps = {
  features: Feature[];
};

export function FeatureStats({ features }: FeatureStatsProps) {
  const totalFeatures = features.length;

  const myFeatures = features.filter((feature) => feature.isOwner).length;

  const votedFeatures = features.filter(
    (feature) => feature.likedByUser,
  ).length;

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-3">
      <FeatureStatCard
        icon={Users}
        label="סה״כ בקשות"
        value={totalFeatures}
        borderColor="border-violet-400"
      />

      <FeatureStatCard
        icon={ClipboardList}
        label="בקשות שלי"
        value={myFeatures}
      />

      <FeatureStatCard
        icon={ThumbsUp}
        label="בקשות שהצבעתי"
        value={votedFeatures}
      />
    </div>
  );
}
