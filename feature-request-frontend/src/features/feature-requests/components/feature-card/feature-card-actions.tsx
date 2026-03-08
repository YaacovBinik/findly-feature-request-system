import { Button } from "../../../../components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog";

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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="rounded-xl border-red-200 text-red-600 hover:bg-red-50"
              disabled={isDeleting}
            >
              <Trash2 className="ml-2 h-4 w-4" />
              מחק
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent dir="rtl">
            <AlertDialogHeader>
              <AlertDialogTitle>מחיקת הצעה</AlertDialogTitle>
              <AlertDialogDescription>
                האם אתה בטוח שברצונך למחוק את ההצעה? פעולה זו אינה ניתנת לביטול.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>ביטול</AlertDialogCancel>

              <AlertDialogAction
                onClick={onDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                מחק
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {canEdit && (
        <Button variant="outline" className="rounded-xl" onClick={onStartEdit}>
          <Pencil className="ml-2 h-4 w-4" />
          ערוך
        </Button>
      )}
    </div>
  );
}
