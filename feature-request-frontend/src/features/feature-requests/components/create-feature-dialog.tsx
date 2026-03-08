import { useState } from "react"
import { Button } from "../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { useCreateFeature } from "../hooks/use-create-feature"

type CreateFeatureDialogProps = {
  userIdentifier: string
}

export function CreateFeatureDialog({
  userIdentifier,
}: CreateFeatureDialogProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [email, setEmail] = useState("")

  const { mutate, isPending } = useCreateFeature(userIdentifier)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    mutate(
      {
        title,
        description,
        email,
        creatorIdentifier: userIdentifier,
      },
      {
        onSuccess: () => {
          setTitle("")
          setDescription("")
          setEmail("")
          setOpen(false)
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>הצע פיצ׳ר</Button>
      </DialogTrigger>

      <DialogContent dir="rtl">
        <DialogHeader>
          <DialogTitle>הגש בקשת פיצ׳ר חדש</DialogTitle>
        </DialogHeader>

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

          <div className="space-y-2">
            <label className="text-sm font-medium">אימייל</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              ביטול
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? "שולח..." : "שלח בקשה"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}