export function toNumberOrNull(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function toNumber(value: unknown): number | null {
  return toNumberOrNull(value);
}
