import { useFeatures } from "../hooks/use-features";
import { FeatureCard } from "./feature-card";

type FeatureListProps = {
  userIdentifier: string;
};

export function FeatureList({ userIdentifier }: FeatureListProps) {
  const { data, isLoading, isError } = useFeatures(userIdentifier);

  if (isLoading) <div>טוען בקשות...</div>;

  if (isError) <div>שגיאה בטעינת הבקשות</div>;

  if (!data || data.length === 0) <div>אין עדיין בקשות</div>;

  return (
    <div className="space-y-4">
      {data?.map((feature) => (
        <FeatureCard
          key={feature.id}
          feature={feature}
          userIdentifier={userIdentifier}
        />
      ))}
    </div>
  );
}
