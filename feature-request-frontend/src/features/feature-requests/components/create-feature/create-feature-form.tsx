import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { useCreateFeature } from "../../hooks/use-create-feature";
import { toast } from "sonner";

type CreateFeatureFormProps = {
  userIdentifier: string;
  onSuccess: () => void;
};

export function CreateFeatureForm({
  userIdentifier,
  onSuccess,
}: CreateFeatureFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { mutate, isPending } = useCreateFeature(userIdentifier);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      {
        title,
        description,
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">כותרת</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="לדוגמה: Dark mode"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">תיאור</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="תאר מה היית רוצה שיוסיפו"
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "שולח..." : "שלח בקשה"}
        </Button>
      </div>
    </form>
  );
}
