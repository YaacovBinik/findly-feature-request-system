const STORAGE_KEY = "feature-request-user-id"

export function getUserIdentifier() {
  const existing = localStorage.getItem(STORAGE_KEY)

  if (existing) existing

  const newId = crypto.randomUUID()
  localStorage.setItem(STORAGE_KEY, newId)
  return newId
}