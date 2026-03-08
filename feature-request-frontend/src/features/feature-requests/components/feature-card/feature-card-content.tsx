import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { Save, X } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type FeatureCardContentProps = {
  isEditing: boolean;
  title: string;
  description: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  isSaving: boolean;
  onSave: () => void;
  onCancelEdit: () => void;
  originalDescription: string;
};

export function FeatureCardContent({
  isEditing,
  title,
  description,
  setTitle,
  setDescription,
  isSaving,
  onSave,
  onCancelEdit,
  originalDescription,
}: FeatureCardContentProps) {
  if (isEditing) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">כותרת</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={150}
            dir="rtl"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">תיאור</label>
          <Textarea
            className="min-h-35 max-h-36 overflow-y-auto resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            maxLength={1000}
            dir="rtl"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={onSave}
            disabled={isSaving}
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
          >
            <Save className="ml-2 h-4 w-4" />
            {isSaving ? "שומר..." : "שמור"}
          </Button>

          <Button
            variant="outline"
            onClick={onCancelEdit}
            disabled={isSaving}
            className="rounded-xl"
          >
            <X className="ml-2 h-4 w-4" />
            ביטול
          </Button>
        </div>
      </div>
    );
  }

  return (
    <p className="whitespace-pre-line text-sm leading-8 text-slate-700  max-h-36 overflow-y-auto ">
      {originalDescription}
    </p>
  );
}
