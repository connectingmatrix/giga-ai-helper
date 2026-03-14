export function sanitizeActionName<T extends string>(value: string, allowed: Set<T>): T | null {
  const normalized = String(value || '').trim();
  return allowed.has(normalized as T) ? (normalized as T) : null;
}
