import { ChevronUp } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { useToggleVote } from "../../hooks/use-toggle-vote";

type VoteButtonProps = {
  featureId: string;
  votes: number;
  likedByUser: boolean;
  isOwner: boolean;
  userIdentifier: string;
};

const baseClasses =
  "h-16 w-14 rounded-2xl border transition-all flex flex-col items-center justify-center gap-1 px-0";

const activeClasses =
  "border-violet-500 bg-violet-500 text-white hover:bg-violet-500";

const inactiveClasses =
  "border-slate-200 bg-white text-slate-700 hover:bg-slate-50";

export function VoteButton({
  featureId,
  votes,
  likedByUser,
  isOwner,
  userIdentifier,
}: VoteButtonProps) {
  const { mutate, isPending } = useToggleVote(userIdentifier);

  const className = `${baseClasses} ${
    likedByUser ? activeClasses : inactiveClasses
  }`;

  return (
    <Button
      type="button"
      variant="outline"
      disabled={isPending || isOwner}
      title={isOwner ? "לא ניתן להצביע להצעה שלך" : "הצבע לפיצ'ר"}
      onClick={() => mutate(featureId)}
      className={className}
    >
      <ChevronUp className="h-4 w-4" />
      <span className="text-sm font-bold leading-none">{votes}</span>
    </Button>
  );
}
