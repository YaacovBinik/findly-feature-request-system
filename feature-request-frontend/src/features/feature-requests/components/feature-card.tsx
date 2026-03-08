import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  CalendarDays,
  MessageSquare,
  UserRound,
  Clock3,
  ChevronUp,
} from "lucide-react";

import type { Feature } from "../types/feature.types";
import { VoteButton } from "./vote-button";
import { formatRelativeTime } from "../utils/format-relative-time";

type FeatureCardProps = {
  feature: Feature;
  userIdentifier: string;
};

export function FeatureCard({ feature, userIdentifier }: FeatureCardProps) {
  const shortDescription =
    feature.description.length > 110
      ? `${feature.description.slice(0, 110)}...`
      : feature.description;

  const relativeTime = formatRelativeTime(feature.createdAt);

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={feature.id} className="border-none">
        <Card className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <CardContent className="p-0">
            <div className="border-b border-slate-100 bg-violet-50/50">
              <AccordionTrigger className="w-full px-6 py-5 hover:no-underline">
                <div className="flex w-full flex-row-reverse items-start justify-between gap-4 text-right">
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
                        <h3 className="truncate text-xl font-semibold text-slate-900">
                          {feature.title}
                        </h3>
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
              </AccordionTrigger>
            </div>

            <AccordionContent className="px-0 pb-0 pt-0">
              <div className="px-6 py-8 text-right">
                <p className="whitespace-pre-line text-sm leading-8 text-slate-700">
                  {feature.description}
                </p>
              </div>

              <div className="border-t border-slate-100 px-6 py-4">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                    <div className="text-sm text-slate-500">
                      משתמשים תומכים בבקשה זו
                    </div>

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
                        {new Date(feature.createdAt).toLocaleDateString(
                          "he-IL",
                        )}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right">
                      <div className="mb-2 flex items-center justify-end gap-2 text-xs text-slate-400">
                        <MessageSquare className="h-4 w-4" />
                        <span>תגובות</span>
                      </div>
                      <div className="text-sm font-semibold text-slate-900">
                        0
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </CardContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
}
