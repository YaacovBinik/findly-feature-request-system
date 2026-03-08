import { Button } from "../../../../components/ui/button";
import { CalendarDays, MessageSquare, UserRound } from "lucide-react";
import type { Feature } from "../../types/feature.types";

type FeatureCardStatsProps = {
  feature: Feature;
};

export function FeatureCardStats({ feature }: FeatureCardStatsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
        <div className="text-sm text-slate-500">משתמשים תומכים בבקשה זו</div>

        <div className="flex items-center gap-3">
          <div className="text-3xl font-bold text-slate-900">
            {feature.votes}
          </div>

          <Button className="rounded-xl bg-emerald-600 hover:bg-emerald-700">
            הצבעתי
          </Button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right">
          <div className="mb-2 flex items-center justify-end gap-2 text-xs text-slate-400">
            <UserRound className="h-4 w-4" />
            <span>נוצר ע״י</span>
          </div>
          <div className="text-sm font-semibold text-slate-900">
            {feature.isOwner ? "אתה" : "משתמש אחר"}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right">
          <div className="mb-2 flex items-center justify-end gap-2 text-xs text-slate-400">
            <CalendarDays className="h-4 w-4" />
            <span>תאריך</span>
          </div>
          <div className="text-sm font-semibold text-slate-900">
            {new Date(feature.createdAt).toLocaleDateString("he-IL")}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right">
          <div className="mb-2 flex items-center justify-end gap-2 text-xs text-slate-400">
            <MessageSquare className="h-4 w-4" />
            <span>תגובות</span>
          </div>
          <div className="text-sm font-semibold text-slate-900">0</div>
        </div>
      </div>
    </div>
  );
}