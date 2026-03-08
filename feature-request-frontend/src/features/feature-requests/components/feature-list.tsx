import { useFeatures } from "../hooks/use-features";
import { FeatureCard } from "./feature-card";

type FeatureListProps = {
  userIdentifier: string;
  search: string;
};

export function FeatureList({ userIdentifier, search }: FeatureListProps) {
  const { data, isLoading, isError } = useFeatures(userIdentifier);

  if (isLoading) <div>טוען בקשות...</div>;

  if (isError) <div>שגיאה בטעינת הבקשות</div>;

  if (!data || data.length === 0) <div>אין עדיין בקשות</div>;

  const filtered = data?.filter(
    (feature) =>
      feature.title.toLowerCase().includes(search.toLowerCase()) ||
      feature.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      {filtered?.map((feature) => (
        <FeatureCard
          key={feature.id}
          feature={feature}
          userIdentifier={userIdentifier}
        />
      ))}
    </div>
  );
}
