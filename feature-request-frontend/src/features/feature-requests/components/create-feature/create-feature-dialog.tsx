import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";

import { CreateFeatureForm } from "./create-feature-form";

type CreateFeatureDialogProps = {
  userIdentifier: string;
};

export function CreateFeatureDialog({
  userIdentifier,
}: CreateFeatureDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#6f62f3] px-5">+ בקשה חדשה</Button>
      </DialogTrigger>

      <DialogContent dir="rtl">
        <DialogHeader>
          <DialogTitle>הגש בקשת פיצ׳ר חדש</DialogTitle>
        </DialogHeader>

        <CreateFeatureForm
          userIdentifier={userIdentifier}
          onSuccess={() => setOpen(false)}
        />

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            ביטול
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
