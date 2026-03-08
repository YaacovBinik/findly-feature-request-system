type OwnerBadgeProps = {
  isOwner: boolean;
};

export function OwnerBadge({ isOwner }: OwnerBadgeProps) {
  if (!isOwner) return null;

  return (
    <span className="shrink-0 rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700">
      שלי
    </span>
  );
}