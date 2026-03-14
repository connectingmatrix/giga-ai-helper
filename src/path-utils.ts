import { trimEnd } from 'lodash';

export function normalizeBucketPathPrefix(bucketPathPrefix: string): string {
  return trimEnd(String(bucketPathPrefix || ''), '/');
}
