import { Accordion } from "../../../../components/ui/accordion";
import type { Feature } from "../../types/feature.types";
import { FeatureCard } from "../feature-card/feature-card";

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
  if (isLoading) return <div>טוען בקשות...</div>;

  if (isError) return <div>שגיאה בטעינת הבקשות</div>;

  if (features.length === 0) return <div>אין עדיין בקשות</div>;

  return (
    <Accordion
      type="single"
      collapsible
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white"
    >
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.id}
          feature={feature}
          userIdentifier={userIdentifier}
          isLast={index === features.length - 1}
        />
      ))}
    </Accordion>
  );
}
