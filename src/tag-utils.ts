import { kebabCase, trim } from 'lodash';

import { StringLike } from './types';
import { normalizeWhitespace, unique } from './string-utils';

export function toSlug(input: string, maxLength = 80): string {
  const normalized = normalizeWhitespace(input).replace(/['’]/g, '');
  return trim(kebabCase(normalized), '-').slice(0, maxLength);
}

export function normalizeTagName(input: string, maxLength = 80): string | null {
  const normalized = normalizeWhitespace(input)
    .replace(/[|/]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!normalized) return null;
  return normalized.length > maxLength ? normalized.slice(0, maxLength).trim() : normalized;
}

export function uniqueTags(values: string[], maxTags = 20, maxTagLength = 80): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    const normalizedName = normalizeTagName(value, maxTagLength);
    if (!normalizedName) continue;

    const slug = toSlug(normalizedName, maxTagLength);
    if (!slug || seen.has(slug)) continue;

    seen.add(slug);
    result.push(normalizedName);

    if (result.length >= maxTags) break;
  }

  return result;
}

export function normalizeUnique(values: Array<StringLike>): string[] {
  return unique(values);
}
