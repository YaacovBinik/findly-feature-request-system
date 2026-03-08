import { Button } from "../../../../components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

type FeatureCardActionsProps = {
  canDelete: boolean;
  canEdit: boolean;
  isEditing: boolean;
  isDeleting: boolean;
  onDelete: () => void;
  onStartEdit: () => void;
};

export function FeatureCardActions({
  canDelete,
  canEdit,
  isEditing,
  isDeleting,
  onDelete,
  onStartEdit,
}: FeatureCardActionsProps) {
  if (isEditing) return null;

  return (
    <div className="mb-4 flex justify-end gap-2">
      {canDelete && (
        <Button
          variant="outline"
          className="rounded-xl border-red-200 text-red-600 hover:bg-red-50"
          onClick={onDelete}
          disabled={isDeleting}
        >
          <Trash2 className="ml-2 h-4 w-4" />
          {isDeleting ? "מוחק..." : "מחק"}
        </Button>
      )}

      {canEdit && (
        <Button
          variant="outline"
          className="rounded-xl"
          onClick={onStartEdit}
        >
          <Pencil className="ml-2 h-4 w-4" />
          ערוך
        </Button>
      )}
    </div>
  );
}