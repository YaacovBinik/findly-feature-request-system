import { Button } from "../../../components/ui/button"
import { useToggleVote } from "../hooks/use-toggle-vote"

type VoteButtonProps = {
  featureId: string
  votes: number
  likedByUser: boolean
  isOwner: boolean
  userIdentifier: string
}

export function VoteButton({
  featureId,
  votes,
  likedByUser,
  isOwner,
  userIdentifier,
}: VoteButtonProps) {
  const { mutate, isPending } = useToggleVote(userIdentifier)

  return (
    <Button
      type="button"
      variant={likedByUser ? "default" : "outline"}
      disabled={isPending || isOwner}
      onClick={() => mutate(featureId)}
      className="h-auto min-w-20 rounded-xl px-4 py-3"
    >
      <div className="flex flex-col items-center gap-1">
        <span className="text-lg font-bold leading-none">{votes}</span>
        <span className="text-xs leading-none">
          {isOwner ? "שלך" : likedByUser ? "הצבעת" : "הצבע"}
        </span>
      </div>
    </Button>
  )
}