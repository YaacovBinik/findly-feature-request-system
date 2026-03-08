import { useState } from "react";
import { Info } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { useCreateFeature } from "../../hooks/use-create-feature";
import { toast } from "sonner";

type CreateFeatureFormProps = {
  userIdentifier: string;
  onSuccess: () => void;
  onCancel?: () => void;
};

const TITLE_LIMIT = 100;

export function CreateFeatureForm({
  userIdentifier,
  onSuccess,
  onCancel,
}: CreateFeatureFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { mutate, isPending } = useCreateFeature(userIdentifier);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      {
        title: title.trim(),
        description: description.trim(),
        creatorIdentifier: userIdentifier,
      },
      {
        onSuccess: () => {
          toast.success("הבקשה נוספה בהצלחה");
          setTitle("");
          setDescription("");
          onSuccess();
        },
        onError: () => {
          toast.error("יצירת הבקשה נכשלה");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-0 text-right">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-[#374151]">
          <span className="text-red-500">*</span> כותרת הבקשה
        </label>

        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="תאר את הבקשה בקצרה..."
          maxLength={TITLE_LIMIT}
          required
          className="h-12 rounded-xl border-[#E5E7EB] bg-white text-right placeholder:text-[#9CA3AF] focus-visible:ring-1 focus-visible:ring-[#6f62f3]"
        />

        <p className="text-xs text-[#9CA3AF]">
          {title.length}/{TITLE_LIMIT}
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-[#374151]">
          <span className="text-red-500">*</span> תיאור מפורט
        </label>

        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="הסבר מה הפיצ׳ר אמור לעשות ולמה הוא חשוב..."
          required
          className="min-h-32.5 max-h-55 overflow-y-auto resize-none rounded-xl border-[#E5E7EB] bg-white text-right placeholder:text-[#9CA3AF] focus-visible:ring-1 focus-visible:ring-[#6f62f3]"
        />

        <p className="text-xs text-[#9CA3AF]">
          תאר בבירור את הבעיה שאתה מנסה לפתור או את הפתרון המוצע
        </p>
      </div>

      <div className="rounded-2xl border border-[#E5E7FF] bg-[#F7F7FF] p-4">
        <div className="mb-3 flex items-center justify-start gap-2 text-[#6f62f3]">
          <span className="text-sm font-semibold">טיפים לבקשה טובה</span>
          <Info className="h-4 w-4" />
        </div>

        <ul className="space-y-2 text-sm text-[#6B7280]">
          <li>• תאר את הבעיה לפני הפתרון - למה אתה צריך את זה?</li>
          <li>• תן דוגמאות קונקרטיות לשימוש</li>
          <li>• בדוק שאין כבר בקשה דומה לפני שמגישים</li>
        </ul>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="h-11 rounded-xl border-[#E5E7EB] px-5 text-[#374151]"
          >
            ביטול
          </Button>
        )}
        <Button
          type="submit"
          disabled={isPending || !title.trim() || !description.trim()}
          className="h-11 rounded-xl bg-[#6f62f3] px-5 hover:bg-[#5b4ff0]"
        >
          {isPending ? "שולח..." : "  שלח בקשה "}
        </Button>
      </div>
    </form>
  );
}
