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
        <Button className="bg-[#6f62f3] px-5 hover:bg-[#5b4ff0]">
          + בקשה חדשה
        </Button>
      </DialogTrigger>

      <DialogContent
        dir="rtl"
        className="w-full max-w-170! max-h-[85vh]! overflow-y-auto rounded-2xl border border-[#E5E7EB] bg-white p-0 shadow-xl [&>button]:right-auto [&>button]:left-4"
      >
        <div className="px-8 pt-8 pb-6">
          <DialogHeader className="mb-6 text-right">
            <DialogTitle className="text-[28px] font-bold leading-none text-[#111827]">
              הגש בקשה לפיצ׳ר חדש
            </DialogTitle>
            <p className="mt-2 text-sm text-[#6B7280]">
              שתף את הרעיון שלך ועזור לנו לשפר את המוצר
            </p>
          </DialogHeader>

          <CreateFeatureForm
            userIdentifier={userIdentifier}
            onSuccess={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
