import { JsonObject } from './types';
export declare function safeJsonParse<T = unknown>(value: string): T | null;
export declare function tryParseJson<T = unknown>(text: string): T | null;
export declare function gatherStringValues(value: unknown): string[];
export declare function normalizeMetadata(metadata: unknown): JsonObject | null;
//# sourceMappingURL=json-utils.d.ts.map