/**
 * Merges the host's getSettings() reply over the defaults. A missing or empty value keeps
 * the default, and a reply that is not JSON (host error, or running outside CEP) keeps them all.
 */
export function mergeSettings<T extends Record<string, string>>(defaults: T, reply: string): T {
  let stored: Record<string, unknown> = {}
  try {
    const parsed: unknown = JSON.parse(reply)
    if (parsed && typeof parsed === 'object') stored = parsed as Record<string, unknown>
  } catch {
    // Not JSON: keep the defaults.
  }
  const merged = { ...defaults }
  for (const key of Object.keys(defaults) as (keyof T & string)[]) {
    const value = stored[key]
    if (typeof value === 'string' && value !== '') merged[key] = value as T[keyof T & string]
  }
  return merged
}
