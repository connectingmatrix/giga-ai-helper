import { safeJsonParse } from './json-utils';

export function toPgVector(vectorArray: number[]): string {
  return `[${vectorArray.join(',')}]`;
}

export function parseEmbeddingValue(value: unknown): number[] | null {
  if (!value) return null;

  if (Array.isArray(value)) {
    const vector = value.map((v) => Number(v)).filter((v) => Number.isFinite(v));
    return vector.length ? vector : null;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    const jsonLike = trimmed.startsWith('[') ? trimmed : `[${trimmed}]`;
    const parsed = safeJsonParse<unknown[]>(jsonLike);
    if (!parsed || !Array.isArray(parsed)) return null;
    const vector = parsed.map((v) => Number(v)).filter((v) => Number.isFinite(v));
    return vector.length ? vector : null;
  }

  return null;
}

export function cosineSimilarity(a: number[], b: number[]): number | null {
  if (!a.length || !b.length || a.length !== b.length) return null;

  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let index = 0; index < a.length; index += 1) {
    dot += a[index] * b[index];
    normA += a[index] * a[index];
    normB += b[index] * b[index];
  }

  if (!normA || !normB) return null;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
