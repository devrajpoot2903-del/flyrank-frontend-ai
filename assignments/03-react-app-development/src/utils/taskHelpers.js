export const DEFAULT_PRIORITY = 'medium'

export function createTask(title, priority) {
  const trimmedTitle = title.trim()

  if (!trimmedTitle) {
    return null
  }

  return {
    id: crypto.randomUUID(),
    title: trimmedTitle,
    priority,
    completed: false,
    createdAt: new Date().toISOString(),
  }
}
