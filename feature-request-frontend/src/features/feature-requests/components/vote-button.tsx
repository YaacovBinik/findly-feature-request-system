import { Button } from "../../../components/ui/button";
import { useToggleVote } from "../hooks/use-toggle-vote";

type VoteButtonProps = {
  featureId: string;
  votes: number;
  likedByUser: boolean;
  isOwner: boolean;
  userIdentifier: string;
};

export function VoteButton({
  featureId,
  votes,
  likedByUser,
  isOwner,
  userIdentifier,
}: VoteButtonProps) {
  const { mutate, isPending } = useToggleVote(userIdentifier);

  return (
    <Button
      type="button"
      variant={likedByUser ? "default" : "outline"}
      disabled={isPending || isOwner}
      onClick={() => mutate(featureId)}
      className="min-w-24"
    >
      {votes} {likedByUser ? "הצבעת" : "הצבע"}
    </Button>
  );
}
