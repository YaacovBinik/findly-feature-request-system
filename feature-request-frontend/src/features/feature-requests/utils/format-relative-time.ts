export function formatRelativeTime(dateString: string) {
  const now = new Date()
  const date = new Date(dateString)

  const diffMs = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMinutes < 1) return "עכשיו"
  if (diffMinutes < 60) return `לפני ${diffMinutes} דק׳`
  if (diffHours < 24) return `לפני ${diffHours} שעות`
  if (diffDays < 30) return `לפני ${diffDays} ימים`

  return date.toLocaleDateString("he-IL")
}