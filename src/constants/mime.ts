import { uniq } from 'lodash';

import { MimeDbEntry } from '../types';

const mimeDb = require('mime-db') as Record<string, MimeDbEntry>;

export const ALWAYS_ALLOWED_DOCUMENT_MIME_TYPES = new Set([
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export const TEXTUAL_DOCUMENT_KEYWORDS = [
  'json',
  'xml',
  'yaml',
  'yml',
  'csv',
  'markdown',
  'toml',
  'x-www-form-urlencoded',
];

export function isReadableDocumentMimeType(mimeType: string, entry: MimeDbEntry): boolean {
  if (ALWAYS_ALLOWED_DOCUMENT_MIME_TYPES.has(mimeType)) return true;
  if (mimeType.startsWith('text/')) return true;
  if (TEXTUAL_DOCUMENT_KEYWORDS.some((keyword) => mimeType.includes(keyword))) return true;
  return Boolean(entry.compressible);
}

export const DEFAULT_ALLOWED_MIME_TYPES = Object.entries(mimeDb)
  .filter(([mimeType, entry]) => isReadableDocumentMimeType(mimeType, entry))
  .map(([mimeType]) => mimeType)
  .sort();

export const DEFAULT_ALLOWED_EXTENSIONS = uniq(
  DEFAULT_ALLOWED_MIME_TYPES.flatMap((mimeType) =>
    (mimeDb[mimeType]?.extensions || []).map((extension) => `.${extension.toLowerCase()}`),
  ),
).sort();

export const DEFAULT_MIME_EXTENSION_MAP: Record<string, string> = DEFAULT_ALLOWED_MIME_TYPES.reduce(
  (accumulator, mimeType) => {
    const extension = mimeDb[mimeType]?.extensions?.[0];
    if (extension) {
      accumulator[mimeType] = extension.toLowerCase();
    }
    return accumulator;
  },
  {} as Record<string, string>,
);
