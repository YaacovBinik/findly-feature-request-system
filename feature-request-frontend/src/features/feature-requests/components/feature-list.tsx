import type { Feature } from "../types/feature.types";
import { FeatureCard } from "./feature-card";

type FeatureListProps = {
  userIdentifier: string;
  features: Feature[];
  isLoading: boolean;
  isError: boolean;
};

export function FeatureList({
  userIdentifier,
  features,
  isLoading,
  isError,
}: FeatureListProps) {
  if (isLoading) <div>טוען בקשות...</div>;

  if (isError) <div>שגיאה בטעינת הבקשות</div>;

  if (features.length === 0) <div>אין עדיין בקשות</div>;

  return (
    <div className="space-y-4">
      {features.map((feature) => (
        <FeatureCard
          key={feature.id}
          feature={feature}
          userIdentifier={userIdentifier}
        />
      ))}
    </div>
  );
}
