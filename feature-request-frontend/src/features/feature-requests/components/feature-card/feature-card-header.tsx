import { Clock3, ChevronUp, MessageSquare } from "lucide-react";
import type { Feature } from "../../types/feature.types";
import { VoteButton } from "../vote/vote-button";
import { formatRelativeTime } from "../../utils/format-relative-time";
import { OwnerBadge } from "./owner-badge";

type FeatureCardHeaderProps = {
  feature: Feature;
  userIdentifier: string;
};

export function FeatureCardHeader({
  feature,
  userIdentifier,
}: FeatureCardHeaderProps) {
  const shortDescription =
    feature.description.length > 110
      ? `${feature.description.slice(0, 110)}...`
      : feature.description;

  const relativeTime = formatRelativeTime(feature.createdAt);

  return (
    <div className="flex w-full items-start justify-between gap-4 text-right">
      <div className="shrink-0">
        <VoteButton
          featureId={feature.id}
          votes={feature.votes}
          likedByUser={feature.likedByUser}
          isOwner={feature.isOwner}
          userIdentifier={userIdentifier}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-400">
            <ChevronUp className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-end gap-2">
              <OwnerBadge isOwner={feature.isOwner} />

              <h3 className="truncate text-xl font-semibold text-slate-900">
                {feature.title}
              </h3>
            </div>
          </div>
        </div>

        <p className="mb-3 line-clamp-1 text-sm text-slate-600">
          {shortDescription}
        </p>

        <div className="flex flex-wrap items-center justify-end gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <Clock3 className="h-3.5 w-3.5" />
            <span>{relativeTime}</span>
          </div>

          <div className="flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>0 תגובות</span>
          </div>
        </div>
      </div>
    </div>
  );
}
