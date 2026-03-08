import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";
import { Card, CardContent } from "../../../../components/ui/card";

import type { Feature } from "../../types/feature.types";
import { useDeleteFeature } from "../../hooks/use-delete-feature";
import { useUpdateFeature } from "../../hooks/use-update-feature";
import { FeatureCardHeader } from "./feature-card-header";
import { FeatureCardContent } from "./feature-card-content";
import { FeatureCardActions } from "./feature-card-actions";
import { FeatureCardStats } from "./feature-card-stats";
import { toast } from "sonner";

type FeatureCardProps = {
  feature: Feature;
  userIdentifier: string;
};

export function FeatureCard({ feature, userIdentifier }: FeatureCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(feature.title);
  const [description, setDescription] = useState(feature.description);

  const { mutate: deleteMutate, isPending: isDeleting } =
    useDeleteFeature(userIdentifier);

  const { mutate: updateMutate, isPending: isSaving } =
    useUpdateFeature(userIdentifier);

  function handleSave() {
    updateMutate(
      {
        id: feature.id,
        title,
        description,
        creatorIdentifier: userIdentifier,
      },
      {
        onSuccess: () => {
          toast.success("השינויים נשמרו");
          setIsEditing(false);
        },
        onError: () => {
          toast.error("שמירת השינויים נכשלה");
        },
      },
    );
  }

  function handleCancelEdit() {
    setTitle(feature.title);
    setDescription(feature.description);
    setIsEditing(false);
  }

  function handleDelete() {
    deleteMutate(feature.id, {
      onSuccess: () => {
        toast.success("ההצעה נמחקה בהצלחה");
      },
      onError: () => {
        toast.error("מחיקת ההצעה נכשלה");
      },
    });
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={feature.id} className="border-none">
        <Card className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <CardContent className="p-0">
            <div className="border-b border-slate-100 bg-violet-50/50">
              <AccordionTrigger className="w-full px-6 py-5 hover:no-underline">
                <FeatureCardHeader
                  feature={feature}
                  userIdentifier={userIdentifier}
                />
              </AccordionTrigger>
            </div>

            <AccordionContent className="px-0 pb-0 pt-0">
              <div className="px-6 py-8 text-right">
                <FeatureCardContent
                  isEditing={isEditing}
                  title={title}
                  description={description}
                  setTitle={setTitle}
                  setDescription={setDescription}
                  isSaving={isSaving}
                  onSave={handleSave}
                  onCancelEdit={handleCancelEdit}
                  originalDescription={feature.description}
                />
              </div>

              <div className="border-t border-slate-100 px-6 py-4">
                <FeatureCardActions
                  canDelete={feature.canDelete}
                  canEdit={feature.canEdit}
                  isEditing={isEditing}
                  isDeleting={isDeleting}
                  onDelete={handleDelete}
                  onStartEdit={() => setIsEditing(true)}
                />

                <FeatureCardStats feature={feature} />
              </div>
            </AccordionContent>
          </CardContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
}
