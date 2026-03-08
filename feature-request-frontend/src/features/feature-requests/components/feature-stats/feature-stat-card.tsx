import { Card, CardContent } from "../../../../components/ui/card";
import type { LucideIcon } from "lucide-react";

type FeatureStatCardProps = {
  icon: LucideIcon;
  label: string;
  value: number;
  footer?: string;
  borderColor?: string;
};

export function FeatureStatCard({
  icon: Icon,
  label,
  value,
  footer,
  borderColor = "border-slate-200",
}: FeatureStatCardProps) {
  return (
    <Card className={`rounded-md shadow-sm ${borderColor}`}>
      <CardContent className="p-5">
        <div className="mb-3 flex items-center gap-1.5 text-slate-500">
          <Icon className="h-4 w-4 text-violet-500" />
          <span className="text-sm">{label}</span>
        </div>

        <div className="text-4xl font-bold text-slate-900">{value}</div>

        {footer && (
          <div className="mt-3 text-sm font-medium text-emerald-600">
            {footer}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
